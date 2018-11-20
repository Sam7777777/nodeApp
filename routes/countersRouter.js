const express = require('express');
const Count = require('../models/counterModel');
const _ = require('lodash');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {

    // console.log("Date:", new Date().getTime()); // TODO: use moment js

    // const yesterday = moment().subtract(1, 'day').toISOString();
    // console.log("Yesterday:", yesterday);

    // const date = moment(new Date()).format('YYYY-MM-DD');
    const date = moment().toISOString();
    // console.log(date);


    try {
        const result = await Count.find({
            date: { $lte: date }
        });

        // const result = await Count.aggregate([  // TODO: to implement using aggregation
        // { $match: { "date": { $gte: `ISODate(${date})` } } },
        // { $group: { _id: null, total: { $sum: 1 } } }
        // ]);
        res.send(result);
    } catch (ex) {
        console.log("Error:", ex.message);
    }

});

router.post('/', async (req, res) => {
    console.log(`The body was: ${JSON.stringify(req.body)}`);
    const { date, sum, description } = req.body;
    let count = new Count({
        date,
        sum,
        description
    });

    try {
        count = await count.save();
        res.send(_.pick(count, ['date', 'sum', 'description']));
    } catch (ex) {
        console.log("Error:", ex.message);
    }


});

module.exports = router;