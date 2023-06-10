

addProductToCart = async (pid) => {

    const cart = document.getElementById("carrito");
    cid = cart.value;
    const options = {
     method:"POST",
     body:"",
     headers:{
         "Content-Type":"application/json"
     }
    };
 
    await fetch(
     `http://localhost:8080/api/carts/${cid}/products/${pid}`,
     options
    )
 }


deleteProductFromCart = async (pid) => {

    const cart = document.getElementById("carrito");
    cid = cart.value;
    const options = {
     method:"DELETE",
     body:"",
     headers:{
         "Content-Type":"application/json"
     }
    };
 
    await fetch(
     `http://localhost:8080/api/carts/${cid}/products/${pid}`,
     options
    )
 }

 createTicket = async (cart) => {
    const options = {
     method:"POST",
     body:"",
     headers:{
         "Content-Type":"application/json"
     }
    };
 
    await fetch(
     `http://localhost:8080/api/carts/${cart}/purchase`,
     options
    )
 }