# Araceli's Rest API ®

## 1 - Initial informations 
- Languague: JavaScript (NodeJS)
- Database: MongoDB Atlas
- Authentication method: JWT (using a bearer token in authorization header)

### 1.1 - Folder Structure
- src: all folders inclunding app's code
- src > apps: folders with Model, Middlewares and Controllers content 
- src > utils: includes app's functions
- src > server.js: app's main script, It makes all the connection between routes, database, ...
- src > routes.js

### 1.2 - Env format:
```
module.exports = {
    mongo: {
        db: "cluster url"
    },
    server: {
        ip: "app's host",
        port: 12344 ,
    },
    auth: {
        secret: "app's secret authentication key"
    }
}
```
**NOTE:** env file must be inside src folder

## 2 - Endpoints

### 2.1 - User authentication
- #### Sign up
  POST: _/users_
    ```
    Input:

    {
      "name": "user's name",
      "email": "user's email",
      "password": "typed password"
    }

    ---
    Success output:

    user: {
      "name": "user's name",
      "email": "user's email"
    }
    Status Code: 200

    ---
    Failed output:

    {
      "error": "error message"
    }
    Status Code: 400 or 500

    ```
- #### Sign in
  POST: _/login_
    ```
    Input:

    {
      "email": "user's email",
      "password": "typed password"
    }

    ---
    Success output:

    user: {
      "id": "user's id"
    }
    Status Code: 200

    ---
    Failed output:

    {
      "error": "error message"
    }
    Status Code: 400 or 500

    ```
### 2.2 - Story
  - #### Create
    POST: _/stories_
    ```
    Input: 
    {
      title: "story's title",
      description: "story's description"
    }
    
    ---
    Success output:
    
    Status code: 201
    
    ---
    Failed output:
    
    {
      "error": "error message"
    }
    Status code: 400 or 500
    
    ```
  - #### Show all
    GET: _/stories_
    ```
    Success output:
    [
      {
        "id": 1,
        "title": "example title",
        "description": "cool text",
        "authorId": 1
      },
      {
        "id": 2,
        "title": "example title",
        "description": "cool text",
        "authorId": 2
      },
      ...
    ]
    
    Status code: 200
    
    ---
    Failed output:
    
    {
      "error": "error message"
    }
    Status code: 400 or 500
    
    ```
  - #### Show one
    GET: _/stories/storyId_
    ```
    Success output:
    {
      "id": 1,
      "title": "example title",
      "description": "cool text",
      "authorId": 1
    }
    
    Status code: 200
    
    ---
    Failed output:
    
    {
      "error": "error message"
    }
    Status code: 400 or 500
    
    ```
