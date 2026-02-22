const db = require('../util/database');

module.exports = class Reservation {
    constructor(num_of_people, date, time, celebration, phone, email, kids, seat) {
        this.num_of_people = num_of_people;
        this.date = date;
        this.time = time;
        this.celebration = celebration;
        this.phone = phone;
        this.email = email; 
        this.kids = kids;
        this.seat = seat;
    }

    save() {
        return db.execute(
            'INSERT INTO `reservation` (`num_of_people`, `date`, `time`, `celebration`, `phone`, `email`, `kids`, `seat`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                this.num_of_people,
                this.date,
                this.time,
                this.celebration,
                this.phone,
                this.email, 
                this.kids ? 1 : 0,
                this.seat
            ]
        );
    }

    static findByEmail(userEmail) {
        return db.execute('SELECT * FROM `reservation` WHERE email = ?', [userEmail]);
    }
};