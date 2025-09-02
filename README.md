# django-blog
Sample blog content management and view system by DJANGO
پروژه وبلاگ نمونه با جنگو (Django)
یک پروژه نمونه وبلاگ ساده با استفاده از فریم‌ورک جنگو برای نمایش قابلیت‌های پایه‌ای آن.

ویژگی‌ها
 مدیریت پست‌های وبلاگ
صفحه مدیریت پیشرفته (Django Admin) --> شخصی سازه شده 
طراحی ریسپانسیو
نصب و راه‌اندازی
استفاده از CSS و JAVASCRIPT به صورت حرفه ای

کلون کردن پروژه:

bash
git clone https://github.com/your-username/django-blog-sample.git
cd django-blog-sample
ایجاد محیط مجازی و نصب requirements:

bash
python -m venv venv
source venv/bin/activate  # برای Linux/Mac
# یا
venv\Scripts\activate  # برای Windows

pip install -r requirements.txt
اجرای migrations:

bash
python manage.py migrate
ایجاد ابرکاربر (admin):

bash
python manage.py createsuperuser
اجرای سرور توسعه:

bash
python manage.py runserver
دسترسی
وبلاگ: http://localhost:8000

پنل مدیریت: http://localhost:8000/admin

فناوری‌های استفاده شده
Python 3

Django 4

SQLite (پایگاه‌داده پیش‌فرض)

HTML/CSS/JavaScript

