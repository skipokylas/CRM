const mongoose = require('mongoose');
const app = require('./app');
const conectionURL = require('./config/config');


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server has been started on ${port}`));

mongoose.connect(conectionURL.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('connect to DB: true'))
    .catch(() => console.log('connect to DB: true'));
