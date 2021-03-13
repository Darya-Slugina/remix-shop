
function renderAllProducts() {
    let extension = location.hash.split('/')[1];
    if (extension === 'women') {
        womenBtn.classList.add("selectedFilter");
        menBtn.classList.remove('selectedFilter');

        eventOnPriceBox();
        getFilterOptions(siteManager.femaleClothes);

        siteManager.resetAllFilters();
        siteManager.updateType('women');
        displayClothes(siteManager.filteredItems);     


        // event listeners for sort buttons
        sortByPriceAscBtn.addEventListener('click', function (ev) {

            if (sortByPriceAscBtn.classList.contains("checked")) {
                sortByPriceAscBtn.classList.remove("checked");
            } else {
                sortByPriceAscBtn.classList.add("checked");
                sortByPriceDescBtn.classList.remove("checked");
            }

            updateSorter('ascending');
            displayClothes(siteManager.femaleClothes);



        });
        sortByPriceDescBtn.addEventListener('click', function (ev) {

            if (sortByPriceDescBtn.classList.contains("checked")) {
                sortByPriceDescBtn.classList.remove("checked");
            } else {
                sortByPriceDescBtn.classList.add("checked");
                sortByPriceAscBtn.classList.remove("checked");
            }

            updateSorter('descending');
            displayClothes(siteManager.femaleClothes);

        });

        finalBreadcrumbTarget.innerHTML = 'Дамски дрехи';
        finalBreadcrumbTarget.href = '#allProducts/women';
        allBreadcrumbTarget.addEventListener('click', function (ev) {
            ev.preventDefault();

            displayClothes(siteManager.femaleClothes);
            // clear checked filters
        })

    } else if (extension === 'men') {



        let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        productImages.forEach(img => changeImgOnHover(img));

        let buttons = Array.from(document.getElementsByClassName("product-photos"));
        buttons.forEach(function (currentBtn) {
            currentBtn.addEventListener('click', function (ev) {
                // TODO: Check what is the id;
                console.log('ID is: ', ev);
                localStorage.setItem('productId', ev.target.value);
                location.hash = '#overview';
            });
        });


        womenBtn.classList.remove('selectedFilter');
        menBtn.classList.add("selectedFilter");

        siteManager.resetAllFilters();
        siteManager.updateType('men');


        eventOnPriceBox();
        getFilterOptions(siteManager.maleClothes);
        displayClothes(siteManager.filteredItems);


        // // event listeners for sort buttons
        // sortByPriceAscBtn.addEventListener('click', function (ev) {
        //     sortByPriceAscBtn.classList.toggle("checked");

        //     siteManager.updateSorter('ascending');
        //     displayClothes(siteManager.filteredItems);

        //     let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        //     productImages.forEach(img => changeImgOnHover(img));
        // });

        // sortByPriceDescBtn.addEventListener('click', function (ev) {
        //     sortByPriceDescBtn.classList.toggle("checked");

        //     siteManager.updateSorter('descending');
        //     displayClothes(siteManager.filteredItems);

        //     let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
        //     productImages.forEach(img => changeImgOnHover(img));
        // });

        finalBreadcrumbTarget.innerHTML = 'Мъжки дрехи';
        finalBreadcrumbTarget.href = '#allProducts/men';
        allBreadcrumbTarget.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayClothes(siteManager.filteredItems);
            let productImages = Array.from(document.getElementsByClassName("product-img img-display"));
            productImages.forEach(img => changeImgOnHover(img));
            // clear checked filters
        })
    } else {
        womenBtn.classList.remove('selectedFilter');
        menBtn.classList.remove('selectedFilter');
    }

}