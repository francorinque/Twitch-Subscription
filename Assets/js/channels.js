const d = document;
const $btnCategories = d.getElementById('btnsCategories'),
$cards = d.getElementById('cards'),
$btnMore = d.getElementById('verMas'),
$btnPopular = d.getElementById("btnPopular"),
$cartChannels = d.querySelector(".cart__channels"),
$btnSuscribeCart = d.querySelector(".suscribeCart"),
$btnDeleteCart = d.querySelector(".deleteCart"),
$total = d.querySelector(".total"),
$btnSuscribeCard = d.querySelector(".btnSuscribe"),
$modalSucces = d.querySelector(".modal"),
$modalCompraContainer = d.querySelector(".modalCompra-container"),
$modalBtnCancel = d.querySelector(".modalCompra-cancel"),
$modalBtnCo = d.querySelector(".modalCompra-confirm"),
$cart = d.querySelector(".cart-container"),
$overlay = d.querySelector(".overlay"),
$modalContent = d.querySelector(".modalCompra")



let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveToLocalStorage = () =>{
  localStorage.setItem("cart",JSON.stringify(cart))
}


//********* LOGICA DEL CARRITO ************//
const showModal = msj => {
  $modalSucces.classList.add("showme")
  $modalSucces.innerHTML = `<p>${msj}</p>`
  setTimeout(()=>{
    $modalSucces.classList.remove("showme")
  },1000)
}

const checkCartState = () => {
  saveToLocalStorage()
  renderCart()
  showTotal()
  hideBtnCart($btnSuscribeCart)
  hideBtnCart($btnDeleteCart)
}

const addChannelToCart  = channel => {
  cart = [...cart,{...channel, quantity: 1}]
}

const existe = channel => {
  return cart.find(canal => canal.id === channel.id )
}

const addUnit = channel => {
  cart =  cart.map(canal => {
    return canal.id === channel.id 
    ? {...canal, quantity: 
      // si la cantidad es 1, se vuelve 3, si no 6 y vuelve a 1.
      (canal.quantity === 1) ? 3 
      : (canal.quantity === 3) ?
      6 : 1 
    }
    : canal
  })
}


const createChannelData = (img,price,name,id) => {
  return {img,price,name,id}
}

const addChannel = e => {
  if(!e.target.classList.contains("btnSuscribe")) return;
  const {img,price,name,id} = e.target.dataset;
  const channel = createChannelData(img,price,name,id)
  if(existe(channel)){
    // agregamos unidad
    addUnit(channel)
    // mostramos el modal
    showModal("Se añadio una unidad")
  } else {
    // agregamos el canal
    addChannelToCart(channel)
    // mostramos el modal
    showModal("Se añadio un canal")
  }
  checkCartState()
}

// mostrar el total
const showTotal = () => {
  return cart.reduce((acc,item) => acc + Number(item.price) * item.quantity,0) 
}

const renderChannel = channel => {
  const {img,name,price,id,quantity} = channel;
  return `
  <div class="cart__channel" id="${id}">
      <img src="${img}" alt="${name}">
      <div class="cart__info">
        <p class="cart__name">${name}</p>
        <p class="cart__price">$${price}</p>
      </div>
    <div class="cart__btns">
      <button class="cart-btn down" data-id=${id}>
        <i class="fa-solid fa-minus" data-id=${id}></i>
      </button>

      <span class="cart__quantity">${quantity}</span>

      <button class="cart-btn up" data-id=${id}>
        <i class="fa-solid fa-plus" data-id=${id}></i>
      </button>
    </div>
 </div>
  `
}

// SI HAY CANALES EN EL CARRITO LO RENDERIZA, SI NO RENDERIZA MSJ
const renderCart = () =>{
  if(!cart.length){
    $cartChannels.innerHTML = `<p class="cartMsj">No hay canales en el carrito.</p>`
    $total.innerHTML = `$US${showTotal().toFixed(2)}`
    return;
  }
  $cartChannels.innerHTML = cart.map(renderChannel).join('')
  $total.innerHTML = `$US${showTotal().toFixed(2)}`
}

// esconder los botones del cart
const hideBtnCart = btn => {
  if(!cart.length){
    btn.classList.add("disable")
    btn.disabled = true
    return
  }
  btn.classList.remove("disable")
  btn.disabled = false
}


//********* VER MAS ************//
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

//********* RENDERIZADO DEL FILTRO ************//

// funcion que reduce los paises y renderiza los botones con sus respectivas
// categorias.
const renderBtnsCategories = () => {
  let btns = channels.reduce((acc,value) => {
    if(!acc.includes(value.pais)){
      acc.push(value.pais)
    }
    return acc
  },[])

  $btnCategories.innerHTML += btns
  .map(btn => {
    return `<button class="btn btn-category" data-category=${btn}>${btn}</button>`
  })
  .join('')
}

