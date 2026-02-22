const express = require('express');
const path = require('path');
const session = require('express-session'); 
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'my secret restaurant key', 
  resave: false,              
  saveUninitialized: false,   
  cookie: { maxAge: 3600000 }  
}));


app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});

const restaurantRoutes = require('./routs/restaurants'); 
app.use(restaurantRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('❌ קריסה קריטית (Uncaught Exception):', err.message);
    console.error(err.stack); 
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ הבטחה (Promise) לא טופלה:', reason);
});