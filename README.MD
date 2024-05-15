# Project Setup Instructions

This project consists of three parts: the frontend, the backend, and the AI. Follow the instructions below to set up each part.

## Frontend Setup

1. Navigate to the `web` directory and Install the necessary npm packages:

```bash
cd web

npm install
```

2. Add environment variables to the `.env` file and place it in web folder:

```bash
VITE_APPWRITE_PROJECT_ID='6576a5c55691f3a0f74e'
VITE_APPWRITE_URL='https://cloud.appwrite.io/v1'
VITE_APPWRITE_DATABASE_ID='6576a7f48cc7e1a4a661'
VITE_APPWRITE_DASHBOARD_COLLECTION_ID='6576a9376587e824d2b8'
VITE_APPWRITE_STREAM_COLLECTION_ID='6576c6396460903608af' 
VITE_APPWRITE_USER_SOCIALMEDIA_ACCOUNTS_COLLECTION_ID='657e9e01a14d03b09bc8'
VITE_APPWRITE_REPORT_CHART_COLLECTION_ID='658060beb0d983403b8b'
VITE_APPWRITE_SOCIALMEDIA_FEEDS_COLLECTION_ID='657fc7c2f108a1d6d729'
VITE_APPWRITE_POSTS_REPLIES_COLLECTION_ID='657feff6677cc1f4d8e6'
VITE_APPWRITE_USER_PROFILE_COLLECTION_ID='6581aa1c1dcf9f4caaaa'
VITE_APPWRITE_BUGREPORTS_COLLECTION_ID='65b35a2f1ae6df53e6e9'
VITE_APPWRITE_BILLINGS_COLLECTION_ID='65b8ce086fe18f34fc02'
VITE_APPWRITE_SUBPLAN_COLLECTION_ID='65b9247744620978b27d'
VITE_APPWRITE_USERACCOUNT_COLLECTION_ID='65b926dd74c22205fc6b'

REACT_APP_BASE_URL=localhost:8080/api/v1
```

3. Start the development server:

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
