const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 3000
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return '<h1>Hello Walmart API Dashboard</h1>';
        }
    })

    await server.start();
    console.log(`Server started on : ${server.info.uri}`)

}

process.on('unhandledRejection', (error) => {
    console.log(error);
    process.exit(1);
})


init();