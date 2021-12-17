const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 3000
    });

    await server.register({
        plugin: require('hapi-geo-locate'),
        options: {
            enabledByDefault: false
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return '<h1>Hello Walmart API Dashboard</h1>';
        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            return h.redirect('/');
        }

    });

    server.route({
        method: 'GET',
        path: '/location',
        handler: async (request, h) => {
            if (request.location) {
                return request.location;
            } else {
                return '<h5>Location is disabled</h5>';
            }
        }
    })

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