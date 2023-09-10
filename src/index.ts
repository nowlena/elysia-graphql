import { Elysia } from 'elysia';
import { yoga } from '@elysiajs/graphql-yoga';
// import SchemaBuilder from '@pothos/core';

// const builder = new SchemaBuilder({});

// builder.queryType({
//   fields: (t) => ({
//     hello: t.string({
//       args: {
//         name: t.arg.string(),
//       },
//       resolve: (parent, { name }) => `hello, ${name || 'World'}`,
//     }),
//   }),
// });

// const schema = builder.toSchema();

const app = new Elysia()
  .use(
    yoga({
      typeDefs: /* GraphQL */ `
        type Query {
          hi: String
        }
      `,
      context: {
        name: 'Aaron',
      },
      // If context is a function on this doesn't present
      // for some reason it won't infer context type
      useContext(_) {},
      resolvers: {
        Query: {
          hi: async (parent, args, context) => context.name,
        },
      },
    }),
  )
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
