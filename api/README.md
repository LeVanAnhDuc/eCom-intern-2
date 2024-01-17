# Hướng dẫn cài đặt project

## Bước 1: 
- Tải và cài đăt: docker, docker compose

## Bước 2:
- Mở terminal của dự án chạy câu lệnh sau "docker-compose up"

## Bước 3:
- API đã được chạy với host là: "localhost:3333"
- Chạy "localhost:3333/seeds" method: POST để tạo data giả vào Database, (API chỉ nên gọi 1 lần, api gọi thành công sẽ không có message lưu ý kiểm tra status code của api)
- Account default để đăng nhập: admin/123456

## Bước 4:
- Import file "API Intern Online.postman_collection.json" trong source vào post man để  đọc docs api


## Lưu ý 
- Ở những lần chạy sau chỉ cần chạy câu lệnh "docker-compose up" là API đã được start.
