module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || null || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0,
                singlePrice: 0
            }
        }

        storedItem.qty++;
        storedItem.singlePrice = storedItem.item.price;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        this.totalPrice = Math.floor(this.totalPrice * 100) / 100;
    }

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;


        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.addMore = function (id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
        this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;


        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    }

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        this.totalPrice = Math.floor(this.totalPrice * 100) / 100;

        delete this.items[id];
    }

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};