const Product = require('../models/Products');

const getAllProducts = async (req, res) => {
    const data = await Product.find();
    res.status(200).json({ success: true, errors: null, data });
}

module.exports = {
    getAllProducts
}