const d = document;
const $btnCategories = d.getElementById('btnsCategories'),
$cards = d.getElementById('cards'),
$btnMore = d.getElementById('verMas'),
$btnPopular = d.getElementById("btnPopular"),
$btnsCategory = d.querySelectorAll("#btnsCategories .btn"),
$cartChannels = d.querySelector(".cart__channels"),
$btnSuscribe = d.querySelector(".suscribe"),
$btnDeleteCart = d.querySelector(".deleteCart"),
$total = d.querySelector(".total")

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveToLocalStorage = () =>{
  localStorage.setItem("cart",JSON.stringify(cart))
}


// LOGICA DEL CARRITO

const addChannel = e => {
  // if(!e.target.classList.contains("suscribe")) return;
  console.log(e.target.dataset);
}

const showTotal = () => {
  return cart.reduce((acc,item) => acc + Number(item.price) * item.quantity ,0) 
}

const renderChannel = channel => {
  const {img,name,price,id} = channel;
  return `
  <div class="cart__channel">
  <img src="${img}" alt="${name}">
  <div class="cart__info">
    <p class="cart__name">${name}</p>
    <p class="cart__price">$${price}</p>
  </div>
  <div class="cart__btns">
    <button class="cart-btn down" data-id="${id}">-</button>
    <span class="cart__quantity">1</span>
    <button class="cart-btn up" data-id="${id}">+</button>
  </div>
 </div>
  `
}

const renderCart = e =>{
  if(!cart.length){
    $cartChannels.innerHTML = `<p>No hay canales en el carrito.</p>`
    $total.innerHTML = `$${showTotal().toFixed(2)}`
    return;
  }
  $cartChannels.innerHTML = cart.map(renderChannel).join('')
  $total.innerHTML = `$${showTotal().toFixed(2)}`
}

const hideBtnCart = btn => {
  if(!cart.length){
    btn.classList.add("disable")
  }
}


//  FUNCIONES PARA VER MAS
const checkLimit = () =>{
   return channelsController.nextPage === channelsController.limitsChannels
}

const verMasCanales = (e)=>{
  if(!e.target.classList.contains("btnMore")) return;
 
  const {nextPage} = channelsController;
  channelsController.nextPage = nextPage + 1
  $cards.innerHTML += channelsController.arrayDividido[nextPage]
  .map(renderCard)
  .join('')
   if(checkLimit()){
    $btnMore.classList.add("hidde")
    return;
  }
}


//  INTERCAMBIAR CLASE ACTIVE ENTRE BTNS
const changeActiveBtn = (e) => {
   const btnsList = [...$btnsCategory];
   btnsList.forEach(btn =>{
    btn.classList.remove("active")
    e.target.classList.add("active")
   })
}


// RENDERIZADO DEL FILTRO
const renderFilterCards = (e) =>{
  category = e.target.dataset.category;
  let cardsFilter = channels.filter(card => card.pais === category)
  $cards.innerHTML = cardsFilter.map(renderCard).join('')
}

const renderFilter = (e)=>{
  if(!e.target.classList.contains("btn-category")) return
   // cambiar clase active en botones
  changeActiveBtn(e)
  $cards.innerHTML = ''
  // si no contiene la clase , renderizas el array principal.
  if(!e.target.dataset.category){
    renderCards();
    // MOSTRAMOS EL BTNMORE
    $btnMore.classList.remove("hidde")
  } 
  else{
    renderFilterCards(e)
    // RESETEAMOS EL NEXTPAGE
    channelsController.nextPage =  1;
    // OCULTAMOS EL BTNMORE
    $btnMore.classList.add("hidde")
  }
}

// CALLBACK PARA RENDERIZAR CARDS
const renderCard = card => {
    const {id,img,name,followers,edad,url,pais,price} = card;
    return `
    <article class="card">
    <div class="card__img">
      <img src=${img}>
    </div>
    <div class="card__info">
      <div class="card__flex">
        <a href="${url}" class="card__name">
          <h2>${name}</h2>
        </a>
        <span class="card__edad">${edad} años</span>
      </div>

      <div class="card__flex">
        <span class="card__followers">${followers} seguidores</span>
        <span class="card__price">$${pais.toLowerCase() === 'argentina' 
        ? 4.99 : 1.99}</span>
      </div>

      <button class="btn btnSuscriber" 
        data-img=${img} data-name="${name}" data-price=${price} data-id="${id}">
        <i class="fa-regular fa-star"></i>
        Suscribirse
      </button>
    </div>
 
    </article>
    `
}

const renderCards = ()=>{
  $cards.innerHTML += channelsController.arrayDividido[0]
    .map(renderCard)
    .join('')
}


const init = () =>{
    renderCards()
    $btnCategories.addEventListener("click",renderFilter)
    $btnMore.addEventListener("click",verMasCanales)
    document.addEventListener("DOMContentLoaded",renderCart)
    $btnSuscribe.addEventListener("click",addChannel)
    hideBtnCart($btnSuscribe)
    hideBtnCart($btnDeleteCart)
}
init()