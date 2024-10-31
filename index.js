const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Ok');
});
app.post('/calculate_min_trips', (req, res) => {
    // request validation
    if (req.body === undefined || req.body.bagWeights === undefined) {
        res.status(400).send();
        return;
    }

    // array validation
    const weightsArray = req.body.bagWeights;
    if (!Array.isArray(weightsArray)) {
        res.status(400).send();
        return;
    }

    // validate range for weight values
    for (const weight of weightsArray) {
        if (weight < 1.01 || weight > 3.0) {
            res.status(400).send();
            return;
        }
    }

    // calculate minimum number of trips
    const minTripsCount = calcMinTrips(weightsArray);

    // send response
    res.status(200).send({ minNumberOfTrips: minTripsCount });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// calculate minimum number of trips given an array of numbers
const calcMinTrips = (weightsArray) => {
    if (weightsArray.length === 0) {
        return 0;
    }

    // sort ascending
    weightsArray.sort((a, b) => a - b);
    
    let numberOfTrips = 1; // at least 1 trip, since the array is not empty
    let tripWeight = 0.0; // the additive weight of the trip

    for (const weight of weightsArray) {
        if (tripWeight + weight <= 3.0) {
            tripWeight += weight;
        } else {
            tripWeight = weight;
            numberOfTrips++;
        }
    }
    return numberOfTrips;
};
