module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwt: process.env.JWT,
    google: {
        projectId: process.env.PROJECT_ID,
        bucket: process.env.BUCKET,
    },
};
