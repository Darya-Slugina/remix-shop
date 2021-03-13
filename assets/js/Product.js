class Product {
    constructor(gender, id, name, brand, price, discount, type, size, condition, materials, color, description, image_front, image_back, image_closeup) {
        this.gender = gender;
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
        this.priceAfterDiscount = getNewPrice(price, discount);
    }
}
