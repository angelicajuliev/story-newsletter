FROM python:3.11-alpine
WORKDIR /server
COPY requirements.txt /server
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver" , "0:8000"]
