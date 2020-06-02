let Counter = require('../models/counter.model');

function getNextSequenceValue(sequenceName) {
    var count;

    return Counter.findByIdAndUpdate(sequenceName, )
    .then(counter => {
        console.log(sequenceName);
        console.log(counter);
        count = counter.sequence_value;
        counter.sequence_value = count + 1;
        console.log(count);
        counter.save();
        return count;
    }).catch(err => {
        return 8;
    })
 }

module.exports = getNextSequenceValue;