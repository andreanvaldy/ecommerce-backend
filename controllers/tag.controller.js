const Tag = require('../models/tag.model');

// Menambahkan tag baru
exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = new Tag({ name });

        await newTag.save();
        res.status(201).json(newTag);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mengambil seluruh tag
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
