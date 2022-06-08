CREATE TABLE customer(customerid SERIAL PRIMARY KEY, 
customername VARCHAR(50), 
customeremail VARCHAR(50), 
customerpassword TEXT);

INSERT INTO customer (customername, customeremail, customerpassword) 
VALUES ('test1', 'test1@yahoo', '1234');
INSERT INTO customer (customername, customeremail, customerpassword) 
VALUES ('test2', 'test2@yahoo', '1234');
INSERT INTO customer (customername, customeremail, customerpassword) 
VALUES ('test3', 'test3@yahoo', '1234');




