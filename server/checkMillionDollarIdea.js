const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;

    if (numWeeks === undefined || weeklyRevenue === undefined) {
        return res.status(400).send('Both numWeeks and weeklyRevenue are required');
    }
    const numWeeksValue = parseFloat(numWeeks);
    const weeklyRevenueValue = parseFloat(weeklyRevenue);

    if (isNaN(numWeeksValue) || isNaN(weeklyRevenueValue)) {
        return res.status(400).send("numWeeks and weeklyRevenue must be valid numbers");
    }

    const totalWorth = numWeeksValue * weeklyRevenueValue;

    if(totalWorth < 1000000) {
       return res.status(400).send('This idea is not worth a million dollars');
    } 

    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
