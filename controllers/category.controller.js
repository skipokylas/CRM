const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user.id,
        });

        res.status(200).json(categories);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Category.remove({ _id: req.params.id });
        await Position.remove({ categoty: req.params.id });
        res.status(200).json({
            message: 'Catecory was deleted',
        });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file && req.file.cloudStoragePublicUrl ? req.file.cloudStoragePublicUrl : '',
    });

    try {
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
    };

    if (req.file && req.file.cloudStoragePublicUrl) {
        updated.imageSrc = req.file.cloudStoragePublicUrl;
    }

    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(200).json(category);
    } catch (error) {
        errorHandler(res, error);
    }
};
