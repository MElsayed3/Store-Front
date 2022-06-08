# Storefront Backend Project
Storefront is an online store allows customers to buy and sell whatever they want online. It's fast and reliable
## Set up the database and run the application :
### Basic Information : 
- port number: 3000
- db port number: 5432
- user: test_user
- password: 1234
- databases names: dev_db and test_db
### Instruction:
- CREATE USER test_user WITH PASSWORD '1234';
- CREATE DATABASE dev_db;
- CREATE DATABASE test_db;
- GRANT ALL PRIVILEGES ON DATABASE dev_db TO test_user;
- GRANT ALL PRIVILEGES ON DATABASE test_db TO test_user;
- \c dev_db;
- After that you will create 4 tables (customer, products, orders, dashboard) just by running the db-migrate up make sure that the customer, products get created first then orders and dashboard table get created after them.

## Migrations folder :
contains all tables i used in the database, what you need to do:
1. run db-migrate up: to generate all the tables in your database.
2. after done testing run db-migrate down to delete all the tables.

## Database schema :
- ### Customer :
        consists of four columns
        (customerID SERIAL PRIMARY KEY, customerName VARCHAR(50), customerEmail VARCHAR(50), customerPassword TEXT)
- ### Products :
        consists of five columns
        (productID SERIAL PRIMARY KEY, productName VARCHAR(50), productQuantity INTEGER, product_price INTEGER, product_category VARHCHAR(50))
- ### Orders :
        consists of six columns
        (orderID SERIAL PRIMARY KEY, orderDate DATE, cutomerID INTEGER, productID INTEGER, product_quantity INTEGER, order_status VARCHAR(50),
        CONSTRAINT FK_Cutomer_Orders FOREIGN KEY (customerID) REFERENCES customer(customerID),
        CONSTRAINT FK_Products_Orders FOREIGN KEY (productID) REFERENCES products(productID));)
- ### Dashboard :
        consists of three columns
        (id SERIAL PRIMARY KEY, product_id INTEGER, order_id INTEGER, CONSTRAINT fk_products_dash FOREIGN KEY (product_id)
        REFERENCES products(productid), CONSTRAINT fk_orders_dash FOREIGN KEY (order_id)
        REFERENCES orders(orderid))
## Models Folder :
* Customer.model.ts: contains all the functions you need to create, delete, update, retrieve all, retrieve only one by id and authenticate functions.
* products.model.ts: contains all the functions you need to create, delete, update, retrieve all, retrieve only one and retrieve top popular products functions.
* orders.model.ts: contains all the functions you need to create, delete, update, retrieve all, retrieve only one functions.

# handlers folder :
* customer.handler.ts: invoking all of the functions created inside the customer.model.ts file and exporting the customer route
* products.handler.ts:   invoking all of the functions created inside the products.model.ts file and exporting the products route
* orders.handler.ts: invoking all of the functions created inside the orders.model.ts file and exporting the orders route


# server.ts :
gathering all the routes and it has the app.listen to start the server on port 3000.

# Using the app :
* npm run start : to start the server on http://localhost:3000

* use postman to test all the endpoints.

## 1-customer :
- Create a customer: http://localhost:3000/customer then add the json data in the body you have to keep the JWT token with you to use it with the other endpoints.
- Retrieve all customers: http://localhost:3000/customer get request
- Retrieve one customer: http://localhost:3000/customer/:id
- sign in (authenticate): http://localhost:3000/customer/auth and put the email and password as json in the body
## 2-products :
- Add a product: http://localhost:3000/products then add the json data in the body, you will need to add the token you saved with you
- Retrieve all products: http://localhost:3000/products get request
- Retrieve one product: http://localhost:3000/products/:id
- retrieve popular products: http://localhost:3000/products/top_product

## 3-orders :
- Add an order: http://localhost:3000/orders then add the json data in the body
- Retrieve all orders: http://localhost:3000/orders get request
- Retrieve one order by customerid and status: http://localhost:3000/orders/customerstatus
and add the customerid and status as json in the body you will need the JWT token you saved earlier
- Retrieve all orders by customer id: http://localhost:3000/orders/:id just add the customer id in the link.

## 4-dashboard :
- add a dashboard: http://localhost:3000/dashboard then dd the json data in the body
- Retrieve all data from customer, products, orders: http://localhost:3000/dashboard get request


# Important Scripts:
- start : starts the servar
- prettier : runs prettier
- lint : runs eslint
- build : compiles the ts to js
- jasmine : runs jasmine
- build-jasmine : compiles and then test with jasmine
- test : sets ENV to test, run migrate up, compile, jasmine test, run migrate down