const Product = require('../models/Products');

const insertSampleProducts = async(req, res) => {
    try {
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"]
            }
        ];
        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Some error occurred'
        });
    }
}
module.exports = { insertSampleProducts }