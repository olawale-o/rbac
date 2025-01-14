# Role Based Access Control - RBAC

> Description


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


## Features
- Authentication
- Authorization
- User in **admin** group with required permission **can_create_users**
- Assignment **role** to **user** can only be done by user in **admin** group with required permission **can_update_users**
- Revocation of user's role can only be done by user in **admin** group with required permission **can_update_users**
- User **permission** assignment can only be done by user in **admin** group with required permission **can_update_users**
- User permission revocation can only be done by user in **admin** group with required permission **can_update_users**
- A user can belong to many groups
- A user can many roles assigned to it.
- A user's **role** can have many **permissions** assigned to it.

## Improvements
- A **role** can have defaults **permissions** at creation.
- There should be relationship between groups and role. This ensures certain roles can only belong to certain group and vice-versa.
- Provision can be made for **attribute based access control (ABAC)**


## Endpoints
<p> BASE URL: **http://localhost:{port}/api/v1**</p>
<p>Replace **port** with your own port</p>


### Routes

#### User Authentication
**POST** `/auth/login` - To login random user. The user must have been created by user in **admin** group with the required permissions.<br />
**Payload**<br />
    ```
    { "email": "john@example.com", "password": "password"}
    ```
<br />

#### User Creation
**POST** `/users` - To create a user. Only user in **admin** group with **can_create_users** permission can user this endpoint <br />
**Payload** <br />
```
{"fullName": "folly",
    "password": "password",
    "email": "folly@example.com",
    "roles": [{"id": 4}, {"id": 3}],
    "groups": [{"id": 3}]}
```
<br />
**Permission can_create_users**

<br />

#### User Role Assignment

**PUT** `/users/:id/assign_role` - To assign role to user. Only user in **admin** group with **can_update_users** permission can use this endpoint <br />
**Payload** <br />
```
{"roles": [{"id": 3}]}
```
<br />
**Permission can_updated_users**
<br />

#### User Role Revocation
**PUT** `/users/:id/revoke_role` - To revoke a user's role. Only user in **admin** group with **can_update_users** permission can use this endpoint <br />
**Payload** <br />
```
{"roles": [{"id": 3}]}
```
Permission **can_update_users**

<br />

#### User Permission Assignment

**PUT** `/users/:id/assign_permission` - To grant permission to user. Only user in **admin** group with **can_update_users** permission can use this endpoint <br />
**Payload** <br />
```
{"roles": [{"id": 3}]}
```
Permission **can_update_users**

<br />


#### User Permission Revocation

**PUT** `/users/:id/revoke_permission` - To revoke user's permission. Only user in **admin** group with **can_update_users** permission can use this endpoint <br />
**Payload** <br />
```
{"permissions": [{"id": 10, "roleId": 7}, {"id": 17, "roleId": 6}]}
```
Permission **can_update_users**

<br />

#### Route for users in engineering

**GET** `/engineering` - Can only be accessed by users in engineering group <br />
Permission: **can_view_engineering** <br />

<br />

**POST** `/engineering/backend` <br />
Permission: **can_create_backend** <br />

<br />

**PUT** `/engineering/backend` <br />
Permission: **can_update_backend** <br />

<br />

**DELETE** `/engineering/backend` <br />
Permission: **can_delete_backend** <br />

**POST** `/engineering/frontend` <br />
Permission: **can_create_frontend** <br />

**PUT** `/engineering/frontend` <br />
Permission: **can_update_frontend** <br />

**DELETE** `/engineering/frontend` <br />
Permission: **can_delete_frontend** <br />
