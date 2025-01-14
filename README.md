# Role Based Access Control - RBAC

> Description


## Features
- Authentication
- Authorization
- User creation by admin group with permission
- User role assignment
- User role revocation
- User permission assignment
- User permission revocation
- A user can belong many group
- A user many roles assigned to it
- A user's **role** can have many **permissions** assigned to it

## Endpoints
<p> BASE URL: **http://localhost:{port}/api/v1**</p>
<p>**port** will be the port your app is listening from</p>


### User Authentication
**POST** `/auth/login` - To login random user. The user must have been created by user in **admin** group with the required permissions
**Payload**
Permission
    ```
    { "email": "john@example.com", "password": "password"}
    ```

- **POST** `/users` - To create a user. Only user in **admin** group with **can_create_users** permission can user this endpoint
- **Payload**
```
{"fullName": "folly",
    "password": "password",
    "email": "folly@example.com",
    "roles": [{"id": 4}, {"id": 3}],
    "groups": [{"id": 3}]}
```
- Permission **can_create_users**


- **PUT** `/users/:id/assign_role` - To assign role to user. Only user in **admin** group with **can_update_users** permission can use this endpoint
- **Payload**
```
{"roles": [{"id": 3}]}
```
- Permission **can_updated_users**

- **PUT** `/users/:id/revoke_role` - To revoke a user's role. Only user in **admin** group with **can_update_users** permission can use this endpoint
- **Payload**
```
{"roles": [{"id": 3}]}
```
- Permission **can_update_users**

- **PUT** `/users/:id/assign_permission` - To grant permission to user. Only user in **admin** group with **can_update_users** permission can use this endpoint
- **Payload**
```
{"roles": [{"id": 3}]}
```
- Permission **can_update_users**


- **PUT** `/users/:id/revoke_permission` - To revoke user's permission. Only user in **admin** group with **can_update_users** permission can use this endpoint
- **Payload**
```
{"permissions": [{"id": 10, "roleId": 7}, {"id": 17, "roleId": 6}]}
```
- Permission **can_update_users**

- **GET** `/engineering` - Can only be accessed by users in engineering group
- Permission: **can_view_engineering**

- **POST** `/engineering/backend`
- Permission: **can_create_backend**

- **PUT** `/engineering/backend`
- Permission: **can_update_backend**

- **DELETE** `/engineering/backend`
- Permission: **can_delete_backend**

- **POST** `/engineering/frontend`
- Permission: **can_create_frontend**

- **PUT** `/engineering/frontend`
- Permission: **can_update_frontend**

- **DELETE** `/engineering/frontend`
- Permission: **can_delete_frontend**



## ER Diagram
![schema](https://github.com/olawale-o/rbac/blob/main/assets/rbac.png?raw=true")

## Built with
- NodeJS
- Sequelize
- PostgreSQL

## Getting Started

### Prerequisites

- NodeJS
- PostgreSQL

### To get a local copy of this repository kindly follow the steps below.

- Kindly make sure you have **nodejs**, and **PostgreSQL** installed
- Scroll to top of this current repository
- Click on the `Code` button with background color green on the right end corner
- Click on the copy to clipboard icon on the extreme right of the dropdown to copy the repository link
- In your local PC, open your terminal or command prompt in the folder you would like to clone this repository into
- Type `git clone (copied link)` on the currently opened terminal or command prompt
- Remember to change `(copied link)` to `git@github.com:olawale-o/rbac.git` which is the name of the repository

### Database Setup

#### Create Database
`npm run db:create`

#### Database Migrations
`npm run db:migrate`

#### Seed Database
`npm run db:seed:all`
