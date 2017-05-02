import * as Hapi from 'hapi';
import * as Good from 'good';
import * as Path from 'path';
import GraphQL from 'hapi-graphql';
import {GraphQLSchema} from 'graphql';

let server: Hapi.Server = new Hapi.Server();
server.connection({port: 3000});

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

server.register([
    {
      register: Good,
      options: options
    }], ((err: any): void => {
    if (err) {
      throw err;
    }
  })
)


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
  console.log("server running at 3000");
})
