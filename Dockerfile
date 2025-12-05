# Stage 1: Build (بناء التطبيق)
FROM node:lts-alpine AS builder
WORKDIR /app

# ننسخ بس package.json الأول عشان الـ cache
COPY package*.json ./
RUN npm install

# ننسخ السورس ونعمل build
COPY . .
RUN npm run build

# Stage 2: Run (Production - خادم Nginx بسيط لخدمة الملفات الثابتة)
FROM nginx:alpine

# 💡 تم حذف سطر COPY nginx.conf. سيتم استخدام إعداد Nginx الافتراضي لخدمة الملفات الثابتة.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]