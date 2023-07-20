document.addEventListener("DOMContentLoaded", function (event) {
  var produtos = [
    {
      codigo: 1,
      nome: "Camisa Xadrez Vermelha",
      valor: 29.99,
      categoria: "Feminino",
      imagem: "./images/feminino/1.jpg",
    },
    {
      codigo: 2,
      nome: "Camisa Xadrez Preta",
      valor: 39.99,
      categoria: "Feminino",
      imagem: "./images/feminino/2.jpg",
    },
    {
      codigo: 3,
      nome: "Conjunto Casual",
      valor: 65.99,
      categoria: "Feminino",
      imagem: "./images/feminino/3.jpg",
    },
    {
      codigo: 4,
      nome: "Conjunto Primavera",
      valor: 99.99,
      categoria: "Feminino",
      imagem: "./images/feminino/4.jpg",
    },
    {
      codigo: 5,
      nome: "Blusa Oncinha",
      valor: 49.99,
      categoria: "Feminino",
      imagem: "./images/feminino/5.jpg",
    },
    {
      codigo: 6,
      nome: "Camisa Básica",
      valor: 19.99,
      categoria: "Feminino",
      imagem: "./images/feminino/6.jpg",
    },
    {
      codigo: 7,
      nome: "Conjunto Lilo & Stitch",
      valor: 59.99,
      categoria: "Infantil",
      imagem: "./images/infantil/1.jpg",
    },
    {
      codigo: 8,
      nome: "Conjunto Sonic",
      valor: 49.99,
      categoria: "Infantil",
      imagem: "./images/infantil/2.jpg",
    },
    {
      codigo: 9,
      nome: "Vestido Xadrez vermelho",
      valor: 69.99,
      categoria: "Infantil",
      imagem: "./images/infantil/3.jpg",
    },
    {
      codigo: 10,
      nome: "Camisa Dino Aventura",
      valor: 119.99,
      categoria: "Infantil",
      imagem: "./images/infantil/4.jpg",
    },
    {
      codigo: 11,
      nome: "Agasalho Minnie",
      valor: 149.99,
      categoria: "Infantil",
      imagem: "./images/infantil/5.jpg",
    },
    {
      codigo: 12,
      nome: "Vestido Fofinha kids",
      valor: 149.99,
      categoria: "Infantil",
      imagem: "./images/infantil/6.jpg",
    },
    {
      codigo: 13,
      nome: "Camisa Social",
      valor: 59.99,
      categoria: "Masculino",
      imagem: "./images/masculino/1.jpg",
    },
    {
      codigo: 14,
      nome: "Manga longa Slin ",
      valor: 49.99,
      categoria: "Masculino",
      imagem: "./images/masculino/2.jpg",
    },
    {
      codigo: 15,
      nome: "Camisa personagens",
      valor: 69.99,
      categoria: "Masculino",
      imagem: "./images/masculino/3.jpg",
    },
    {
      codigo: 16,
      nome: "Camisa polo cinza",
      valor: 119.99,
      categoria: "Masculino",
      imagem: "./images/masculino/4.jpg",
    },
    {
      codigo: 17,
      nome: "Camisa Floral",
      valor: 149.99,
      categoria: "Masculino",
      imagem: "./images/masculino/5.jpg",
    },
    {
      codigo: 18,
      nome: "Camisa manga longa social",
      valor: 149.99,
      categoria: "Masculino",
      imagem: "./images/Masculino/6.jpg",
    },
  ];

  var productosContainer = document.querySelector(".productos");
  var navbarLinks = document.querySelectorAll(".nav-link");
  var cartItems = [];

  // Add event listener to the navbar links
  navbarLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var selectedCategory = event.target.innerText;
      var filteredProducts;

      if (selectedCategory === "Todos os Produtos") {
        filteredProducts = produtos;
      } else {
        filteredProducts = produtos.filter(function (produto) {
          return produto.categoria === selectedCategory;
        });
      }

      renderProducts(filteredProducts);
    });
  });

  // Add event listener to the "Adicionar" buttons
  productosContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-btn-pink")) {
      var productName =
        event.target.parentNode.querySelector(".card-title").textContent;
      var product = produtos.find(function (produto) {
        return produto.nome === productName;
      });

      adicionarProduto(product);
    }
  });

  // Render all products initially
  renderProducts(produtos);

  // Function to render the products
  function renderProducts(productos) {
    productosContainer.innerHTML = ""; 

    for (var i = 0; i < productos.length; i++) {
      var produto = productos[i];

      var card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem";

      var img = document.createElement("img");
      img.className = "card-img-top";
      img.src = produto.imagem;
      img.alt = produto.nome;

      var cardBody = document.createElement("div");
      cardBody.className = "card-body text-center";

      var cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = produto.nome;

      var cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = "R$ " + produto.valor.toFixed(2);

      var cardLink = document.createElement("a");
      cardLink.className = "btn-btn-pink";
      cardLink.href = "#";
      cardLink.textContent = "Adicionar";
      cardLink.setAttribute("data-id", produto.codigo); 

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardLink);

      card.appendChild(img);
      card.appendChild(cardBody);

      productosContainer.appendChild(card);
    }
  }

  // Function to add a product to the cart
  function adicionarProduto(produto) {
    // Check if the product is already in the cart
    var index = cartItems.findIndex(function (item) {
      return item.codigo === produto.codigo;
    });

    if (index !== -1) {
      // If the product is already in the cart, update its quantity
      cartItems[index].quantidade++;
    } else {
      // If the product is not in the cart, add it with quantity 1
      produto.quantidade = 1;
      cartItems.push(produto);
    }

    renderCartItems();
  }

  // Function to render the cart items in a modal
  function renderCartItems() {
    var modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    for (var i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i];

      var cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";

      var cartItemImage = document.createElement("img");
      cartItemImage.className = "cart-item-image";
      cartItemImage.src = cartItem.imagem;
      cartItemImage.alt = cartItem.nome;

      var cartItemInfo = document.createElement("div");
      cartItemInfo.className = "cart-item-info";

      var cartItemName = document.createElement("div");
      cartItemName.className = "cart-item-name";
      cartItemName.textContent = cartItem.nome;

      var cartItemValue = document.createElement("div");
      cartItemValue.className = "cart-item-value";
      cartItemValue.textContent = "R$ " + cartItem.valor.toFixed(2);

      var cartItemQuant = document.createElement("div");
      cartItemQuant.className = "cart-item-quantidade";
      cartItemQuant.textContent = "Quantidade: " + cartItem.quantidade;

      cartItemInfo.appendChild(cartItemName);
      cartItemInfo.appendChild(cartItemValue);
      cartItemInfo.appendChild(cartItemQuant);

      cartItemElement.appendChild(cartItemImage);
      cartItemElement.appendChild(cartItemInfo);

      modalBody.appendChild(cartItemElement);
    }
  }

  // Add event listener to the search form
  var searchForm = document.querySelector(".d-flex");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchValue = event.target.querySelector("input[type=search]").value;
    var filteredProducts = produtos.filter(function (produto) {
      return produto.nome.toLowerCase().includes(searchValue.toLowerCase());
    });
    renderProducts(filteredProducts);
  });
});
