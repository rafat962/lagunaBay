#!/bin/sh

# docker-entrypoint.sh

# إذا لم تكن شهادة SSL موجودة، احصل عليها
if [ ! -f /etc/letsencrypt/live/realestatemerchants.app/fullchain.pem ]; then
    echo "No SSL certificate found. Obtaining new certificate..."
    
    # أوقف nginx مؤقتاً للحصول على الشهادة
    nginx -c /etc/nginx/nginx.conf -g 'daemon on;'
    
    # احصل على شهادة SSL (استخدم --staging للتجربة أولاً)
    certbot certonly --nginx \
        --non-interactive \
        --agree-tos \
        --email your-email@example.com \
        --domain realestatemerchants.app \
        --staging
    
    # أوقف nginx
    nginx -s stop
fi

# تجديد الشهادة تلقائياً (كل 12 ساعة)
while true; do
    certbot renew --quiet --nginx
    sleep 12h
done &

# ابدأ nginx
exec nginx -g 'daemon off;'