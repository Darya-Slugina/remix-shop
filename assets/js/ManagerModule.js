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
}