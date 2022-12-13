# GDC
![image](https://user-images.githubusercontent.com/67095986/207417219-0ef07f46-c9de-45fe-9b32-6f97d8664aa6.png)
![image](https://user-images.githubusercontent.com/67095986/207417085-fcc9172d-f024-4572-aa4e-1f3d923cc914.png)
![image](https://user-images.githubusercontent.com/67095986/207417156-dac8e951-e9d5-49dd-b364-6e9e087269e3.png)

## quickstart - running locally

- **create a virtual environment**

```python
python -m venv venv
```

if you are on windows, you need to allow the venv creation
```bash
Set-ExecutionPolicy AllSigned
```
<br>

- **enter the virtual environment**

linux:
```
source venv/bin/activate
```

windows:
```
.\venv\Scripts\activate
```

<br>

- **installing dependencies**

This command installs recursively all dependencies on the requirements file

```python
pip install -r requirements.txt
```

<br>

- **running migrations**

This will create the database tables

```python
python manage.py migrate
```

<br>

- **running server**

This command will run the server in http://localhost:8000/

```python
python manage.py runserver
```

<br>

- **routes documentation**

If everything was set up correctly you will have two documentation routes

http://localhost:8000/api/docs/
<br>
http://localhost:8000/api/docs/swagger-ui/

The first one is a download of a yaml file and the second is the documentation ui.
<br>
The port may vary depending where the server is running. The default port is 8000.

## Deploy links

- **routes documentation**
<br/>
https://gdc-api.herokuapp.com/docs/redoc/
<br/>
https://gdc-api.herokuapp.com/docs/swagger-ui/


- **base url**
<br/>
https://gdc-api.herokuapp.com/api

  - **request example**
<br/>
https://gdc-api.herokuapp.com/api/login/
