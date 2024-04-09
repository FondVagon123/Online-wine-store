class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.cart = JSON.parse(localStorage.getItem('cart')) || []; 
    }


    addToCart(product) {
        this.cart.push(product);
        this.saveCart(); 
    }

    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}


const user = new User('John', 'john@example.com');


const addToCartButtons = document.querySelectorAll('.add-to-cart');


addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        
        const product = {
            name: this.parentNode.querySelector('h3').textContent,
            price: parseFloat(this.parentNode.querySelector('.price').textContent.replace('$', '')),
            quantity: 1 
        };
        
        
        user.addToCart(product);
        alert('Товар додано до кошика!');
    });
});


if (window.location.pathname === '/cart.html') {
    
    const cartItemsContainer = document.getElementById('cartItems');

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    const totalValue = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

    
    cart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>$${product.price * product.quantity}</td>
            <td><button class="remove-from-cart" data-name="${product.name}">Видалити</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Загальна вартість: $${totalValue.toFixed(2)}`;

    
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const productName = event.target.dataset.name;
            const productIndex = cart.findIndex(product => product.name === productName);
            if (productIndex !== -1) {
                cart.splice(productIndex, 1); 
                localStorage.setItem('cart', JSON.stringify(cart)); 
                event.target.closest('tr').remove(); 
                totalElement.textContent = `Загальна вартість: $${(totalValue - (cart[productIndex].price * cart[productIndex].quantity)).toFixed(2)}`; // Оновлюємо відображення загальної вартості
            }
        }
    });
}



