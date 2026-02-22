const db = require('../util/database');

module.exports = class contact {
    constructor(firstName, lastName, email, phone, subject, message) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.subject = subject;
        this.message = message;
    }

    save() {
        return db.execute(
            'INSERT INTO contact (firstName, lastName, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
            [
                this.firstName || null, 
                this.lastName || null, 
                this.email || null, 
                this.phone || null, 
                this.subject || null, 
                this.message || null
            ]
        );
    }

    static findByEmail(userEmail) {
        return db.execute('SELECT * FROM contact WHERE email = ? ORDER BY IDCONTACT DESC', [userEmail]);
    }
}