class Good {
    constructor(id, name, description, sizes, price, availabel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.availabel = availabel;
    }
    setAvailable() {
        this.availabel *= -1;
    }
}
class GoodsList {
    #Goods = [];    
    constructor(items, filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
        this.items = items;        
        this.#Goods = this.#Goods.concat(items);  
    }
    get list() {
        if (this.sortPrice == true && this.sortDir == true) {
            return this.#Goods.sort((a,b) => (a.price - b.price));
        } else if (this.sortPrice == true && this.sortDir == false) {
            return this.#Goods.sort((a,b) => (b.price - a.price));
        } else {
            return this.#Goods;
        }
    }
    add(good) {
        this.good = good;
        this.#Goods = this.#Goods.concat(good);
    }
    remove (id) {
        this.id=id;
        G
    }
}
const p1 = new Good(1, 'джинсы', 'зимние', ['xl','l','m','s'], 1500, 1);
const p2 = new Good(2, 'кеды', 'летние', ['xl','l','m','s'], 2500, 1);
const p3 = new Good(3, 'куртка', 'зимняя', ['xl','l','m','s'], 3500, 1);
const p4 = new Good(4, 'шапка', 'меховая', ['xl','l','m','s'], 500, 1);
const p5 = new Good(5, 'футболка', 'хлопковая', ['xl','l','m','s'], 1000, 1);
p2.setAvailable();
item_list = [p2, p3, p4, p5];
let l1 = new GoodsList(item_list, 'xx', true, false);
l1.add(p1);
console.log(l1.list)

