const contact = require('../models/contact');

exports.save_contact = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const subject = req.body.subject;
    const message = req.body.message;

    const sessionEmail = req.session.user ? req.session.user.email : req.body.email;

    if (firstName === undefined || lastName === undefined) {
        console.log("Missing fields:", { firstName, lastName });
        return res.redirect('/contact_us?msg=' + encodeURIComponent('חלק מהשדות חסרים בטופס'));
    }

    const newContact = new contact(
        firstName.trim(), 
        lastName.trim(), 
        sessionEmail, 
        phone, 
        subject, 
        message || null 
    );

    newContact.save()
        .then(() => {
            console.log("Contact saved successfully!");
            return res.redirect('/?msg=' + encodeURIComponent('פנייתך התקבלה בהצלחה!'));
        })
        .catch(err => {
            console.log("Error saving contact:", err);
            return res.redirect('/contact_us?msg=' + encodeURIComponent('חלה שגיאה בשמירה, נסי שוב.'));
        });
};