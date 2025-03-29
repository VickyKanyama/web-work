var AddtoCart=document.getElementsByClassName('add-item')
for(var i=0; i<AddtoCart.length;i++){
    var addButton=AddtoCart[i];
    addButton.addEventListener('click', addtoCart);
}
function addtoCart(event){
    var buttonClicked=event.target;
    var shopItem = buttonClicked.parentElement.parentElement
    var title = shopItem.getElementsByClassName('name')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
var removeButton=document.getElementsByClassName('danger')
for( var i=0; i<removeButton.length; i++){
    var button=removeButton[i];
    button.addEventListener('click',removeItem)
}
// function removeItem(event){
//    var buttonClicked=event.target;
//     buttonClicked.parentElement.parentElement.remove();
//     updateCartTotal()
// }

function removeItem(index) {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1); // Remove the item at given index
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI(); // Refresh UI
}

// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement('div')
//     cartRow.classList.add('image-container')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartItemNames = cartItems.getElementsByClassName('name')
//     for (var i = 0; i < cartItemNames.length; i++) {
//         if (cartItemNames[i].innerText == title) {
//             alert('This item is already added to the cart')
//             return
//         }
//     }

function addItemToCart(title, price, imageSrc) {
    // Retrieve existing cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title === title) {
            alert('This item is already added to the cart');
            return; // Exit the function if the item is found
        }
    }

    // Create a new cart row object for the new item
    var cartRow = {
        title: title,
        price: price,
        imageSrc: imageSrc
    };
    
    // Add the new item to the cart items array
    cartItems.push(cartRow);
    
    // Update the local storage with the new cart items array
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Update the UI to reflect the new cart state
    updateCartUI();
}

function updateCartUI() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartContainer = document.getElementsByClassName('cart-items')[0];
    cartContainer.innerHTML = ''; // Clear previous items

    cartItems.forEach((item, index) => {
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');

        cartRow.innerHTML = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" min="1">
                <button class="danger" type="button">REMOVE</button>
            </div>`;

        cartContainer.appendChild(cartRow);

        // **Add event listeners correctly**
        cartRow.querySelector('.danger').addEventListener('click', function () {
            removeItem(index);
        });

        cartRow.querySelector('.cart-quantity-input').addEventListener('change', updateCartTotal);
    });

    updateCartTotal();
}


 
// var cartRowContents = `
//     <div class="cart-item cart-column">
//         <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//         <span class="cart-item-title">${title}</span>
//     </div>
//     <span class="cart-price cart-column">${price}</span>
//     <div class="cart-quantity cart-column">
//         <input class="cart-quantity-input" type="number" value="1" min="1">
//         <button class="btn btn-danger" type="button">REMOVE</button>
//     </div>`;

// cartRow.innerHTML = cartRowContents;
// cartItems.appendChild(cartRow);

// cartRow.querySelector('.btn-danger').addEventListener('click', removeItem);
// cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function loadCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartContainer = document.getElementsByClassName('cart-items')[0];
    

    // if (!cartContainer) {
    //     console.error("Error: .cart-items container not found in the DOM.");
    //     return; // Stop execution if the container is missing
    // }

    cartContainer.innerHTML = ''; // Clear previous items

    cartItems.forEach((item, index) => {
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.innerHTML = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" min="1">
                <button class="danger" type="button">REMOVE</button>
            </div>`;

        cartContainer.appendChild(cartRow);
        cartRow.querySelector('.danger').addEventListener('click', function () {
            removeItem(index);
        });
    });

    updateCartTotal();
}

document.addEventListener('DOMContentLoaded', loadCart);

