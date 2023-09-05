FROM python:3.11-alpine
WORKDIR /server
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver" , "0:8000"]
