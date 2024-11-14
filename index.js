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
    
    let numberOfTrips = 0;
    let start = 0; // index for iterating from the start of the array
    let end = weightsArray.length - 1; // index for iterating from the end of the array

    // in this solution we use 2 cursors: one at the beginning of the array (lightest bags) and another one at the end (heaviest)
    while (start <= end) {
        // check for combined heaviest with lightest ones exceeds max weight
        if (weightsArray[start] + weightsArray[right] <= 3.0) {
            start++;
        }

        // move end index cursor -> increment number of trips 
        end--;
        numberOfTrips++;
    }

    return numberOfTrips;
};
