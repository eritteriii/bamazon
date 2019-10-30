var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ear16721',
    database: 'Bamazon'
});

function validateInput(value) {
    var int = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (int && (sign === 1)) {
        return true;
    } else {
        return 'You must enter a whole number (not zero).';
    }
}

function purchasePrompt() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.id;
        var quantity = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, {id: item}, function (err, data) {
            if (err) throw err;
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID.');
                showInv();
            } else {
                var itemtData = data[0];
                if (quantity <= itemtData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (itemtData.stock_quantity - quantity) + ' WHERE id = ' + item;

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;
                        console.log('The order has been placed! Your total is $' + itemtData.price * quantity);
                        console.log('Thank you!');
                        console.log("\n---------------------------------------------------------------------\n");
                        connection.end();
                    })
                } else {
                    console.log(
                        "Not enough product in stock, your order can not be placed."
                    );
                    console.log("Please modify your order.");
                    console.log(
                        "\n---------------------------------------------------------------------\n"
                    );
                    showInv();
                }
            }
        })
    })
}

function run() {
    showInv();
}

function showInv() {
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var tempRow = '';
        for (var i = 0; i < data.length; i++) {
            tempRow = 'Item ID: ' + data[i].id +
                '  //  Product Name: ' + data[i].product_name +
                '  //  Department: ' + data[i].department_name +
                '  //  Price: $' + data[i].price + '\n';

            console.log(tempRow);
        }
        console.log("---------------------------------------------------------------------\n");
        purchasePrompt();
    })
}

run();