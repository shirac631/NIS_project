const JobApplication = require('../models/jobs');

exports.save_job_application = async (req, res, next) => {
    try {
        if (!req.body) {
            console.log("Error: req.body is undefined. Check Multer setup.");
            return res.redirect('/jobs?msg=' + encodeURIComponent('שגיאה טכנית: לא התקבלו נתוני טופס.'));
        }

        const { id_number, firstName, lastName, email, phone, gender } = req.body;
        const cv_filename = req.file ? req.file.filename : '';
        const newApplication = new JobApplication(id_number, firstName, lastName, email, phone, gender, cv_filename);
        
        await newApplication.save();
        const successMsg = encodeURIComponent('מועמדותך התקבלה בהצלחה! צוות משאבי אנוש יבחן את הפרטים ויחזור אליך.');
        res.redirect('/?msg=' + successMsg);

    } catch (err) {
        console.error("Error in save_job_application:", err);
        const errorMsg = encodeURIComponent('שגיאה: חלה תקלה בשליחת המועמדות. וודא שכל השדות מלאים ונסה שנית.');
        res.redirect('/jobs?msg=' + errorMsg);
    }
};