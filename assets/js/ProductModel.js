class Product {
    constructor(id, name, brand, price, discount, type, size, condition, materials, color, description, image_front, image_back, image_closeup) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.discount = discount;
        this.type = type;
        this.size = size;
        this.condition = condition;
        this.materials = materials;
        this.color = color;
        this.description = description;
        this.image_front = image_front;
        this.image_back = image_back;
        this.image_closeup = image_closeup;
    }
}

class Manager {
    constructor() {
        this.allProducts = [];
        this.maleClothes = [];
        this.femaleClothes = [];
    }

    addManProduct(item) {
        this.maleClothes.push(item);
    }

    addWomanProduct(item) {
        this.femaleClothes.push(item);
    }

    createAllProducts() {
        this.allProducts = [...this.maleClothes, ...this.femaleClothes];
    }

    filterByName(string) {
        if (typeof string !== "string" || string.trim().length === 0) {
            return this.allProducts;
        }

        let filtered = [];

        let lowerCasedSearchStr = string.toLowerCase().trim();

        for (let i = 0; i < this.allProducts.length; i++) {
            let lowerCasedName = this.allProducts[i].name.toLowerCase();
            if (lowerCasedName.includes(lowerCasedSearchStr)) {
                filtered.push(this.allProducts[i]);
            }
        }
        return filtered;
    }
}
