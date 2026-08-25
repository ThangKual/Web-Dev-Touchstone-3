// Product data
const bakeryItems = [
    "Sourdough Bread",
    "Croissants",
    "Custom Cake"
];

// Load favorites from localStorage
function getFavorites() {
    const savedFavorites = localStorage.getItem("bakeryFavorites");

    if (savedFavorites) {
        return JSON.parse(savedFavorites);
    }

    return [];
}


// Save favorites to localStorage
function saveFavorites(favorites) {
    localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}


// Add a favorite item
function addFavorite(item) {
    const favorites = getFavorites();

    if (!favorites.includes(item)) {
        favorites.push(item);
        saveFavorites(favorites);
    }

    displayFavorites();
}


// Display favorite items
function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");

    if (!favoritesList) {
        return;
    }

    const favorites = getFavorites();

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<li>No favorites selected yet.</li>";
        return;
    }

    favorites.forEach(function(item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        favoritesList.appendChild(listItem);
    });
}


// Set up favorite buttons
function setupFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const item = button.getAttribute("data-item");
            addFavorite(item);
        });
    });
}


// Validate the contact form
function validateForm(event) {
    const form = document.getElementById("contact-form");

    if (!form) {
        return;
    }

    const name = document.getElementById("name");
    const email = document.getElementById("email");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";

    // Required field and minimum length validation
    if (name.value.trim().length < 2) {
        nameError.textContent = " Please enter at least 2 characters.";
        isValid = false;
    }

    // Email format validation
    if (!email.value.includes("@") || !email.value.includes(".")) {
        emailError.textContent = " Please enter a valid email address.";
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
}


// Set up form validation
function setupForm() {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", validateForm);
    }
}


// Run when page loads
document.addEventListener("DOMContentLoaded", function() {
    setupFavoriteButtons();
    displayFavorites();
    setupForm();
});
