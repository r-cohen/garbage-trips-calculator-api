# garbage-trips-calculator-api
An ExpressJS REST API for calculating the minimum number of garbage trips

## Install
```
npm install
```

## Run
```
node index.js
```

## Sample usage request
```
curl --location 'http://localhost:3000/calculate_min_trips' \
--header 'Content-Type: application/json' \
--data '{
    "bagWeights": [1.01, 1.02, 3, 1.01, 1.01, 1.01, 2.2, 1.01]
}'
```
Request JSON data format:
```json
{
    "bagWeights": [1.01, 1.02, 3, 1.01, 1.01, 1.01, 2.2, 1.01]
}
```
Example response JSON data format:
```json
{
    "minNumberOfTrips": 5
}
```

## Sample app hosted url
```
https://garbage-trips-calculator-api.onrender.com/calculate_min_trips
```