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
function removeItem(event){
   var buttonClicked=event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('image-container')
    var cartItems = document.getElementsByClassName('img-box')[0]
    var cartItemNames = cartItems.getElementsByClassName('name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" min="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;

cartRow.innerHTML = cartRowContents;
cartItems.appendChild(cartRow);

cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('img-container')[0]
    var cartRows = cartItemContainer.getElementsByClassName('img-box')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('&euro', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '&euro' + total
}
