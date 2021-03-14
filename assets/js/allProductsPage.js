function renderAllProducts() {
    let extension = location.hash.split('/')[1];
    if (extension === 'women') {
        womenBtn.classList.add("selectedFilter");
        menBtn.classList.remove('selectedFilter');

        siteManager.resetAllFilters();
        siteManager.updateType('women');

        eventOnPriceBox();
        getFilterOptions(siteManager.femaleClothes);
        displayClothes(siteManager.filteredItems);
        sortItems();


        finalBreadcrumbTarget.innerHTML = 'Дамски дрехи';
        finalBreadcrumbTarget.href = '#allProducts/women';
        allBreadcrumbTarget.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayClothes(siteManager.femaleClothes);
            // clear checked filters
        })

    } else if (extension === 'men') {
        womenBtn.classList.remove('selectedFilter');
        menBtn.classList.add("selectedFilter");

        siteManager.resetAllFilters();
        siteManager.updateType('men');

        eventOnPriceBox();
        getFilterOptions(siteManager.maleClothes);
        displayClothes(siteManager.filteredItems);
        sortItems();

        finalBreadcrumbTarget.innerHTML = 'Мъжки дрехи';
        finalBreadcrumbTarget.href = '#allProducts/men';
        allBreadcrumbTarget.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayClothes(siteManager.filteredItems);
            // clear checked filters
        })
    } else {
        womenBtn.classList.remove('selectedFilter');
        menBtn.classList.remove('selectedFilter');
    }

}

// event listeners for sort buttons
function sortItems() {
    sortByPriceAscBtn.addEventListener('click', function (ev) {

        if (sortByPriceAscBtn.classList.contains("checked")) {
            sortByPriceAscBtn.classList.remove("checked");
        } else {
            sortByPriceAscBtn.classList.add("checked");
            sortByPriceDescBtn.classList.remove("checked");
        }

        siteManager.updateSorter('ascending');
        displayClothes(siteManager.filteredItems);



    });
    sortByPriceDescBtn.addEventListener('click', function (ev) {

        if (sortByPriceDescBtn.classList.contains("checked")) {
            sortByPriceDescBtn.classList.remove("checked");
        } else {
            sortByPriceDescBtn.classList.add("checked");
            sortByPriceAscBtn.classList.remove("checked");
        }

        siteManager.updateSorter('descending');
        displayClothes(siteManager.filteredItems);

    });
}
