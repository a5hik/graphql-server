import * as Hapi from 'hapi';
import * as Good from 'good';
import * as Path from 'path';
import * as Inert from 'inert';
import {graphqlHapi, graphiqlHapi} from 'graphql-server-hapi';
import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import {Schema} from './data/schema';
import {Mocks} from './data/mocks';
import {Resolvers} from './data/resolvers';

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

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
});

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
        schema: executableSchema,
        context: {}
      },
      route: {
        cors: true
      }
    },
  },
  {
    register: graphiqlHapi,
    options: {
      path: '/graphiql',
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


