const db = require('../util/database');

module.exports = class JobApplication {
    constructor(id_number, firstName, lastName, email, phone, gender, cv_filename) {
        this.id_number = id_number;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.cv_filename = cv_filename;
    }

    save() {
        return db.execute(
            'INSERT INTO `jobs` (`id_number`, `firstName`, `lastName`, `email`, `phone`, `gender`, `cv_filename`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                this.id_number, 
                this.firstName, 
                this.lastName, 
                this.email, 
                this.phone, 
                this.gender, 
                this.cv_filename
            ]
        );
    }
    
    static findByEmail(userEmail) {
        return db.execute(
            'SELECT * FROM `jobs` WHERE email = ?', 
            [userEmail]
        );
    }
};