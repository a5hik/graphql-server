import * as Hapi from 'hapi';
import * as Good from 'good';
import * as Path from 'path';
import * as Inert from 'inert';
import {GraphQLSchema} from 'graphql';
import {graphqlHapi, graphiqlHapi} from 'graphql-server-hapi';
import {makeExecutableSchema} from 'graphql-tools';

let server: Hapi.Server = new Hapi.Server();
server.connection({port: 3000});

const errorHandler = err => {
  if (err) {
    console.error(err);
  }
};

const options = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{log: '*', response: '*'}]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

// Register/Add the plugins/modules
server.register([
  {
    register: Good,
    options: options
  },
  {
    register: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: null,
      },
      route: {
        cors: true
      }
    },
  },
  {
    register: graphiqlHapi,
    options: {
      path: '/query',
      graphiqlOptions: {
        endpointURL: '/graphql',
      },
    },
  },
  Inert
], errorHandler);

server.route({
  method: "GET",
  path: "/",
  handler: (request: Hapi.Request, reply: Hapi.IReply) => {
    reply("Hello World")
  }

});

server.start((err: any) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
})


