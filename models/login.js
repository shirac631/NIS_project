const db = require('../util/database');

module.exports = class user {
    constructor(firstName, lastName, fullName, idNumber, phone, email, dob, gender, foodPreferences, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName; 
        this.idNumber = idNumber;
        this.phone = phone;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.foodPreferences = foodPreferences;
        this.password = password; 
    }

    save() {
        return db.execute(
            'INSERT INTO `user` (`firstName`, `lastName`, `fullName`, `idNumber`, `phone`, `email`, `dob`, `gender`, `foodPreferences`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                this.firstName, 
                this.lastName, 
                this.fullName, 
                this.idNumber, 
                this.phone, 
                this.email, 
                this.dob, 
                this.gender, 
                this.foodPreferences, 
                this.password
            ]
        );
    }

    static findByFullName(fullName) {
        return db.execute('SELECT * FROM user WHERE fullName = ?', [fullName]);
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM user WHERE email = ?', [email]);
    }
}