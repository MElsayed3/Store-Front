CREATE TABLE orders(orderID SERIAL PRIMARY KEY,
orderDate DATE,customerID INT, productID INT, product_quantity INT, order_status VARCHAR(50),
CONSTRAINT FK_Cutomer_Orders FOREIGN KEY (customerID) REFERENCES customer(customerID),
CONSTRAINT FK_Products_Orders FOREIGN KEY (productID) REFERENCES products(productID));


INSERT INTO orders (orderdate, customerid, productid, product_quantity, order_status) 
VALUES ('2001-01-01', 1, 2, 5200, 'complete');
INSERT INTO orders (orderdate, customerid, productid, product_quantity, order_status) 
VALUES ('2002-02-02', 1, 1, 1000, 'active');
INSERT INTO orders (orderdate, customerid, productid, product_quantity, order_status) 
VALUES ('2003-03-03', 2, 2, 500, 'complete');