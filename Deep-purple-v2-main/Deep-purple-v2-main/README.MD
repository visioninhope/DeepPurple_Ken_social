# Project Setup Instructions

This project consists of three parts: the frontend, the backend, and the AI. Follow the instructions below to set up each part.

## Frontend Setup

1. Navigate to the `web` directory and Install the necessary npm packages:

```bash
cd web

npm install
```

2. Start the development server:

```bash
npm run dev
```

## Backend Setup

1. Clean and install the project (for Windows OS):

```bash
.\mvnw clean install
```

2. Run the Spring Boot application:
   
```bash
.\mvnw spring-boot:run
```

## AI Setup

1. Navigate to the Hugging Face AI directory:

```bash
cd "Hugging Face AI"
```

2. Create a virtual environment using Python 3.10 and activate it:

```bash
python3.10 -m venv env
source env/bin/activate
```

3. Install the necessary Python packages:

```bash
pip install -r requirements.txt
```