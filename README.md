# CRM

#### CRM is a Full-Stack web application for demonstrating work with: Node.js, Express, Angular 8.

## Including: 
```bash
Pagination
Data Analytics with Graphs
Implementing Material Design with Materialize CSS
Work with dates
Data filtering
Work with Google Storage API
Loading pictures
Work with asynchronous events
MongoDB
```
## Demo

Demo [link](https://ng-crm.herokuapp.com/login).

## Installation

##### Install globally: Angular CLI, Node.js, npm.

#### Run inside CRM folder:

```bash
 npm run start-dev
```


Create inside 'CRM/config' folder file:
```python
config-dev.js
```
and paste into it your credentials for MongoDB and Google Storage, like in config-prod.

```python
module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwt: process.env.JWT,
    google: {
        projectId: process.env.PROJECT_ID,
        bucket: process.env.BUCKET,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
};
```
