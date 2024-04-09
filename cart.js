class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.cart = JSON.parse(localStorage.getItem('cart')) || []; 
    }

    
    addToCart(product) {
        this.cart.push(product);
        this.saveCart(); 
        this.updateCartView(); 
    }

   
    removeFromCart(product) {
        const index = this.cart.findIndex(item => item.name === product.name);
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.saveCart(); 
            this.updateCartView(); 
        }
    }

    
    clearCart() {
        this.cart = [];
        this.saveCart(); 
        this.updateCartView(); 
    }

    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    
    getTotalCartValue() {
        return this.cart.reduce((total, product) => total + product.price, 0);
    }

    
    updateCartView() {
        const cartItemsContainer = document.getElementById('cartItems');
        const totalElement = document.getElementById('total');
        let total = 0;

        
        cartItemsContainer.innerHTML = '';

        
        this.cart.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>1</td>
                <td>${product.price}</td>

            `;
            cartItemsContainer.appendChild(row);
            total += product.price;
        });

  
        totalElement.textContent = `Загальна вартість: ${total} грн`;
    }
}

const user = new User('John', 'john@example.com');


const addToCartButtons = document.querySelectorAll('.add-to-cart');


addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.parentNode.querySelector('h3').textContent,
            price: parseFloat(this.parentNode.querySelector('.price').textContent.slice(1))
        };
        user.addToCart(product);
        alert('Товар додано до кошика!');
    });
});

const clearCartButton = document.getElementById('clearCart');


clearCartButton.addEventListener('click', function() {
    user.clearCart();
    alert('Кошик очищено!');
});


const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');

removeFromCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const product = {
            name: productName,
            price: parseFloat(this.parentNode.parentNode.querySelector('td:nth-child(2)').textContent)
        };
        user.removeFromCart(product);
        alert('Товар видалено з кошика!');
    });
});


window.addEventListener('load', function() {
    user.updateCartView();
});

