// gateway/grpc/GoalClient.ts

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// Path harus relatif dari lokasi file ini
const PROTO_PATH = __dirname + "/../goal.proto";

// Host name akan otomatis disolve oleh Docker Compose
const GOAL_SERVICE_HOST = process.env.GOAL_SERVICE_HOST || "127.0.0.1";
const GOAL_SERVICE_PORT = process.env.GOAL_SERVICE_PORT || "50051";
const TARGET = `${GOAL_SERVICE_HOST}:${GOAL_SERVICE_PORT}`;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Nama package harus sesuai dengan yang ada di goal.proto: 'goal_service'
const goal_proto: any =
  grpc.loadPackageDefinition(packageDefinition).goal_service;

// Membuat instance gRPC Client
const client = new goal_proto.GoalService(
  TARGET,
  grpc.credentials.createInsecure()
);

// Mendefinisikan Tipe Goal yang akan digunakan di Resolvers
export interface Goal {
  id: number;
  title: string;
  user_id: number; // Tetap snake_case sesuai Protobuf
  status: string;
}

// Mendefinisikan tipe untuk gRPC Client
export interface GoalServiceClient extends grpc.Client {
  GetGoal(
    request: { goal_id: number },
    callback: (error: grpc.ServiceError | null, response: Goal) => void
  ): grpc.ClientUnaryCall;
  // ... (Tambahkan RPC lain di sini)
}

export const GoalClient: GoalServiceClient = client as GoalServiceClient;
