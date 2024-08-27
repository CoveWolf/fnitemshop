async function fetchFortniteItemShop() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/shop/br');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data);  // Log the entire API response
        displayItems(data);
    } catch (error) {
        console.error("Error fetching the item shop data:", error);
        document.getElementById('shop-container').innerHTML = '<p>Error loading data.</p>';
    }
}

function displayItems(data) {
    let shopItems = [];

    // Check if daily items exist, otherwise fallback to featured
    if (data.data.daily && data.data.daily.entries) {
        shopItems = data.data.daily.entries;
    } else if (data.data.featured && data.data.featured.entries) {
        shopItems = data.data.featured.entries;
    } else {
        document.getElementById('shop-container').innerHTML = '<p>No items available in the shop.</p>';
        return;
    }

    // Display the shop items
    shopItems.forEach(item => {
        const itemName = item.items[0].name;
        const itemPrice = item.finalPrice;
        const itemImage = item.items[0].images.icon;

        const itemElement = `
            <div class="item">
                <img src="${itemImage}" alt="${itemName}">
                <p>${itemName}</p>
                <p>Price: ${itemPrice} V-Bucks</p>
            </div>
        `;

        document.getElementById('shop-container').innerHTML += itemElement;
    });
}

fetchFortniteItemShop();
