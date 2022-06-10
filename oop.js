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
        let rega = new RegExp(`${this.filter}`);     
        if (this.sortPrice == true && this.sortDir == true) {
            this.#Goods.sort((a,b) => (a.price - b.price));
            return this.#Goods.filter(good => rega.test(good.name));
        } else if (this.sortPrice == true && this.sortDir == false) {               
            this.#Goods.sort((a,b) => (b.price - a.price));         
            return this.#Goods.filter(good => rega.test(good.name));
        } else {
            return this.#Goods.filter(good => rega.test(good.name));
        }
    }
    add(good) {
        this.good = good;
        this.#Goods = this.#Goods.concat(good);
        return this.#Goods;
    }
    remove (id) {
        this.id=id;
        this.#Goods.forEach((good, i) => {if(good.id == this.id){this.#Goods.splice(i,1)}});
    }
} 

class BasketGood extends Good {
    constructor (good, ammount) {
        let id = good.id;
        let name = good.name;
        let description = good.description;
        let sizes = good.sizes;
        let price = good.price;
        let availabel = good.availabel;
        super(id, name, description, sizes, price, availabel)        
        this.ammount = ammount;
        
    }
}

class Basket {
    goods = []    
    constructor (items) {        
        this.items = items;
        this.goods = this.goods.concat(items);      
    }
    get totalAmount() {                   
        return this.goods.reduce((total, ammount) => total + ammount.ammount, 0); 
    }   

    get totalSum() {
        return this.goods.reduce((sum, a) => a.price*a.ammount + sum, 0);
    }
    add(good, ammount) {
        this.good = good;
        this.ammount = ammount;        
        for (let i=0; i<this.goods.length; ++i) {
            if (this.goods[i].id == this.good.id) {
                this.goods[i].ammount = this.goods[i].ammount + ammount;
                break;
            }
            if (i == this.goods.length - 1) {
                this.good['ammount'] = 0;
                this.goods.push(this.good);
            }            
        }
        return this.goods;        
    }

    remove(good, ammount) {
        this.good = good;
        this.ammount = ammount;        
        for (let i=0; i<this.goods.length; ++i) {
            if (this.goods[i].id == this.good.id) {
                this.goods[i].ammount = this.goods[i].ammount - ammount;
                if (this.goods[i].ammount < 1) {
                    this.goods.splice(i,1); 
                }    
                break;
            }        
        }
        return this.goods;
    }

    clear() {
        this.goods.splice(0,this.goods.length);
        return this.goods;
    }

    removeUnavailable() {
        this.goods.forEach((good, i) => {if(good.availabel == -1){this.goods.splice(i,1)}});
        return this.goods;
    }

}

const p1 = new Good(1, 'джинсы', 'зимние', ['xl','l','m','s'], 1500, 1);
const p2 = new Good(2, 'кеды', 'летние', ['xl','l','m','s'], 2500, 1);
const p3 = new Good(3, 'куртка', 'зимняя', ['xl','l','m','s'], 3500, 1);
const p4 = new Good(4, 'шапка', 'меховая', ['xl','l','m','s'], 500, 1);
const p5 = new Good(5, 'футболка', 'хлопковая', ['xl','l','m','s'], 1000, 1);
p2.setAvailable();

item_list = [p2, p3, p4, p5];
let l1 = new GoodsList(item_list, 'к', true, true);
let l2 = new GoodsList(item_list, 'дж', false, true);
let l3 = new GoodsList(item_list, 'ка', true, false);
l1.add(p1);
l1.remove(5);
console.log(l1.list);


const g1 = new BasketGood(p1, 3);
const g2 = new BasketGood(p2, 3);
const g3 = new BasketGood(p3, 4);
const g4 = new BasketGood(p4, 2);
const g5 = new BasketGood(p5, 5);

let goods = [g1, g2, g3, g4];
let b1 = new Basket(goods);
b1.add(p5, 8);
b1.remove(p5, 4);
console.log('totalAmount '+ b1.totalAmount);
console.log('totalSum '+ b1.totalSum);
b1.removeUnavailable();
b1.clear();
