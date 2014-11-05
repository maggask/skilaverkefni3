Skilaverkefni 3 - Kodemon
=========================

In this assignment a code monitoring system called Kodemon is implemented.

The idea of Kodemon is as follows. You place a decorator on Python functions as this code demonstrates.

When this function is executed, behind the scenes, the decorator sends a UDP package to a UDP server with information on the function execution, such as the time it took to run the function.

The server parses and stores the content of the message in some data storage and exposes them in an API.

Each function have their own key and over a time kodemon collects information on how a given function have been performing over a period of time. With this in hand you can monitor parts of application that you write even after they have been deployed to a live server.

##System requirements

Node needs to be installed globally.

For Mac:
```
brew install node
```
For Linux:
```
sudo apt-get install node
```
or maybe needed:
```
sudo apt-get install nodejs-legacy
```
Npm that works with node also needs to be installed globally.

For Mac:
```
brew install npm
```
For Linux:
```
sudo apt-get install npm
```
Mongodb needs to be installed globally.

For Mac:
```
brew install mongodb
```
For Linux:
```
sudo apt-get install mongodb
```
For both systems these commands need to be executed:
```
sudo mkdir -p /data/db
sudo chmod -R 777 /data
```
Other requirements:
* Python 2.7

For Mac:
```
brew install python --framework
```
For Linux:
```
sudo apt-get install build-essential
sudo apt-get install python-dev
```
* Pip and virtualenv

For Mac:
```
sudo pip install virtualenv
```
For Linux:
```
sudo apt-get install python-pip
sudo apt-get install python-virtualenv
```

###Running the server
The udp server takes care of grabbing the information the kodemon sends out and stores it with mongodb.
The API takes care of querying the database and deliveres the required information to any client that sends get requests to the API.

Redirect to the server folder and run the package.json file to install the needed frameworks and/or dependencies:
```
npm install
```
Before being able to run the server and API, mongodb has to be running. Execute this command in a new console window:
```
mongod
```
Then run the udp server in a seperate window:
```
node udp.js
```
Then run the API in a seperate window:
```
node api.js
```
The udp server and API run on port 4000.

###Running the client
The frontend that takes of requesting data from the API and representing it in a browser is written in express, jquery and jade.

Redirect to the frontend folder and run the package.json file to install the needed frameworks and/or dependencies:
```
npm install
```
Then run the index file:
```
node index.js
```
The frontend runs on port 5000, http://localhost:5000.

##Running the python client
The python client is the one that has methods that are decorated with kodemon. To run the python client redirect to the client folder in the root of the project and create a virtual environment and activate it:
```
virtualenv .venv
source .venv/bin/activate
```
Install the kodemon decorator with pip:
```
pip install git+https://github.com/hlysig/kodemon-python
```
Then run client.py:
```
python client.py
```
