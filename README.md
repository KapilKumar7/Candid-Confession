# Confession API

This API allows users to submit confessions anonymously and retrieve confessions based on certain criteria.

## Endpoints

### 1. Submit a Confession

Submit a new confession.

#### Endpoint

POST /confession

#### Description

This endpoint allows users to submit a new confession anonymously or with a specified user ID.

#### Parameters

- `confession`: The text of the confession.
- `category`: The category of the confession. Must be one of the predefined categories.
- `userId` (optional): The ID of the user submitting the confession. If not provided, the confession will be submitted anonymously.

#### Example URI -

POST https://confe.azurewebsites.net/api/confession?confession=I%20have%20a%20secret&category=Dark%20Secret

#### Response

- `200 OK`: Confession submitted successfully.
- `400 Bad Request`: Missing confession text or invalid category.
- `500 Internal Server Error`: An error occurred while submitting the confession.

### 2. Get Confessions

Retrieve confessions based on user ID and/or category.

#### Endpoint

GET /confessions

#### Description

This endpoint allows users to retrieve confessions based on user ID and/or category. If no parameters are provided, all confessions will be retrieved.

#### Parameters

- `userId` (optional): The ID of the user whose confessions to retrieve.
- `category` (optional): The category of confessions to retrieve.

#### Example URI

https://confe.azurewebsites.net/api/confessions?userId=66419a8848d15419401b27fc&category=Addiction

#### Response

- `200 OK`: Confessions retrieved successfully.
- `500 Internal Server Error`: An error occurred while fetching confessions.

### 3. Health Check

Perform a health check to ensure the server is running properly.

#### Endpoint

GET /healthCheck

#### Description

This endpoint allows users to perform a health check on the server to ensure that it is running properly.

#### Example URI GET https://confe.azurewebsites.net/api/healthCheck

#### Response

- `200 OK`: Health check successful.
- `500 Internal Server Error`: Health check failed.
