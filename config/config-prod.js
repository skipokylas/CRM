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
