let siteManager = (function () {
    class Manager {
        constructor() {
            this.allProducts = [];
            this.maleClothes = [];
            this.femaleClothes = [];
            this.filters = {
                type: null,
                sizes: null,
                brands: null,
                conditions: null,
                prices: null,
                sorter: null,
                names: null
            }
            this.filteredItems = this.allProducts;
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

        filterItems() {
            // Type of the products
            const type = location.hash.split('/')[1];

            let filteredItems = this.allProducts.filter(product => {
                // TODO: Add the filtering logic here...

                // if (this.filters.names !== undefined && this.filters.names.length > 0) {
                //     let isNameInRange = false;
                //     console.log(this.filters.names);
                //     if (typeof this.filters.names !== "string" || this.filters.names.trim().length === 0) {
                //         return false;
                //     }

                //     let lowerCasedSearchStr = this.filters.names.toLowerCase().trim();

                //     for (let i = 0; i < this.allProducts.length; i++) {
                //         let lowerCasedName = this.allProducts[i].name.toLowerCase();
                //         if (lowerCasedName.includes(lowerCasedSearchStr)) {
                //             isNameInRange = true;
                //         }
                //     }

                //     if(!isNameInRange){
                //         return false;
                //     }
                // }

                if (this.filters.type) {
                    if (product.gender !== this.filters.type) {
                        return false;
                    }
                }

                if (this.filters.sizes !== undefined && this.filters.sizes.length > 0) {
                    if (!this.filters.sizes.includes(product.size)) {
                        return false;
                    }
                }

                if (this.filters.brands !== undefined && this.filters.brands.length > 0) {
                    if (!this.filters.brands.includes(product.brand)) {
                        return false;
                    }
                }

                if (this.filters.conditions !== undefined && this.filters.conditions.length > 0) {
                    if (!this.filters.conditions.includes(product.condition)) {
                        return false;
                    }
                }

                if (this.filters.prices !== undefined && this.filters.prices.length > 0) {
                    let isPriceInRange = false;
                    if (this.filters.prices.includes("priceBelow5") && product.newPrice <= 5) {
                        isPriceInRange = true;
                    }
                    if (this.filters.prices.includes("price5To10") && product.newPrice > 5 && product.newPrice <= 10) {
                        isPriceInRange = true;
                    }
                    if (this.filters.prices.includes("price10To50") && product.newPrice > 10 && product.newPrice <= 50) {
                        isPriceInRange = true;
                    }
                    if (this.filters.prices.includes("price50To100")) {
                        if (product.newPrice > 50 && product.newPrice <= 100) {
                            isPriceInRange = true;

                        }
                    }
                    if (this.filters.prices.includes("priceAbove100")) {
                        if (product.newPrice > 100) {
                            isPriceInRange = true;

                        }
                    }

                    if (!isPriceInRange) {
                        return false
                    }
                }
            return true;
        })


        // Sort products if sorter is applied
        if(this.filters.sorter) {
            filteredItems.sort((a, b) => {
                if (this.filters.sorter === 'ascending') {
                    return a.price - b.price
                } else {
                    return b.price - a.price
                }
            })
        }

            this.filteredItems = filteredItems;
}


        resetAllFilters() {
    this.filters = {};
}

updateType(type) {
    this.filters.type = type;
    this.filterItems();
}

updatePrices(prices) {
    this.filters.prices = prices;
    console.log(this.filters.prices);
    this.filterItems();
}

updateSizes(sizes) {
    this.filters.sizes = sizes;
    this.filterItems();
}

updateBrands(brands) {
    this.filters.brands = brands;
    this.filterItems();
}

updateConditions(conditions) {
    this.filters.conditions = conditions;
    this.filterItems();
}

updateNames(names) {
    this.filters.names = names;
    this.filterItems();
}

updateSorter(sorter) {
    this.filters.sorter = sorter;
    this.filterItems();
}

// TODO: You can extract this one in the filters
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

return new Manager();
}) ()