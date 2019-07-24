const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth.route');
const analyticsRoutes = require('./routes/analytics.route');
const categoryRoutes = require('./routes/category.route');
const orderRoutes = require('./routes/order.route');
const positionRoutes = require('./routes/position.route');


const app = express();

app.use(passport.initialize());
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

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static('client/dist/CRM'));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'CRM', 'index.html'),
        );
    });
}


module.exports = app;
