const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth.route');
const analyticsRoutes = require('./routes/analytics.route');
const categoryRoutes = require('./routes/category.route');
const orderRoutes = require('./routes/order.route');
const positionRoutes = require('./routes/position.route');


const app = express();

app.use(passport.initialize())
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);


module.exports = app;
