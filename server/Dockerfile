FROM python:3.11-alpine
WORKDIR /server
COPY requirements/ /server
RUN pip install -r dev.txt

CMD ["python", "manage.py", "runserver" , "0:8000"]
