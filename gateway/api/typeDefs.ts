// gateway/api/typeDefs.ts

import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Goal {
    id: Int!
    title: String!
    userId: Int!
    status: String!
  }

  type Query {
    getGoal(id: Int!): Goal
  }
`;
