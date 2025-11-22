// gateway/api/resolvers.ts

import { GoalClient, Goal } from "../grpc/GoalClient";
import * as grpc from "@grpc/grpc-js";

// Mendefinisikan tipe untuk argumen GraphQL (args)
interface GetGoalArgs {
  id: number;
}

const resolvers = {
  Query: {
    // Memberikan tipe Parent, Args, dan Context
    getGoal: (parent: unknown, args: GetGoalArgs, context: unknown) => {
      console.log("GraphQL: Calling gRPC Goal Service for ID:", args.id);

      return new Promise<Goal | null>((resolve, reject) => {
        // Panggil gRPC Client
        GoalClient.GetGoal(
          { goal_id: args.id },
          (error: grpc.ServiceError | null, response: Goal) => {
            if (error) {
              console.error("gRPC Error:", error);
              // Melemparkan error agar ditangkap oleh Apollo Server
              return reject(new Error(`Goal Service Error: ${error.details}`));
            }

            // Mapping data dari Protobuf (snake_case) ke GraphQL (camelCase)
            // response adalah tipe Goal yang kita definisikan sebelumnya
            resolve({
              id: response.id,
              title: response.title,
              userId: response.user_id, // Mapping user_id dari Protobuf
              status: response.status,
            });
          }
        );
      });
    },
  },
};

export default resolvers;
