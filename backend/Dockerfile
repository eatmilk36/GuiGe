# 使用 Node.js 官方映像作為基底映像，構建階段
FROM node:20 AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝所有依賴
RUN npm install

# 複製應用程式源代碼
COPY . .

# 確保 TypeScript 正確轉譯 Knex 配置文件
RUN npx tsc knexfile.ts --outDir dist

# 打包應用程式
RUN npm run build

# 使用更小的基底映像來運行應用程式
FROM node:20-slim

# 設定工作目錄
WORKDIR /app

# 安裝必要的系統工具，避免因精簡映像缺少工具而導致錯誤
#RUN apt-get update && apt-get install -y build-essential

# 從構建階段複製構建後的文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./dist/.env
COPY --from=builder /app/dist/knexfile.js ./dist/knexfile.js

# 暴露應用埠
EXPOSE 3000

# 調試用，列出檔案結構以檢查複製是否正確
RUN ls -al ./dist && ls ./dist/knexfile.js && cat ./dist/.env

# 啟動應用程式
CMD ["node", "dist/src/index.js"]
