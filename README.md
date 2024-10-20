# [Teamtrack](https://main.d5t5z5cn3ydbf.amplifyapp.com/)
## Fullstack Project Management Application

### [Project AWS Deployed link](https://main.d5t5z5cn3ydbf.amplifyapp.com/)

![Screenshot from 2024-10-20 23-07-50](https://github.com/user-attachments/assets/b84c7881-39af-4e19-b1ff-fd4b05b04bf1)

Teamtrack is a project management tool that allows users to efficiently manage projects and tasks, track progress, and prioritize work. It provides a seamless way to organize tasks into various stages and helps teams collaborate effectively. The platform is built with a modern tech stack using Next.js for the frontend and Node.js for the backend, with PostgreSQL as the database.

## 🚀 Features

+ **User Authentication with Amazon Cognito:** Users can create accounts and manage access securely.
+ **Project & Task Management:** Create projects, add tasks, and assign them to specific categories such as:
  - **To Do**
  - **Work in Progress**
  - **Under Review**
  - **Completed**
+ **Task Prioritization:** Set priority levels to organize tasks effectively.
+ **Drag-and-Drop Task Movement:** Easily move tasks between different stages.

## 🛠️ Tech Stack
+ **Frontend:** Next.js, hosted on AWS Amplify.
+ **Backend:** Node.js with PostgreSQL database.
+ **Database Hosting:** PostgreSQL on AWS RDS.
+ **Containerization:** Docker used to containerize the backend, running on an AWS EC2 instance.
+ **CI/CD Pipeline:** Automated deployments using GitHub Actions to the EC2 instance on every new server commit.

## Deployment Architecture
+ **Backend:** Docker container deployed on an AWS EC2 instance, connected to RDS for PostgreSQL.
+ **Frontend:** Hosted on AWS Amplify, providing fast and scalable hosting for the Next.js frontend.

## Setup Project Locally

<details>
<summary><strong>Install Using Docker</strong></summary>


Prerequisites

Make sure you have the following installed on your machine:

Git, Node.js, npm (Node Package Manager)

1.  Fork and Clone the Repository
2.  Run below commands to sping up docker container
    ```bash
    cd teamtrack
    ```
    ```bash
    docker-compose up --build
    ```
3.  Add env file to both client and server. checkout Environment Variables section.
4.  Access the Application 
    - Frontend : http://localhost:3000 
    - Backend  : http://localhost:8000

</details>

<details>
<summary><strong>Install Manually</strong></summary>


Prerequisites

Make sure you have the following installed on your machine:

Git, Node.js, npm (Node Package Manager)

1. Fork and Clone the Repository 
2. Run below commands  to run the client.
      ```bash
    cd teamtrack/client
    ```
    ```bash
    npm install
    ```
3. Run below commands to run the server.
    ```bash
    cd teamtrack/server
    ```
    ```bash
    npm install
    ```
4.  Add env file to both client and server. checkout Environment Variables section.
5.  Access the Application 
    - Frontend : http://localhost:3000 
    - Backend  : http://localhost:8000

</details>

## Environment Variables

To run this project, you will need to add the following environment variables.

1. Add `.env` file in root server folder
   - Add following variables
   - `PORT: 8000`
   - `DATABASE_URL="postgresql://postgres:root@localhost:5432/projectmanagement?schema=public"`

2. Add `.env.local` file in root client folder
   - Add following variables
   - `NEXT_PUBLIC_API_BASE_URL = http://localhost:8000`
   - `NEXT_PUBLIC_COGNITO_USER_POOL_ID="here you need to add your cognito user pool id"`
   - `NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID="here you need to add your cognito user pool client id"`

## Project Demo video


https://github.com/user-attachments/assets/c9d28080-d440-4284-8c66-f48c43d83ccc




   
