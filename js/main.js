import { products } from "./products.js";

import {
    searchProducts,
    filterProductsByCategory,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";

import {
    displayProducts,
    displaySummary
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function updateSummary(productArray) {
    const totalValue = calculateTotalInventoryValue(productArray);
    const lowStock = countLowStockProducts(productArray);
    const outOfStock = countOutOfStockProducts(productArray);

    displaySummary(totalValue, lowStock, outOfStock);
}

function handleSearch() {
    const query = searchInput.value.trim();
    const category = categoryFilter.value;

    let results = searchProducts(products, query);

    results = filterProductsByCategory(results, category);

    displayProducts(results);
    updateSummary(results);
}

searchBtn.addEventListener("click", handleSearch);

categoryFilter.addEventListener("change", handleSearch);

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "All";

    displayProducts(products);
    updateSummary(products);
});

displayProducts(products);
updateSummary(products);