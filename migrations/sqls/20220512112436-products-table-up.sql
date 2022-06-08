CREATE TABLE products
(productID SERIAL PRIMARY KEY, productName VARCHAR(50), 
productQuantity INT, product_price INT, product_category VARCHAR(50));

INSERT INTO products (productName, productQuantity, product_price, product_category) 
VALUES ('product1', 10000, 100, 'cat1');
INSERT INTO products (productName, productQuantity, product_price, product_category) 
VALUES ('product2', 20000, 200, 'cat2');
INSERT INTO products (productName, productQuantity, product_price, product_category) 
VALUES ('product3', 30000, 300, 'cat3');



