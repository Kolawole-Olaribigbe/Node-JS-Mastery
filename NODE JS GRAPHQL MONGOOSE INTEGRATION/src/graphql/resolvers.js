const product = require('../models/product');
const Product = require('../models/product');

const resolvers = {
    Query : {
        products: async () => await Product.find({}),
        products: async(_, {id}) => await Product.findById(id)
    },
    Mutation: {
        createProduct: async(_, args) => {
            const newlyCreatedProduct = new Product(args)
            return newlyCreatedProduct.save();
        },
        updateProduct : async(_, {id, ...updateFields}) => {
            return await Product.findByIdAndUpdate(id, updateFields, {new : true});
        },
        deleteProduct : async(_, {id})=> {
            const deletedProduct = await Product.findByIdAndDelete(id);
            return !!deletedProduct;
        }
    }
};
module.exports = resolvers;