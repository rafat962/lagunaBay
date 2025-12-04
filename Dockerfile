# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# ننسخ package.json أولاً لتحسين caching
COPY package*.json ./
RUN npm ci --only=production

# ننسخ باقي الملفات ونعمل build
COPY . .
RUN npm run build

# Stage 2: Run (Production)
FROM nginx:alpine

# تثبيت أداة certbot للحصول على شهادات SSL
RUN apk add --no-cache certbot certbot-nginx

# نسخ ملفات nginx configuration
COPY nginx/ /etc/nginx/
COPY docker-entrypoint.sh /docker-entrypoint.sh

# ننسخ ملفات الـ build
COPY --from=builder /app/dist /usr/share/nginx/html

# جعل script التشغيل قابل للتنفيذ
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]