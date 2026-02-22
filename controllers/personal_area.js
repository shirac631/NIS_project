const Reservation = require('../models/reservation');

exports.getPersonalArea = async (req, res) => {
    try {
        if (!req.session.isLoggedIn || !req.session.user) {
            return res.redirect('/logIn?msg=' + encodeURIComponent('שגיאה: עליך להתחבר כדי לצפות באזור האישי.'));
        }
        const userEmail = req.session.user.email;
        const [reservations] = await Reservation.findByEmail(userEmail);
        res.render('personal_area', {
            pageTitle: 'האזור האישי שלי',
            path: '/personal_area',
            user: req.session.user, 
            resList: reservations, 
        });

    } catch (err) {
        console.error("Personal Area Error:", err);
        res.status(500).send("חלה שגיאה בטעינת הנתונים האישיים שלך.");
    }
};