const deliveryModel = require("../models/delivery.js");

exports.get_delivery = (req, res) => {
  res.render("delivery");
};

exports.save_delivery = async (req, res) => {
  try {
    const userEmail = req.session.user ? req.session.user.email : null;

    if (!userEmail) {
        return res.redirect('/login?msg=' + encodeURIComponent('נא להתחבר כדי לבצע הזמנה.'));
    }

    const data = {
      fullName: (req.body.fullName || "").trim(),
      phone: (req.body.phone || "").trim(),
      city: (req.body.city || "").trim(),
      street: (req.body.street || "").trim(),
      houseNumber: (req.body.houseNumber || "").trim(),
      apartment: (req.body.apartment || "").trim() || null,
      deliveryTime: req.body.deliveryTime || "",
      paymentMethod: req.body.paymentMethod || "",
      orderDetails: (req.body.orderDetails || "").trim(),
      notes: (req.body.notes || "").trim() || null,
      email: userEmail 
    };

    if (data.fullName.length < 2) return res.redirect('/delivery?msg=' + encodeURIComponent('שם מלא לא תקין'));
    if (!/^05\d{8}$/.test(data.phone)) return res.redirect('/delivery?msg=' + encodeURIComponent('מספר טלפון לא תקין'));
    if (!data.city || !data.street || !data.houseNumber) return res.redirect('/delivery?msg=' + encodeURIComponent('נא למלא כתובת מלאה'));
    if (!data.deliveryTime) return res.redirect('/delivery?msg=' + encodeURIComponent('נא לבחור שעת משלוח'));
    if (!data.paymentMethod) return res.redirect('/delivery?msg=' + encodeURIComponent('נא לבחור אמצעי תשלום'));
    if (data.orderDetails.length < 5) return res.redirect('/delivery?msg=' + encodeURIComponent('נא לפרט מה להזמין'));

    await deliveryModel.insertDelivery(data);

    return res.redirect('/delivery?msg=' + encodeURIComponent('ההזמנה נשלחה בהצלחה! השליח בדרך 🏍️'));
  } catch (err) {
    console.error("save_delivery error:", err);
    return res.redirect('/delivery?msg=' + encodeURIComponent('שגיאה בשליחת ההזמנה. נסי שוב.'));
  }
};