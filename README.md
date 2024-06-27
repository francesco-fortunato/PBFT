#PBFT

curl --location 'http://localhost:3001/transaction' \
--header 'Content-Type: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "key": "example1",
    "value": "data1"
}'

WITHOUT CLIENT: 

docker exec -it node1 bash

root@node1:/app# sqlite3 data.db 
SQLite version 3.27.2 2019-02-25 16:06:06

sqlite> SELECT * FROM state;

-------------------------------------------------------------------

docker-compose up --build

CLIENT:

docker ps

docker exec -it pbft-client /bin/bash
npm start
send transaction <from> <to> <value>
send transaction alice bob 4


Check state db:

docker exec -it node1 bash

sqlite3 data.db 

SELECT * FROM state;
