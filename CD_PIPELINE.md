🛠️ الخطوة الأولى: إنشاء مفتاح SSH حديث (ED25519) على السيرفر
مفاتيح ED25519 هي الأحدث والأكثر توافقاً وأماناً وتتجنب مشاكل فواصل السطور التي تحدث مع مفاتيح RSA القديمة.

افتح الـ Terminal الخاص بالسيرفر (VPS) وقم بتسجيل الدخول.

قم بتشغيل الأوامر التالية بالترتيب لإنشاء المفتاح وإعطاء الصلاحيات اللازمة:

Bash
# 1. إنشاء المفتاح بدون كلمة مرور
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/gh_ed25519 -N ""

# 2. إضافة المفتاح العام إلى قائمة المصرح لهم بالدخول
cat ~/.ssh/gh_ed25519.pub >> ~/.ssh/authorized_keys

# 3. ضبط الصلاحيات بشكل صحيح لتجنب رفض الاتصال
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# 4. طباعة المفتاح الخاص لنسخه
cat ~/.ssh/gh_ed25519
⚠️ ملاحظة هامة جداً: قم بنسخ المفتاح الناتج بالكامل من الـ Terminal مباشرة (بدءاً من -----BEGIN OPENSSH PRIVATE KEY----- وحتى -----END OPENSSH PRIVATE KEY-----) وتأكد من عدم ضياع أي حرف أو سطر.

🔒 الخطوة الثانية: إعداد المتغيرات السرية في GitHub (Secrets)
اذهب إلى مستودع المشروع على GitHub.

انتقل إلى Settings ➡️ Secrets and variables ➡️ Actions.

قم بإضافة المتغيرات (New repository secret) التالية:

SERVER_HOST: الـ IP الخاص بالسيرفر (مثال: 185.220.101.4).

SERVER_USER: اسم المستخدم الخاص بالسيرفر (مثال: root).

WORK_DIR: المسار الكامل للمشروع على السيرفر (مثال: /root/lagunaBay).

SSH_PRIVATE_KEY: قم بلصق مفتاح ED25519 الذي نسخته في الخطوة الأولى بالكامل.

🐳 الخطوة الثالثة: إعدادات Docker (لضمان Zero Downtime)
لضمان عدم توقف الموقع أثناء التحديث، نعتمد على بناء الحاوية الجديدة في الخلفية، ثم استبدالها بالحاوية القديمة في أجزاء من الثانية.

تأكد أن أوامرك لا تحتوي على docker compose down قبل الـ build. بدلاً من ذلك، نستخدم:

Bash
docker compose build
docker compose up -d --remove-orphans
⚙️ الخطوة الرابعة: إنشاء ملف GitHub Actions (Workflow)
في مشروعك المحلي، قم بإنشاء أو تعديل الملف في المسار التالي: .github/workflows/deploy.yml

ضع فيه الكود التالي:

YAML
name: Deploy to VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22
          script: |
            # الدخول إلى مسار المشروع
            cd ${{ secrets.WORK_DIR }}
            
            # سحب أحدث التعديلات من GitHub
            git fetch --all
            git reset --hard origin/main
            
            # بناء النسخة الجديدة واستبدالها بدون إيقاف الموقع
            docker compose build
            docker compose up -d --remove-orphans
🎉 الخطوة الخامسة: التشغيل والاختبار
بمجرد عمل git push لفرع main، سيقوم GitHub Actions بالتقاط التغييرات، تسجيل الدخول إلى السيرفر، وسحب الكود، ثم إعادة تشغيل Docker بسلاسة تامة.

ملاحظات سريعة لتفادي المشاكل مستقبلاً:

إذا علقت عملية الـ Deploy لفترة طويلة، قم بتنظيف السيرفر من الحاويات القديمة باستخدام الأمر: docker system prune -f

تأكد دائماً أن الـ Port 22 مفتوح في الـ Firewall الخاص باستضافة السيرفر.