const changeActiveBtn = (e) => {
  const $btnsCategory = d.querySelectorAll("#btnsCategories .btn")
  const btnsList = [...$btnsCategory];
  btnsList.forEach(btn =>{
   btn.classList.remove("active")
   e.target.classList.add("active")
  })
}

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
        <span class="card__price">$${price}</span>
      </div>

      <button class="btn btnSuscribe" 
        data-img=${img} data-name="${name}" data-price="${price}" data-id="${id}">
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

//********* BORRAR CANALES ************//
const quitarUnidad = channel => {
  cart = cart.map(canal => {
    return canal.id === channel.id 
      ? {...canal, quantity: (canal.quantity === 6) ?
      3 : (canal.quantity=== 3) ? 
      1 : 1
    }
    : canal
  })
}

const deleteChannel = channel => {
  cart = cart.filter(canal => canal.id !== channel.id)
}

const btnDownEvent = e => {
  const canalTarget = cart.find(canal => canal.id === e.target.dataset.id);
  if(canalTarget.quantity === 1){
    if(confirm("¿Deseas eliminar el canal del carrito?")){
      deleteChannel(canalTarget)
    }
    return
  }
  quitarUnidad(canalTarget)
}

const btnUpEvent = e => {
  const canalTarget = cart.find(canal => canal.id === e.target.dataset.id);
  addUnit(canalTarget)
}

//******* FUNCION QUE CONTROLA EL EVENTO DE LOS BOTONES DEL CANAL UP Y DOWN *******//
const channelBtnsEvent = e => {

  if(e.target.matches(".down") || e.target.matches(".down *")){
    btnDownEvent(e)
  } 
  else if(e.target.matches(".up") || e.target.matches(".up *")){
    btnUpEvent(e)
  }
  checkCartState()
}

const deleteEvent = e => {
  if(e.target.matches(".deleteCart")){
    if(confirm('¿Deseas vaciar el carrito?')){
      vaciarCarrito()
    }
  }
}

const vaciarCarrito = e => {
      cart = [];
      checkCartState()
}

const removeShowme = el => {
  el.classList.remove("showme")
}

const changeClase = ()=> {
  removeShowme($cart)
  removeShowme($overlay)
  $modalCompraContainer.classList.add("showme")
}

//******* CONTENIDO DEL MODAL AL  SUSCRIBIRSE *******//
const renderContentModal = () => {
  return `
        <h3 class="modalCompra__title">¿Finalizar tu suscripción?</h3>
        <div class="modalCompra__btns">
          <button class="modalCompra__btn modalCompra-cancel">
            <i class="fa-solid fa-rectangle-xmark" data-value="false"></i>
          </button>
          <button class="modalCompra__btn modalCompra-confirm">
            <i class="fa-solid fa-square-check" data-value="true"></i>
          </button>
        </div>
  `
}

const showMsjExito = () => {
  setTimeout(()=>{
    $modalContent.innerHTML = `<h2>¡Compra realizada con éxito!</h2>`
  },4000)
}

const resetContentModal = () => {
  setTimeout(()=>{
    $modalContent.innerHTML = renderContentModal()
  },7000)
}

const modalBtnEvent = e => {
  const target = e.target.dataset.value;
  if(target === "true"){

    $modalContent.innerHTML = `<img src="../imagenes/loader.svg"/ class="loader">`
    showMsjExito()
    setTimeout(()=>{
      removeShowme($modalCompraContainer)
    },6000)
    resetContentModal()
    vaciarCarrito()
    checkCartState()
  } 
  else if(target === 'false'){
    removeShowme($modalCompraContainer)
    return;
  }

}

const suscripcionRealizada = e => {
  if(e.target.matches(".suscribeCart")){
    changeClase()
  }
}

const hiddeOverlay = () =>{
  removeShowme($overlay)
  removeShowme($cart)
}

const init = () =>{
    renderCards()
    renderBtnsCategories()
    $btnCategories.addEventListener("click",renderFilter)
    $btnMore.addEventListener("click",verMasCanales)
    document.addEventListener("click",addChannel)
    document.addEventListener("DOMContentLoaded",renderCart)
    document.addEventListener("click",channelBtnsEvent)
    document.addEventListener("click",deleteEvent)
    document.addEventListener("click",suscripcionRealizada)
    hideBtnCart($btnSuscribeCart)
    hideBtnCart($btnDeleteCart)
    document.addEventListener("click",modalBtnEvent)
    window.addEventListener("scroll",hiddeOverlay)
    $overlay.addEventListener("click",hiddeOverlay)
    if(!$modalCompraContainer.classList.contains("showme")){
      $modalContent.innerHTML = renderContentModal()
    }
}
init()