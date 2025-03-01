FROM python:3.8.13

WORKDIR /app
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5555
ENV PORT=5555

CMD ["gunicorn", "-b", "0.0.0.0:5555", "index:app"]
# CMD ["python", "index.py"]
# back-end-floral-snowflake-8723m