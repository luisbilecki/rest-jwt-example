# REST JWT Example

This repository contains an example of authenticated REST API. The REST API was developed using Restify and the authentication method uses [JWT](https://tools.ietf.org/html/rfc7519).

--------------

## Requirements

This app is not docker based, so you should install Node.js, in order to run the API server.

```
Node.js >= 10.x
```
--------------
## How to run

1. In the project folder, generate a pair of public and private keys. The pair will be used to sign and verify the JWT token.

```bash
    openssl genrsa -out secret.key 1024
    openssl rsa -in secret.key -outform PEM -pubout -out public.key
```

2. Run `npm install` to install required dependencies for this project;

3. Create .env file and fill in the following env variables:
```env 
    PORT=8080
    JWT_AUDIENCE=<YOUR JWT AUDIENCE HERE>
    JWT_ISSUER=<YOUR JWT ISSUER HERE>
```
4. Run API using:
```bash
    npm run start

    or

    node index.js
```

5. Run tests using the following command:
```bash
    npm run test
```

## API Examples

**Sign in route**
```bash
    curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"userId":1,"userEmail": "your email here", "userName": "your user name here"}' \
        http://localhost:8080/login/signIn
```
**Validate JWT token route**
```bash
    curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"token": "your token here"}' \
        http://localhost:8080/login/validateToken
```

**Public route**
```bash
    curl http://localhost:8080/public
```
**Private route**
```bash
    curl -H "Authorization: bearer <YOUR_JWT_HERE>" http://localhost:8080/private
```

## Further improvements

* Include docker and docker-compose;
* Add database connection using some ORM or ODM;
* Include frontend example using a JS library (e.g. React.js). 
