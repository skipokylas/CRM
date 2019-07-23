/* eslint-disable no-param-reassign */
const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

function getOrderMap(orders = []) {
    const daysOrders = {};
    orders.forEach((order) => {
        const date = moment(order.date).format('DD.MM.YYYY');
        if (date === moment.format('DD.MM.YYYY')) {
            return;
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }

        daysOrders[date].push(order);
    });
    return daysOrders;
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => orderTotal += item.cost * item.quantity, 0);
        return total += orderPrice;
    }, 0);
}

module.exports.overview = async (req, res) => {
    try {
        const allOrders = await Order.find({ user: req.user.id }).sort(1);
        const orderMap = getOrderMap(allOrders);
        const yesterdayOrders = orderMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];
        const yesterdayOrdersCount = yesterdayOrders.length;

        const totalOrdersCount = allOrders.length;
        const daysCount = Object.keys(orderMap).length;
        const ordersPerDay = (totalOrdersCount / daysCount).toFixed(0);
        const ordersPercent = (((yesterdayOrdersCount / ordersPerDay) - 1) * 100).toFixed(2);
        const totalGain = calculatePrice();
        const gainPerDay = totalGain / daysCount;
        const yesterdayGain = calculatePrice(yesterdayOrders);
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
        const compareCount = (totalOrdersCount - ordersPerDay).toFixed(2);

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0,
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareCount),
                yesterday: +yesterdayOrdersCount,
                isHigher: +ordersPercent > 0,
            },
        });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.analytics = (req, res) => {

};
