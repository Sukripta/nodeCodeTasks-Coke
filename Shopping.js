function Product(name, price) {
    Object.defineProperty(this,'name', {
        value: name,
        writable: false,
        enumerable: true,
        configurable: false
    });
    this.price = price;
}

function ShoppingCart() {
    this.products = [];
}

ShoppingCart.prototype.addProduct = function(product){
    this.products.push(product);
}

ShoppingCart.prototype.removeProduct = function(item){
    this.products = this.products.filter(function(product){
        return product.name !== item;
    });
}

ShoppingCart.prototype.calTotal = function(){
    return this.products.reduce(function(total,product){
        return (total + product.price);
    },0);
}


// Product instace
const apple = new Product('Apple', 40);
const orange = new Product('Orange', 20);
const banana = new Product('Banana', 10);

// Shopping cart instance
const myCart = new ShoppingCart();

// add products
myCart.addProduct(apple);
myCart.addProduct(orange);

// remove products
myCart.removeProduct('Apple');

// calculate total
let totalPrice = myCart.calTotal();
console.log('Total: ', totalPrice);

