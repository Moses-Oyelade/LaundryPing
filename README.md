## LaundryPing
LaundryPing is a simple yet effective web application that helps users track the status of laundry machines (e.g., available or in use) in real time. It's designed to help facilities like dormitories or shared housing units reduce wait times and improve machine usage.

## Tech Stack
Backend: Django + Django REST Framework

Frontend: React + Tailwind CSS

Database: SQLite (default, can be switched to PostgreSQL or others)

## Features
Real-time machine status: Available or In Use

Auto-tracks duration of usage when a machine is in use

Simple and responsive admin dashboard

Easily update machine status from the UI

## Installation
** Backend (Django)
bash
Copy code
cd backend
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

** Frontend (React)
bash
Copy code
cd frontend
npm install
npm run dev  # or npm start if using CRA
🛠️ Usage
Start the backend and frontend servers.

Visit the frontend interface.

Create machines, update their status, and track their usage time in minutes.

## License
This project is open-source and available under the MIT License.

