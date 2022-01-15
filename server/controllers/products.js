const Product = require('../models/Products');

const getAllProducts = async (req, res) => {
    // search params
    const { name, featured, company, sort } = req.query;
    const params = {};
    if (name) params.name = { $regex: name, $options: 'i' };
    if (featured) params.featured = featured;
    if (company) params.company = company;
    // get products
    let products = Product.find(params);
    // sort
    if (sort) {
        const list = sort.split(',').join(' ');
        products = products.sort(list);
    } else {
        products = products.sort('createdAt');
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    products = products.skip(skip).limit(limit);

    const data = await products;
    res.status(200).json({ success: true, errors: null, data });
}

module.exports = {
    getAllProducts
}