const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); 

//  ייבוא הקונטרולרים 
const reservationController = require("../controllers/reservation.js");
const userController = require("../controllers/login.js"); 
const contactController = require("../controllers/contactUs.js");
const jobsController = require("../controllers/jobs.js");
const deliveryController = require("../controllers/delivery.js"); 

//  GET Routes 
router.get('/', (req, res) => res.render('index'));
router.get('/menu', (req, res) => res.render('menu'));
router.get('/reservation', (req, res) => res.render('reservation'));
router.get('/delivery', deliveryController.get_delivery);
router.get('/contact_us', (req, res) => res.render('contact_us'));
router.get('/register', (req, res) => res.render('register'));

router.get('/jobs', (req, res) => {
    res.render('jobs', {
        user: req.session.user || null, 
        resList: [],
        deliveryList: [],
        messageList: [],
        jobList: []
    });
});

router.get('/review', (req, res) => {
  res.render('review', {
    isLoggedIn: req.session?.isLoggedIn || false,
    user: req.session?.user || {}
  });
});

router.get('/login', (req, res) => res.render('login'));
router.get('/logout', userController.logout);

router.get('/personal_area', userController.getPersonalArea);

//  POST Routes 

router.post('/save_res', (req, res, next) => {
    if (!req.body.phone) {
        return res.redirect('/login?msg=' + encodeURIComponent('נא להתחבר למערכת כדי להזמין מקום'));
    }
    reservationController.save_res(req, res, next);
});

router.post('/save_delivery', deliveryController.save_delivery);
router.post('/save_user', userController.save_user);
router.post('/save_contact', contactController.save_contact);
router.post('/save_job_application', upload.single('cv_file'), jobsController.save_job_application);
router.post('/check_login', userController.check_login);

router.use((req, res) => res.status(404).render('page_not_found'));

module.exports = router;