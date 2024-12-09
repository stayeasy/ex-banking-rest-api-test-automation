# ExBanking REST API

## Overview

ExBanking is a simple RESTful banking API that allows users to:
- Create user accounts
- Deposit money
- Withdraw funds
- Check account balances
- Transfer money between users

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 20.0 or higher)
- npm (version 10.0 or higher)

## Installation

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the server:
```bash
npm start
```
The server will run on port 3000 by default. You can change the port by setting the `PORT` environment variable.

## Running Tests

This project uses Jest for testing. To run the test suite:

### All Tests
```bash
npm test
```

### Specific Test Types
- Functional Tests:
  ```bash
  npm run test:functional
  ```

- Performance Tests:
  ```bash
  npm run test:non-functional
  ```

## API Endpoints

- `POST /users`: Create a new user
- `POST /deposit`: Deposit money
- `POST /withdraw`: Withdraw money
- `GET /balance/:username`: Check account balance
- `POST /send`: Transfer money between users

## Example Requests

### Create User
```bash
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe"}'
```

### Deposit Money
```bash
curl -X POST http://localhost:3000/deposit \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe", "amount":100}'
```

## Test Cases

### Functional Tests
The functional test suite covers the following scenarios:

1. User Creation Tests
   - Successfully creating a new user
   - Preventing duplicate user creation

2. Deposit Tests
   - Successful deposit with a positive amount
   - Preventing deposits with zero or negative amounts
   - Handling deposits for non-existent users
   - Validating input requirements (username, amount)
   - Testing multiple consecutive deposits

### Non-Functional Tests
The non-functional test suite focuses on:

1. Performance Tests
   - Response time measurements for users creation
   - Response time measurements for deposits operation

