# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# انسخ package.json و package-lock.json فقط لتحسين cache
COPY package*.json ./

# نثبت الاعتماديات
RUN npm install

# انسخ باقي الملفات ونعمل build
COPY . .
RUN npm run build

# Stage 2: Run (Production)
FROM nginx:alpine

# انسخ ملفات الـ build من مرحلة البناء
COPY --from=builder /app/build /usr/share/nginx/html

# انسخ ملف الإعدادات الخاص بـ Nginx (لو عايز تخصيص)
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
