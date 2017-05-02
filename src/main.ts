
import * as Hapi from 'hapi';
import GraphQL from 'hapi-graphql';
import {GraphQLSchema} from 'graphql';

const server: Hapi.Server = new Hapi.Server()
server.connection({port: 3000});

server.route({
  method: "GET",
  path: "/",
  handler: (request: Hapi.Request, reply: Hapi.IReply) => {
    reply("Hello World")
  }

});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log("server running at 3000");
})
