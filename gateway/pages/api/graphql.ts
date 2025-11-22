// gateway/pages/api/graphql.ts

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../../api/typeDefs";
import resolvers from "../../api/resolvers";
import { NextApiHandler } from "next"; // Tipe dari Next.js

// Apollo Server membutuhkan typeDefs dan Resolvers
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// startServerAndCreateNextHandler mengintegrasikan Apollo Server ke Next.js API Route
const handler: NextApiHandler = startServerAndCreateNextHandler(apolloServer);

export default handler;
