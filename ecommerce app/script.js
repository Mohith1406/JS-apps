document.addEventListener("DOMContentLoaded", () => {
  const prodlist = document.getElementById("product-list");
  const cartlist = document.getElementById("cart-items");
  const chbt = document.getElementById("chb");
  const totalprice = document.getElementById("tp");

  
  const products = [
    { id: 1, name: "Product 1", price: 56.99 },
    { id: 2, name: "Product 2", price: 99.99 },
    { id: 3, name: "Product 3", price: 22.99 },
  ];
 // const cart = [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
    rendercart()
  products.forEach((p) => {
    const prodiv = document.createElement("div");
    prodiv.innerHTML = `<span>${p.name} - $${p.price}</span> 
       <button data-id="${p.id}"> add to cart</button>`;
    prodlist.appendChild(prodiv);
  });
  prodlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let iD = e.target.getAttribute("data-id");
      const pro = products.find((p) => p.id == iD);
      addtocart(pro);
    }
  });
  function addtocart(pro) {
    cart.push(pro);
    rendercart();
  }

  cartlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let iD = e.target.getAttribute("data-id");
      const pronum = products.find((p) => p.id == iD);
      remfromcart(pronum);
    }
  });
  function remfromcart(pro) {
    cart.splice(pro,1);
    rendercart();
  }

  chbt.addEventListener("click", (e) => {
    cart.length=0;
    alert("Order Successful")
    rendercart();
  });

  function rendercart() {
    let price = 0;
    cartlist.innerHTML = "";
    if (cart.length > 0) {
     
      cart.forEach((p,index) => {
        price += p.price;
        const prodiv = document.createElement("div");
        prodiv.innerHTML = `<span>${p.name} - $${p.price}</span> 
       <button data-id="${index}"> Remove</button>`;
        cartlist.appendChild(prodiv);
      });
    }
    else{
        cartlist.innerHTML = `<p>Your cart is empty</p>`;
    }
    totalprice.innerHTML = `Total:$${price.toFixed(2)}`;
    savecart();
  }
  function savecart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
