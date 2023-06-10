import cartModel from "../dao/models/cart.model.js";
import { productModel } from "../dao/models/product.model.js";
import User from "../dao/dbManagers/user.js";
import ProductManager from '../dao/dbManagers/products.js';
import CartManager from '../dao/dbManagers/carts.js';
/////////////////
/// Instancia ///
/////////////////
const product = new ProductManager();
const cart = new CartManager();
const usersManager = new User();

//Renderizar usuarios
export async function renderUsers (req,res){
    let users = await usersManager.getAll();
    console.log(users);
    res.render ('users',{users})
}

//Renderizar productos
export async function renderProducts(req,res) {
    try { 
        const isLogin = req.session.user ? true : false;
        const user = req.session.user;
        // Agregando límite, si no se agrega el límite trae todos los productos, de traer el límite trae la cantidad indicada (10). Lo mismo con el resto de parámetros.
        const limitValue = parseInt(req.query.limit, 10) || 10;
        const page = parseInt(req.query.page, 10) || 1;
        let customQuery = req.query.query;
        const sort = parseInt(req.query.sort) || 1;
        if(!customQuery){
            customQuery = '';
        }else{
            customQuery = customQuery.toLowerCase();
        }

            const prod = await product.getAll(page, limitValue, sort, customQuery);
            const {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink} = prod;
            const {_id, first_name, last_name, email, age, cart, role} = req.session.user;
            // Para la paginación
            let arr = [];
            for (let i = 0; i < totalPages; i++) {
                arr[i]=i + 1;
            }
            //
            res.render( 'home', {
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                prevLink,
                nextLink,
                limitValue,
                customQuery,
                sort,
                email:email,
                name: first_name + ' ' + last_name,
                age: age,
                role: role,
                cart:cart,
                arr
            });
    } catch (error) {
        return res.json({message:error.message})
    }
}

//Renderizar carrito
export async function renderCart(req,res){
    try {
    let idC = req.params.cid;
    let car = '';
    car = await cart.getById(idC);
    let carP = [];
    carP =car.products;
    res.render('cart', {cartP: carP, idCart: idC});
    } catch (error) {
        console.log('Error al renderizar el carrito: ' + error);
        return null;
    }
}

//Renderizar mensajes
/* const renderMessages = async (req,res) => {
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
}
 */
//Renderizar registro
export async function renderRegister (req,res){
    res.render('register');
}

//Renderizar login
export async function renderLogin(req,res){
    res.render('login');
}

//Realizar logout
export async function renderLogout (req, res) {
    req.session.destroy();
    res.send("logout success!");
}


//Renderizar reset Password
export async function renderResetPassword(req,res){
    res.render('resetPassword');
}