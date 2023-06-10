import CartManager from "../dao/dbManagers/carts.js";

/////////////////
/// Instancia ///
/////////////////
const  cart = new CartManager();
//


export async function getCart(req, res) {
    let idC = req.params.cid;
    const car = await cart.getById(idC);
    res.send({ result : "sucess" ,payload:car})
};

export async function saveCart(req, res) {
    let idC = req.params.cid;
    let idP = req.params.pid;
    if(!idC){
        const car = await cart.postCarts();
        res.send({ result : "sucess" ,payload:car})
    }else{
        const car = await cart.post(idC, idP);
        res.send({ result : "sucess" ,payload:car});
    }
    
};

export async function updateCart(req, res) {
    let idC = req.params.cid;
    let idP = req.params.pid;
    if(!idP){
        const items = req.body;
        const car = await cart.putProduct(idC, items);
        res.send({ result : "success" ,payload:car});
    }else{
        const item = req.body;
        const car = await cart.putProducts(idC, idP, item);
        res.send({ result : "success" ,payload:car});
    }
};

export async function deleteProducts(req, res){
    let idC = req.params.cid;
    let idP = req.params.pid;
    if(!idP){
        const car = await cart.deleteProducts(idC);
        res.send({ result : "sucess" ,payload:car});
    }else{
        const car = await cart.deleteProduct(idC, idP);
        res.send({ result : "sucess" ,payload:car});
    }
};