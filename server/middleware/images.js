const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const config = require('../config/config');

const storage = new Storage({
    projectId: config.google.projectId,
    credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
});

const bucket = storage.bucket(config.google.bucket);

const getPublicUrl = filename => `https://storage.googleapis.com/${config.google.bucket}/${filename}`;

// eslint-disable-next-line consistent-return
const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
        return next();
    }

    const gcsname = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
        resumable: true,
        predefinedAcl: 'publicRead',
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });

    stream.end(req.file.buffer);
};

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});

module.exports = {
    sendUploadToGCS,
    multer,
};
