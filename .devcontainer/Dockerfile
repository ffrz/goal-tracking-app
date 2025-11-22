# Start dari image yang sudah ada Go dan Node
FROM mcr.microsoft.com/devcontainers/go:latest

ENV PROTOC_ZIP=protoc-25.1-linux-x86_64.zip
RUN curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v25.1/${PROTOC_ZIP} \
    && sudo unzip -o ${PROTOC_ZIP} -d /usr/local bin/protoc \
    && sudo rm -f ${PROTOC_ZIP} \
    && go install google.golang.org/protobuf/cmd/protoc-gen-go@latest \
    && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

RUN go install github.com/air-verse/air@latest

# FIX Permission
RUN sudo chown -R vscode:vscode /go/pkg/mod /go/pkg/sumdb