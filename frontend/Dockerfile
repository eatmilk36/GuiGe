# 使用 Node.js 進行前端建置
FROM node:20 AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝前端依賴
RUN npm install

# 複製應用程式代碼
COPY . .

# 建置前端應用
RUN npm run build

# 使用 Nginx 提供靜態文件
FROM nginx:stable-alpine

# 複製前端建置好的文件到 Nginx 靜態資源目錄
COPY --from=builder /app/build /usr/share/nginx/html

# 暴露 Nginx 的預設 HTTP 埠
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
