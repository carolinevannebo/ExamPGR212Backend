# Swine house system PGR212 Exam (2023)
A pig farmer heard about your Greenhouse prototype (Obligatory Submission 1) and needs a similar system.
He has taken over the neighbouring farms and now has three times as many pigs as before. His problem is
that the three different farmhouses all have different systems and the needs to use 3 different App’s to check
the conditions for his pigs.

The client wants an App (web or mobile) that can show the state of all 3 pig sty’s and alert him of problems.
The requirements are:
- You must register and store Temperature, Humidity and Light from your ESP32 Edge device
- The client wants the solution to run on their own servers, so you must make a Node API to store the sensor
data
- They want a Dashboard written in React that shows a graph of the last 24 hours of sensor data
- Deliver a video showing the final solution, all required code and written documentation. The reviewer should
be able to replicate your solution.

You can build the Dashboard as either a web App or a mobile App written in Expo. If you are able to come up
reasons to use other sensors in the Edge device, please do so. If you think the Dashboard needs more than
just a graph, you are free to add features to the solution. Draw on your experience from the obligatory
submissions and lectures to get ideas for good additions.

## Solution
This project is the backend server of the solution, written in JavaScript using node.js. It is the "middle-man" that handles all communication between the microcontroller and the web application. The program is responsible for retrieving and sending data as a REST API using express. The database used is a non-relational cloud based one, I went with MongoDB. The server can be run both locally and on the cloud, where it is currently deployed with render. Due to the set up on edge and frontend, multiple devices can be configured. 

Edge https://github.com/carolinevannebo/ExamPGR212Edge
Frontend https://github.com/carolinevannebo/ExamPGR212Frontend

### Components
- Libraries used for implementation
- Render https://pig-binge-monitoring-server.onrender.com
- MongoDB Cloud

### Usage
- Follow the steps for configurations.
- Call on the endpoint in your browser, Insomnia, or the web application.

### Endpoints
GET /
- Returns an array of all the sensor data stored in the database. The timestamp for each data point is converted to the "Europe/Oslo" timezone.

GET /:id
- Returns the sensor data with the specified id.

POST /
- Adds a new sensor data point to the database. The request body should include the following parameters:

- sensorId: a string representing the ID of the sensor
- temperature: a number representing the temperature reading
- humidity: a number representing the humidity reading
- light: a number representing the light reading
- x, y, z: numbers representing the positions left/right, forward/backward and up/down
- door: a string either "open" or "closed"

PUT /:id
- Updates the sensor data with the specified id. The request body should include the same parameters as for the POST / endpoint.

DELETE /:id
- Deletes the sensor data with the specified id.

### Backend configuration
- If you are running locally, add your IP address in the allowedOrigins array in the server.js file. It should look like this: 'http://XXX.XXX.XX.XXX:3000'. This is really important as to not get any cross origin resource sharing errors. Note how the server is listening on port 3001 and allowing connections on port 3000. This means the web application must run on port 3000 and the web server must run on port 3001. Deploying the server has removed this worry for me.
- Optional: You can change cors options to allow multiple origins in server.js
- Optional: Change the MongoDB connection string in the private.js file with your own.
https://cloud.mongodb.com/

### How to use
- npm i
- node server.js

## Libraries
axios 1.4.0
cors 2.8.5
express 4.18.2
luxon 3.4.0
moment-timezone 0.5.43
mongodb 5.7.0
mongoose 7.4.3
morgan 1.10.0"
