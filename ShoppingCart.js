const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class ShoppingCart {
    constructor() {
        this.products = new Map(); // Stores { productName: { price, quantity } }
    }

    // add products
    addProduct(productName, price, quantity) {
        if (isNaN(price) || price < 0) {
            console.log("Error: Product price must be a non-negative number.");
            return;
        }
        if (isNaN(quantity) || quantity <= 0) {
            console.log("Error: Quantity must be a positive number.");
            return;
        }

        if (this.products.has(productName)) {
            console.log(`Error: Product "${productName}" already exists in the cart.`);
            return;
        }

        this.products.set(productName, { price, quantity });
        console.log(`${quantity} x "${productName}" added to cart.`);
    }

    // remove products
    removeProduct(productName, quantityToRemove) {
        if (!this.products.has(productName)) {
            console.log(`Error: Product "${productName}" not found in the cart.`);
            return;
        }
        if (isNaN(quantityToRemove) || quantityToRemove <= 0) {
            console.log("Error: Quantity to remove must be a positive number.");
            return;
        }

        let product = this.products.get(productName);
        if (quantityToRemove >= product.quantity) {
            this.products.delete(productName);
            console.log(`"${productName}" removed from the cart.`);
        } else {
            product.quantity -= quantityToRemove;
            console.log(`${quantityToRemove} x "${productName}" removed. Remaining quantity: ${product.quantity}.`);
        }
    }

    // calculate total
    calculateTotalPrice() {
        let total = 0;
        for (let [productName, productDetails] of this.products) {
            total += productDetails.price * productDetails.quantity;
        }
        return total;
    }

    // view all items
    viewCart() {
        for (let [productName, productDetails] of this.products) {
            console.log(`${productName} (x${productDetails.quantity}) - ${(productDetails.price * productDetails.quantity)}`);
        }
        console.log(`Total: ${this.calculateTotalPrice()}`);
    }
}

const cart = new ShoppingCart();

// menu design
function showMenu() {
    console.log("\n--- Shopping Cart Menu ---");
    console.log("1. Add Product");
    console.log("2. Remove Product");
    console.log("3. View Cart");
    console.log("4. Calculate Total Price");
    console.log("5. Exit");
    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                rl.question("Enter product name: ", (name) => {
                    rl.question("Enter price: ", (price) => {
                        rl.question("Enter quantity: ", (quantity) => {
                            cart.addProduct(name, parseFloat(price), parseInt(quantity));
                            showMenu();
                        });
                    });
                });
                break;
            case '2':
                rl.question("Enter product name to remove: ", (name) => {
                    rl.question("Enter quantity to remove: ", (quantity) => {
                        cart.removeProduct(name, parseInt(quantity));
                        showMenu();
                    });
                });
                break;
            case '3':
                cart.viewCart();
                showMenu();
                break;
            case '4':
                console.log(`Your total price is: ${cart.calculateTotalPrice()}`);
                showMenu();
                break;
            case '5':
                console.log("Exiting shopping cart. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                showMenu();
                break;
        }
    });
}

// start app
showMenu();
