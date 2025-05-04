document.addEventListener('DOMContentLoaded', function() {
    const CART_KEY = 'cartCounts';

    function loadCart() {
        return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    const products = [];
    for (let i = 1; i <= 28; i++) {
        products.push({
            id: i,
            name: `Лампочка ${i}`,
            image: 'https://img.lu.ru/add_photo/big/l/f/y/lfy_7560_t_2.jpg',
            description: `Подробное описание лампочки ${i}. Энергосберегающая LED-лампа, срок службы 25000 часов.`,
            price: Math.floor(100 + Math.random() * 500),
            wattage: [5, 7, 10, 15][Math.floor(Math.random() * 4)]
        });
    }

    if (document.getElementById('cardsContainer')) {
        const container = document.getElementById('cardsContainer');
        const showMoreBtn = document.getElementById('showMoreBtn');


        function createCountInput(productId) {
            const cart = loadCart();
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.className = 'count-input';
            if (cart[productId] != null && cart[productId] > 0) {
                input.value = cart[productId];
            } else {
                input.value = '';
            }
            return input;
        }

        function createCard(product) {
            const card = document.createElement('div');
            card.className = 'card';

            const imgLink = document.createElement('a');
            imgLink.href = `card.html?id=${product.id}`;
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            imgLink.appendChild(img);

            const bottom = document.createElement('div');
            bottom.className = 'card-bottom';

            const titleLink = document.createElement('a');
            titleLink.href = `card.html?id=${product.id}`;
            titleLink.className = 'card-title';
            titleLink.textContent = product.name;


            const btnGroup = document.createElement('div');
            btnGroup.className = 'btn-group';
            const minusBtn = document.createElement('button');
            minusBtn.className = 'control-btn';
            minusBtn.textContent = '-';
            const input = createCountInput(product.id);
            const plusBtn = document.createElement('button');
            plusBtn.className = 'control-btn';
            plusBtn.textContent = '+';


            plusBtn.addEventListener('click', () => {
                let value = parseInt(input.value) || 0;
                value++;
                input.value = value;
                const cart = loadCart();
                cart[product.id] = value;
                saveCart(cart);
            });


            minusBtn.addEventListener('click', () => {
                let value = parseInt(input.value) || 0;
                value = Math.max(0, value - 1);
                input.value = value || '';
                const cart = loadCart();
                if (value > 0) cart[product.id] = value;
                else delete cart[product.id];
                saveCart(cart);
            });

            btnGroup.append(minusBtn, input, plusBtn);
            bottom.append(titleLink, btnGroup);
            card.append(imgLink, bottom);

            return card;
        }


        function renderCards(count) {
            container.innerHTML = '';
            products.slice(0, count).forEach(p => {
                container.appendChild(createCard(p));
            });
        }

        renderCards(16);
        if (products.length <= 16) {
            showMoreBtn.style.display = 'none';
        }
        showMoreBtn.addEventListener('click', () => {
            renderCards(products.length);
            showMoreBtn.style.display = 'none';
        });
    }


    else if (document.getElementById('productDetails')) {
        const params = new URLSearchParams(window.location.search);
        const productId = parseInt(params.get('id'));
        const product = products.find(p => p.id === productId);
        const container = document.getElementById('productDetails');

        if (product) {
            container.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h1 class="product-title">${product.name}</h1>
                </div>
                
                <div class="product-info">
                    <div class="product-header">
                        <li>Цена: ${product.price} руб.</li>
                        <div class="cart-controls">
                            <span class="cart-label">В корзину:</span>
                            <button class="quantity-btn minus">-</button>
                            <input type="number" min="1" value="1" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>

                    <div class="product-description">
                        <h2>Описание:</h2>
                        <p>${product.description}</p>
                    </div>
        
                    <!-- Характеристики -->
                    <div class="product-specs">
                        <h2>Характеристики:</h2>
                        <ul>
                            <li>Мощность: ${product.wattage} Вт</li>
                        </ul>
                    </div>
                </div>
            `;
        
        

            const qtyInput     = container.querySelector('.quantity-input');
            const plusBtn      = container.querySelector('.minus').nextElementSibling.nextElementSibling;
            const minusBtn     = container.querySelector('.minus');
            const addToCartBtn = container.querySelector('.add-to-cart');


            const cart = loadCart();
            if (cart[productId] != null && cart[productId] > 0) {
                qtyInput.value = cart[productId];
            } else {
                qtyInput.value = '';
            }

            function saveProductCount(count) {
                const cartNow = loadCart();
                if (count > 0) cartNow[productId] = count;
                else delete cartNow[productId];
                saveCart(cartNow);
            }


            plusBtn.addEventListener('click', () => {
                let v = parseInt(qtyInput.value) || 0;
                v++;
                qtyInput.value = v;
                saveProductCount(v);
            });
            minusBtn.addEventListener('click', () => {
                let v = parseInt(qtyInput.value) || 0;
                v = Math.max(0, v - 1);
                qtyInput.value = v || '';
                saveProductCount(v);
            });


            qtyInput.addEventListener('input', () => {
                let v = parseInt(qtyInput.value) || 0;
                saveProductCount(v);
            });

        } else {
            container.innerHTML = '<p class="not-found">Товар не найден</p>';
        }
    }
});

if (document.body.contains(document.getElementById('cartBody'))) {
    const CART_KEY = 'cartCounts';
    function loadCart() {
      return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    }
    function saveCart(cart) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  

    const products = [];
    for (let i = 1; i <= 28; i++) {
      products.push({
        id: i,
        name: `Лампочка ${i}`,
        price: Math.floor(100 + Math.random() * 500)
      });
    }
  
    const cart = loadCart();
    const cartBody = document.getElementById('cartBody');
  
    function updateTotal() {
      const sum = Array.from(cartBody.querySelectorAll('tr'))
        .reduce((acc, tr) => acc + parseInt(tr.children[3].textContent), 0);
      document.getElementById('totalSum').textContent = sum;
    }
  
    Object.entries(cart).forEach(([id, count]) => {
      const prod = products.find(p => p.id === +id);
      if (!prod) return;
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${prod.name}</td>
        <td>${prod.price}</td>
        <td>
          <button class="quantity-btn minus">-</button>
          <input type="number" min="0" value="${count}" class="quantity-input"/>
          <button class="quantity-btn plus">+</button>
        </td>
        <td>${prod.price * count}</td>
        <td><button class="remove-btn">×</button></td>
      `;
      cartBody.append(row);
  
      const input = row.querySelector('.quantity-input');
      const btnPlus = row.querySelector('.plus');
      const btnMinus = row.querySelector('.minus');
      const btnRemove = row.querySelector('.remove-btn');
      const tdSum = row.children[3];
  
      function refresh(newCount) {
        if (newCount <= 0) {
          delete cart[id];
          row.remove();
        } else {
          cart[id] = newCount;
          input.value = newCount;
          tdSum.textContent = prod.price * newCount;
        }
        saveCart(cart);
        updateTotal();
      }
  
      btnPlus.addEventListener('click', () => refresh(+input.value + 1));
      btnMinus.addEventListener('click', () => refresh(+input.value - 1));
      input.addEventListener('change', () => refresh(+input.value));
      btnRemove.addEventListener('click', () => refresh(0));
    });
  
    updateTotal();
  
    document.getElementById('orderBtn').addEventListener('click', () => {
      window.location.href = 'placing_order.html';
    });
  }

// === placing order page ===
if (document.getElementById('orderForm')) {
    const CART_KEY = 'cartCounts';
  

    function loadCart() {
      return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    }
    function clearCart() {
      localStorage.setItem(CART_KEY, '{}');
    }
  

    function showTotal() {
      const cart = loadCart();

      const products = [];
      for (let i = 1; i <= 28; i++) {
        products.push({
          id: i,
          name: `Лампочка ${i}`,
          price: Math.floor(100 + Math.random() * 500)
        });
      }
      const total = Object.entries(cart).reduce((sum, [id, cnt]) => {
        const prod = products.find(p => p.id === +id);
        return sum + (prod ? prod.price * cnt : 0);
      }, 0);
      document.getElementById('orderTotal').textContent = total;
    }
  
    showTotal();
  

    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const cart = loadCart();
      

        const products = [];
        for (let i = 1; i <= 28; i++) {
          products.push({
            id: i,
            name: `Лампочка ${i}`,
            price: Math.floor(100 + Math.random() * 500)
          });
        }
      

        const orderedItems = Object.entries(cart).map(([id, count]) => {
          const product = products.find(p => p.id === +id);
          return `${product?.name || 'Неизвестный товар'} — ${count} шт.`;
        });
      
        const formData = {
          fullName: this.fullName.value,
          email: this.email.value,
          phone: this.phone.value,
          address: this.address.value,
          comment: this.comment.value,
          cart: cart
        };
      
        console.log('Order submitted:', formData);
        console.log('Товары в заказе:\n' + orderedItems.join('\n'));
      
        clearCart();
      });
    }

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) { 
        phoneInput.addEventListener('input', function () {
            let digits = phoneInput.value.replace(/\D/g, '');  

            if (digits.length <= 11) {
                if (digits.length > 0 && !digits.startsWith('7')) {
                    digits = '7' + digits;  
                }
                const x = digits.slice(1); 
                let formatted = '+7';
                if (x.length > 0) formatted += '-' + x.slice(0, 3);
                if (x.length > 3) formatted += '-' + x.slice(3, 6);
                if (x.length > 6) formatted += '-' + x.slice(6, 10);
                phoneInput.value = formatted;
            } else if (digits.length > 11) {
                phoneInput.value = digits.slice(0, 50);
            }
        });
    } else {
        console.error('Element with id "phone" not found!');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const orderNumber = Math.floor(Math.random() * 1001);

            orderForm.style.display = 'none';

            const confirmationDiv = document.getElementById('orderConfirmation');
            confirmationDiv.style.display = 'block';
            document.getElementById('orderNumber').textContent = `Номер заказа: ${orderNumber}`;
        });

        const backToMainBtn = document.getElementById('backToMainBtn');
        if (backToMainBtn) {
            backToMainBtn.addEventListener('click', function() {
                window.location.href = 'main.html'; 
            });
        }
    }
});
