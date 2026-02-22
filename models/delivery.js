const db = require("../util/database.js");

exports.insertDelivery = async (data) => {
  const sql = `
    INSERT INTO delivery_orders 
    (full_name, phone, city, street, house_number, apartment, delivery_time, payment_method, order_details, notes, email) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.fullName,
    data.phone,
    data.city,
    data.street,
    data.houseNumber,
    data.apartment,
    data.deliveryTime,
    data.paymentMethod,
    data.orderDetails,
    data.notes,
    data.email 
  ];

  return db.execute(sql, params);
};

exports.findByEmail = (userEmail) => {
    return db.execute('SELECT * FROM delivery_orders WHERE email = ? ORDER BY created_at DESC', [userEmail]);
};