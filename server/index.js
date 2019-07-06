const app = require('./app');

const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server has been started on ${port}`));
