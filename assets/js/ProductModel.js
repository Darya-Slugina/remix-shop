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
            }
            this.searchValue = null,
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

            // If this filters is empty object
            if(this.filters === null) {
                return false;
            }
       
            let filteredItems = this.allProducts.filter(product => {
                if (this.searchValue) {
                    let lowerCasedValue = this.searchValue.toLowerCase();
                    let lowerCasedName = product.name.toLowerCase();
                    if (!lowerCasedName.includes(lowerCasedValue)) {
                        return false;
                    }
                }

                if (this.filters.type && product.gender !== this.filters.type) {
                    return false;
                }

                if (this.filters.sizes && this.filters.sizes.length > 0 && !this.filters.sizes.includes(product.size)) {
                        return false;
                }

                if (this.filters.brands && this.filters.brands.length > 0 &&  !this.filters.brands.includes(product.brand)) {
                        return false;
                    }

                if (this.filters.conditions && this.filters.conditions.length > 0 && !this.filters.conditions.includes(product.condition)) {
                        return false;
                }

                if (this.filters.prices && this.filters.prices.length > 0) {
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
                    if (this.filters.prices.includes("price50To100") && product.newPrice > 50 && product.newPrice <= 100) {
                            isPriceInRange = true;
                    }
                    if (this.filters.prices.includes("priceAbove100") && product.newPrice > 100) {
                            isPriceInRange = true;
                    }

                    if (!isPriceInRange) {
                        return false
                    }
                }
                return true;
            })


            // Sort products if sorter is applied
            if (this.filters.sorter) {
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

        updateSearchFilter(searchValue) {
            this.searchValue = searchValue;
            this.filterItems();
        }
    }

    return new Manager();
})()