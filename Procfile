release: python manage.py migrate
web: gunicorn cryptowallet.wsgi --preload --log-file - 