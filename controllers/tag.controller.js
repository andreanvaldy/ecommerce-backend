const Tag = require('../models/tag.model'); //Mengimpor model Tag yang digunakan untuk berinteraksi dengan koleksi tags dalam database MongoDB.


// Menambahkan tag baru
exports.createTag = async (req, res) => {
    try {
        const { name } = req.body; //req.body → Mengambil data dari request body yang dikirim oleh client.
        const newTag = new Tag({ name }); //Membuat Instance Model Baru:

        await newTag.save(); //Menyimpan ke Database:
        res.status(201).json(newTag);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mengambil seluruh tag
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find(); //Mencari Semua Data:
        res.json(tags); //Mengirim Data ke Client:
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
