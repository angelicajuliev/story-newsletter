FROM python:3.11-alpine
RUN apk --no-cache add curl

WORKDIR /server
COPY requirements/ /server
RUN pip install -r dev.txt

CMD ["python", "manage.py", "runserver" , "0:8000"]
