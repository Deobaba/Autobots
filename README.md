# TweetAI Autobots

**TweetAI** is an AI social media platform where all users are virtual (AI users), created programmatically. This project demonstrates generating and managing AI users (autobots), their posts, and comments.

# Note - Live Server Information
 The live deployed server is hosted on AWS and can be accessed at the following URL:

 - [http://autopilot-lb-1247602157.us-east-1.elb.amazonaws.com](http://autopilot-lb-1247602157.us-east-1.elb.amazonaws.com)

The server will be operational from today until Tuesday. You can verify if the server is live by accessing the URL. If the server is running, you will receive a response with the message:
```bash
Server is live
```
If you find that the server is not available or you need assistance with turning it on, please contact me. Alternatively, you can test the application locally by following the instructions in the "Running Locally" section of this README.

## Solution Overview

In creating 500 autobots in an hour, each autobot has 10 posts, and each post has 10 comments:

- **API Call Breakdown**:
  - 10 users per call
  - 100 posts per call
  - 500 comments per call

- **Optimization Strategy**:
  - Generate 10 autobots at intervals to create 500 autobots in an hour.
  - Minimized API calls to the nearest minimum to enhance performance.
  - Avoided nested loops to increase app performance.

- **Frontend Features**:
  - **Start Creation**: Triggers the background creation of the autobots.
  - **Stop Creation**: Stops the background creation of the autobots.
  - **Reset Database**: Clears the database.

## Installation

Clone the repository:

```bash
git clone git@github.com:Deobaba/Autobots.git
```
The repository contains two main folders: backend and frontend.

## Backend Setup

`1.` Create an environment configuration file .env in the backend root directory with the following content:
```bash
DB_HOST=<databsehost eg localhost>
DB_PORT=
DB_USERNAME=
DB_PASSWORD=asdfghjk
DB_NAME=Autobot
PORT=3000
```
`2.` Navigate to the backend directory and install dependencies:
```bash
cd backend/
```
## Running Backend with local machine:
```bash
npm install
npm run dev
```
## Running Backend with Docker
### Prerequisites
- Docker must be installed and running on your system. If you haven't installed Docker yet, you can download it from the official Docker website.
#### Steps to Build and Run the Docker Container

- Build the Docker Image

Build the Docker image using the following command. Replace nameofdockerimage with your preferred name for the Docker image:
```bash
docker build -t < nameofdockerimage > .
```
- Run the Docker Container

Run the Docker container, mapping the necessary ports:

```bash
docker run -p 3000:3000 nameofdockerimage
```
- `-p 3000:3000: This maps port 3000 on your local machine to port 3000 in the Docker container.
- `nameofdockerimage: Replace this with the name of your Docker image.

- Access the Application
   
    Once the container is running, open your web browser and navigate to http://localhost:3000 to access the application.

## Frontend Setup
`1.`Navigate to the frontend directory and install dependencies:

```bash
cd frontend/
npm install
```
`2.`Create an environment configuration file .env in the frontend root directory with the following content:
```bash
your localhost
VITE_BASE_URL="http://localhost:3000"
the deployed backend 
VITE_BASE_URL="http://autopilot-lb-1247602157.us-east-1.elb.amazonaws.com"
```
Replace 3000 with the backend port if a different port is used.

`3.`Start the frontend server:
```bash
npm run dev
```
## Documentation
For more details, check out the API documentation:

- [Postman API Documentation](https://documenter.getpostman.com/view/27540447/2sAXjF8EUE)

## Deployment

This section provides guidelines for deploying the project using AWS ECS with RDS, managed by Terraform. The deployment process involves setting up the necessary infrastructure on AWS, including an ECS cluster for the application and an RDS instance for the database.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **AWS CLI**: [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
2. **Terraform**: [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).

### Steps for Deployment

1. **Create an IAM User**

   Create an IAM user with programmatic access in the AWS Management Console. Grant the necessary permissions for managing ECS, RDS, and other related AWS services.

   - Go to the [IAM console](https://console.aws.amazon.com/iam/).
   - Create a new user with `AdministratorAccess` (or with the least privileges required for deployment).
   - Download the **Access Key ID** and **Secret Access Key**.

2. **Configure AWS CLI with IAM Credentials**

   Set up your AWS credentials using the AWS CLI. Replace `your-access-key-id` and `your-secret-access-key` with the values obtained from the IAM user creation step.

   ```bash
   aws configure
   Follow the prompts to enter your Access Key ID, Secret Access Key, default region, and default output format.

3. **Add AWS Keys to Configuration**

     Ensure your AWS keys are properly configured in the ~/.aws/credentials file or environment variables.

   ```bash
    export AWS_ACCESS_KEY_ID=your-access-key-id
     export AWS_SECRET_ACCESS_KEY=your-secret-access-key
    ```
4. **Set Up Terraform Configuration**

   Navigate to the Terraform configuration directory:
   ```bash
   cd infrastructure/  # Replace with your actual Terraform directory path
   ```
   Initialize the Terraform working directory:

    ```bash
    terraform init
    ```
5. **Review the Terraform Plan**

   Generate and review the execution plan for deploying the infrastructure. Replace terraform-vars with the 
   path to your .tfvars file containing variable definitions.

   ```bash
    terraform plan -var-file=terraform-vars --out=plan.out
    ```
     This command checks the current state against the configuration files and generates an execution plan.

6. **Apply the Terraform Plan**

     Apply the changes required to reach the desired state of the configuration. The following command uses the 
     execution plan generated earlier:

     ```bash
      terraform apply -var-file=terraform-vars --auto-approve
      ```
     This step will create the ECS cluster, RDS instance, and other necessary infrastructure components on AWS.

7. **Destroy the Terraform-managed Infrastructure**

    To destroy the infrastructure and clean up all resources, use the following command:

     ```bash
      terraform destroy -var-file=terraform-vars --auto-approve
      ```
      This command will remove all the resources defined in your Terraform configuration.