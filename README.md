# Node.js and PostgreSQL for Bitbucket Pipelines

This repository contains a Dockerfile as well as a simple example that shows how you can run your own Docker container with Node.js and PostgreSQL on Bitbucket Pipelines.

The Docker image is using node 4.6 and PostgreSQL 9.4

## Quickstart

### Using the image with Bitbucket Pipelines

Just copy/paste the YML below in your bitbucket-pipelines.yml and adapt the script to your needs.

```yaml
# This is a sample build configuration for Javascript.
# Only use spaces to indent your .yml configuration.
# -----
# You can specify a custom docker image from Dockerhub as your build environment.
image: spittet/node-postgresql

pipelines:
  default:
    - step:
        script: # Modify the commands below to build your repository.
          - /etc/init.d/postgresql start # starting the service
          - sudo -u postgres sh -c 'createuser root & createdb testdb' # creating a root user 
          - sudo -u postgres psql -c "ALTER USER root PASSWORD 'password';" # setting up the root password
          - npm install pg
          - node test.js
```

### Using this in a script

You'll find a sample script in this repository in test.js. It simply connects to PostgreSQL and list the existing databases.

```javascript
var pg = require('pg');
 
var client = new pg.Client('postgres://root:password@localhost:5432/node');
 
// connect to our database 
client.connect(function (err) {
  if (err) throw err;
 
  // execute a query on our database 
  client.query('SELECT datname FROM pg_database WHERE datistemplate = false;', function (err, result) {
    if (err) throw err;
 
    // just print the result to the console 
    console.log(result.rows); 
 
    // disconnect the client 
    client.end(function (err) {
      if (err) throw err;
    });
  });
});
```

## Create your own image

If you want to use a different version of Node.js you can simply create your own image for it. Just copy the content of the Dockerfile and replace the first line.

This image is built from the official Node.js image at https://hub.docker.com/_/node/ and you can find there all the different versions that are supported.

Your Dockerfile won't need to have an ENTRYPOINT or CMD line as Bitbucket Pipelines will run the script commands that you put in your bitbucket-pipelines.yml file instead.

```
FROM node:4.6
RUN apt-get update \
  && apt-get install -y postgresql postgresql-contrib \
  && apt-get install sudo \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# This Dockerfile doesn't need to have an entrypoint and a command
# as Bitbucket Pipelines will overwrite it with a bash script.
```

### Build the image

```bash
docker build -t <your-docker-account>/node-postgresql .
```

### Run the image locally with bash to make some tests

```bash
docker run -i -t <your-docker-account>/node-postgresql /bin/bash
```

### Push the image back to the DockerHub

```bash
docker push <your-docker-account>/node-postgresql
```
