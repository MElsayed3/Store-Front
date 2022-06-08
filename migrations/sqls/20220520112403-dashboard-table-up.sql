CREATE table dashboard (id serial primary key, product_id integer, order_id integer,
CONSTRAINT fk_products_dash FOREIGN KEY (product_id) references products(productid),
CONSTRAINT fk_orders_dash FOREIGN KEY (order_id) references orders(orderid));
					   
INSERT INTO dashboard (product_id, order_id) VALUES (2, 1);
INSERT INTO dashboard (product_id, order_id) VALUES (1, 2);
INSERT INTO dashboard (product_id, order_id) VALUES (2, 3);