DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
  id INTEGER AUTO_INCREMENT,
  product_name varchar (30),
  department_name varchar (30),
  price  DECIMAL (10,4),
  stock_quantity INTEGER,
  PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Tomato Sauce', 'Grocery', 2.75, 100),
		('Rigatoni Noodles', 'Grocery', 1.09, 200),
		('Italian Sausage', 'Grocery', 4.50, 50),
		('Garlic Bread', 'Grocery', 4.25, 25),
		('GeForce 2080ti', 'Electronics', 1900.00, 14),
		('iPhone 11 Pro', 'Electronics', 1099.00, 300),
		('Legos', 'Toys', 24.99, 700),
		('Printer Paper', 'Office Supplies', 8.95, 900),
        ('Printer Ink', 'Office Supplies', 36.89, 1000)