docker stop sample-db sample-server
docker rm sample-db sample-server
docker rmi sample-server postgres
rm -rf ./pgdata