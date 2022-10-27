export default function showCart(icono,claseCart,overlay){
    const $cartIcon = document.querySelector(icono),
    $cart = document.querySelector(claseCart),
    $overlay = document.querySelector(overlay)

    document.addEventListener("click", (e)=>{
        if(e.target.matches(icono)) {
            $cart.classList.toggle("showme")
            $overlay.classList.toggle("showme")
        }
    })
}   

