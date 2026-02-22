const Reservation = require('../models/reservetion');

exports.save_res = (req, res, next) => {
    const { num_of_people, date, time, celebration, phone, kids, seat } = req.body;
    const userEmail = (req.session.user && req.session.user.email) ? req.session.user.email : null;
    if (!userEmail) {
        return res.redirect('/login?msg=' + encodeURIComponent('נא להתחבר למערכת כדי להזמין מקום.'));
    }
    const newReservation = new Reservation(
        num_of_people,
        date,
        time,
        celebration,
        phone,
        userEmail, 
        kids === '1' || kids === 1, 
        seat
    );

    newReservation.save()
        .then(() => {
            const message = encodeURIComponent('הזמנתך התקבלה בהצלחה! נתראה ב-NIS.');
            res.redirect('/?msg=' + message);
        })
        .catch(err => {
            console.log("❌ Error saving reservation to DB:", err);
            const errorMsg = encodeURIComponent('חלה שגיאה בשמירת ההזמנה. ודאו שכל השדות מולאו כראוי.');
            res.redirect('/reservation?msg=' + errorMsg);
        });
};