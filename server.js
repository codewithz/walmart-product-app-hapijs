const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');

Mongoose.connect("mongodb://localhost/walmart");
console.log('Connected to Mongo Server...');

const ProductModel = Mongoose.model("products", {
    productId: Number,
    name: String,
    price: Number,
    description: String,
    category: String
});

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 3000
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.file('./welcome.html')
        }
    });

    server.route({
        method: 'POST',
        path: '/products',
        handler: async (request, h) => {
            try {
                const product = new ProductModel(request.payload);
                const result = await product.save();
                return h.response(result);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }

    });

    server.route({
        method: 'GET',
        path: '/products',
        handler: async (request, h) => {
            try {
                const products = await ProductModel.find().exec();
                return h.response(products);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }

    });

    server.route({
        method: 'GET',
        path: '/products/{id}',
        handler: async (request, h) => {
            try {
                const product = await ProductModel.findById(request.params.id).exec();
                return h.response(product);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }

    });

    server.route({
        method: 'GET',
        path: '/products/productId/{productId}',
        handler: async (request, h) => {
            try {
                const product = await ProductModel
                    .where()
                    .find({ productId: parseInt(request.params.productId) })
                    .exec();
                return h.response(product);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }

    });
    server.route({
        method: 'GET',
        path: '/products/category/{category}',
        handler: async (request, h) => {
            try {
                const product = await ProductModel
                    .where()
                    .find({ category: request.params.category })
                    .exec();
                return h.response(product);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }

    });


    server.route({
        method: 'GET',
        path: '/{any*}',
        handler: async (request, h) => {
            return '<h2>404!! Seems you are in a wrong location</h2>';
        }
    });

    await server.start();
    console.log(`Server started on : ${server.info.uri}`)

}

process.on('unhandledRejection', (error) => {
    console.log(error);
    process.exit(1);
})


init();