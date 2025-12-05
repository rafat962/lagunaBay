# Stage 1: Build
FROM node AS builder
WORKDIR /app

# ننسخ بس package.json الأول عشان الـ cache
COPY package*.json ./
RUN npm install

# ننسخ السورس ونعمل build
COPY . .
RUN npm run build

# Stage 2: Run (Production)
FROM nginx:alpine

# ⬅️ إضافة هذا السطر: نسخ ملف الإعدادات المعدل
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ننسخ بس الملفات الناتجة (dist) من مرحلة الـ build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
