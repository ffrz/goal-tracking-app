// services/goal-service/cmd/main.go (FINAL VERSION - HANYA SERVER)
package main

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "goal-tracking-app/goal-service"

	"google.golang.org/grpc"
)

// Server struct yang mengimplementasikan interface GoalServiceServer
type server struct {
	pb.UnimplementedGoalServiceServer
}

// Implementasi fungsi CreateGoal RPC (seperti yang Anda buat sebelumnya)
func (s *server) CreateGoal(ctx context.Context, req *pb.CreateGoalRequest) (*pb.Goal, error) {
	fmt.Printf("Received CreateGoal request for user %d with title: %s\n", req.GetUserId(), req.GetTitle())
	
	// Server mengembalikan data hardcode
	return &pb.Goal{
		Id:      1, 
		Title:   req.GetTitle(),
		UserId:  req.GetUserId(),
		Status:  "active",
	}, nil
}

// Implementasi fungsi GetGoal RPC (ditambahkan)
func (s *server) GetGoal(ctx context.Context, req *pb.GetGoalRequest) (*pb.Goal, error) {
    fmt.Printf("Received GetGoal request for ID: %d\n", req.GetGoalId())

    // Server mengembalikan data hardcode
	return &pb.Goal{
		Id:      req.GetGoalId(), 
		Title:   "Goal ID: " + fmt.Sprint(req.GetGoalId()),
		UserId:  999,
		Status:  "retrieved",
	}, nil
}

func main() {
    // 1. Gunakan 0.0.0.0:50051 untuk memastikan binding berhasil
	listen, err := net.Listen("tcp", "0.0.0.0:50051") 
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	// Daftarkan server struct ke interface gRPC
	pb.RegisterGoalServiceServer(s, &server{})

	fmt.Println("🎉 Goal Service (gRPC Server) running on 0.0.0.0:50051")
	if err := s.Serve(listen); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}