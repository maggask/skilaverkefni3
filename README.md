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

