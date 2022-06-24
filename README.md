# Express TypeScript Restful Postgres Template
## How to install and Run with docker

- This will build a postgres and a sample-server docker image

  > ./run.sh

## How to delete installed docker related files

- This will stop and remove docker containers, and remove docker images

  > ./delete.sh

## Open server URL to test

> http://0.0.0.0:3000/

## How to test

1. Run normal unit tests

   > npm run test:coverage

2. Run postman integration tests

   1. Open an additional terminal with the same file path

   2. Run server on 1 terminal

      > ./run.sh

   3. Run postman test on the other terminal

      > npm run test:postman
