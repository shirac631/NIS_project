const User = require('../models/logIn'); 
const Reservation = require('../models/reservetion'); 
const deliveryModel = require("../models/delivery.js"); 
const Contact = require('../models/contact'); 
const JobApplication = require('../models/jobs'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.save_user = async (req, res) => {
    try {
        const { firstName, lastName, idNumber, phone, email, dob, gender, foodPreferences, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.redirect('/register?msg=' + encodeURIComponent('שגיאה: הסיסמאות אינן תואמות'));
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        const newUser = new User(firstName.trim(), lastName.trim(), fullName, idNumber, phone, email, dob, gender, foodPreferences, hashedPassword);
        await newUser.save();
        return res.redirect('/logIn?msg=' + encodeURIComponent(firstName + ', נרשמת בהצלחה!'));
    } catch (err) {
        console.log("Error saving user:", err);
        return res.redirect('/register?msg=' + encodeURIComponent('שגיאה בהרשמה.'));
    }
};

exports.check_login = async (req, res) => {
    try {
        const fullName = req.body.fullName ? req.body.fullName.trim() : "";
        const password = req.body.password;
        const [users] = await User.findByFullName(fullName);
        if (users.length === 0) return res.redirect('/logIn?msg=' + encodeURIComponent('משתמש לא נמצא.'));
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => res.redirect('/?msg=' + encodeURIComponent('שלום ' + user.firstName)));
        }
        return res.redirect('/logIn?msg=' + encodeURIComponent('סיסמה שגויה.'));
    } catch (err) {
        return res.redirect('/logIn?msg=' + encodeURIComponent('שגיאה במערכת.'));
    }
};

exports.getPersonalArea = async (req, res) => {
    try {
        if (!req.session.isLoggedIn || !req.session.user) {
            return res.redirect('/login?msg=' + encodeURIComponent('נא להתחבר'));
        }
        const userEmail = req.session.user.email;
        const [reservations] = await Reservation.findByEmail(userEmail);
        const [deliveries] = await deliveryModel.findByEmail(userEmail);
        const [contacts] = await Contact.findByEmail(userEmail);
        const [jobs] = await JobApplication.findByEmail(userEmail);

        res.render('personal_area', {
            user: req.session.user,
            resList: reservations || [],
            deliveryList: deliveries || [],
            messageList: contacts || [],
            jobList: jobs || [],
            pageTitle: 'האזור האישי'
        });
    } catch (err) {
        console.log("PA Error:", err);
        res.status(500).send("שגיאה בטעינת הדף");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        res.clearCookie('connect.sid');
        res.redirect('/?msg=' + encodeURIComponent('התנתקת בהצלחה!'));
    });
};