document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('total');

  // Adicionar evento de clique para adicionar ao carrinho
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      const description = button.getAttribute('data-description');

      // Adiciona o produto ao carrinho
      addToCart(name, price, description);

      // Alerta temporário para indicar que o produto foi adicionado ao carrinho
      alert(`${name} adicionado ao carrinho!`);
    });
  });

  // Função para adicionar ao carrinho
  function addToCart(name, price, description) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, description });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Atualiza o carrinho na página carrinho.html
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartList.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
      cartList.innerHTML = '<p>Carrinho vazio</p>';
    } else {
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <p><strong>${item.name}</strong> - R$ ${item.price.toFixed(2)}</p>
          <p>${item.description}</p>
        `;
        cartList.appendChild(cartItem);
        totalPrice += parseFloat(item.price);
      });
    }

    cartTotal.textContent = totalPrice.toFixed(2);
  }

  // Atualiza o carrinho ao carregar a página
  updateCart();
});

document.addEventListener('DOMContentLoaded', function() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('total');

  // Atualiza o carrinho ao carregar a página
  updateCart();

  // Função para atualizar o carrinho na página carrinho.html
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartList.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
      cartList.innerHTML = '<p>Carrinho vazio</p>';
    } else {
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="../IMG/rechaud.jpeg" alt="Imagem do Produto" style="width: 100px; height: 100px; float: left; margin-right: 10px;">
          <div>
            <p><strong>${item.name}</strong> - R$ ${item.price.toFixed(2)}</p>
            <p>${item.description}</p>
            <button class="remove-from-cart" data-name="${item.name}">Remover do Carrinho</button>
          </div>
        `;
        cartList.appendChild(cartItem);
        totalPrice += parseFloat(item.price);
      });
    }

    cartTotal.textContent = totalPrice.toFixed(2);

    // Adicionar evento de clique para remover do carrinho
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const name = button.getAttribute('data-name');
        
        // Remove o produto do carrinho
        removeFromCart(name);
        
        // Atualiza a visualização do carrinho
        updateCart();
      });
    });
  }

  // Função para remover do carrinho
  function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
});
