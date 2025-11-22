# services/goal-service/Dockerfile

# Tahap 1: Build Stage (Menggunakan Go yang lebih besar untuk kompilasi)
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Salin go.mod dan go.sum untuk dependensi
COPY go.mod .
COPY go.sum .
RUN go mod download

# Salin kode sumber
COPY . .

# Kompilasi aplikasi. -o goal-service menentukan nama executable.
RUN CGO_ENABLED=0 GOOS=linux go build -o goal-service ./main.go

# Tahap 2: Final/Run Stage (Menggunakan image yang sangat kecil untuk produksi)
FROM alpine:latest

WORKDIR /root/

# Salin executable dari tahap builder
COPY --from=builder /app/goal-service .

# Perintah untuk menjalankan service
CMD ["./goal-service"]