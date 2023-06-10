import Ticket from "../dao/dbManagers/ticket.js";
import User from "../dao/dbManagers/user.js";
import userModel from "../dao/models/user.model.js";
import  cartModel  from '../dao/models/cart.model.js';
import { productModel } from '../dao/models/product.model.js';
import Carts from "../dao/dbManagers/carts.js";
import ticketModel from "../dao/models/tickets.model.js";

const ticketService = new Ticket();
const userService = new User();

//Traer todos los tickets
export async function getTickets (req,res) {
    let result = await ticketService.getAll();
    res.send({status:"success",result:result})
}

//Creacion de ticket
export async function createTicket (req,res) {
    try {
        
    
        const {cid} = req.params;
        let idC = cid;
        //Genero codigo unico
        let codeT = await ticketService.createCode();
        //Fecha 
        let purchase_datetime = new Date();
        //Usuario que que realiza la compra
        let user = await userModel.findOne({cart: cid});
        if(!user){
            console.log('User no existe')
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        //Monto total a pagar del carrito
        //
        //Busco los valores del carrito
        let cart = await cartModel.findOne({_id:cid}).lean().populate('products.product');
        if(!cart){ 
            return res.status(404).send({ status: "error", error: "Cart not found" });
        }
        let addToPayment = 0;
        // Recorro el carrito
        for(let i=0; i<cart.products.length; i++){
            //Busco id, precio, stock, quantity
            const idProduct = cart.products[i].product._id;
            const priceProduct = cart.products[i].product.price;
            const stockProduct = cart.products[i].product.stock;
            const quantityProduct = cart.products[i].quantity;
            // Comparo si el stock es mayor a la cantidad de compra del producto.
            if(stockProduct >= quantityProduct){
                // si es menor o igual al stock se puede comprar"
                const newStock = stockProduct - quantityProduct;
                let priceXQuantity = priceProduct*quantityProduct;
                // multiplico el precio del producto por la cantidad y lo agrego al pago total
                addToPayment = addToPayment + priceXQuantity;
                // Eliminar el producto del carrito por id, una vez que se agrega al pago total
                let idP = idProduct.toString();
                let updateCart = await cartModel.updateOne({
                    _id: idC,
                  },
                  {
                    $pull: {
                      products: {
                         product: idP,
                      },
                    },
                  }
                );
                // Actualizo el stock del producto comprado
                const updateStockProduct = await productModel.updateOne(
                    {_id: idP}, 
                    {$set:{
                        stock:newStock}
                    }
                );

            }else{
               //No se realiza la compra.
            }
        }
        
        //crear ticket de compra
        let result = await ticketModel.create({
                code:codeT, 
                purchase_datetime, 
                amount:addToPayment,
                purcharser:user.id
        });
        //console.log(result);
       // res.redirect('/products');
        res.send({status:"success",payload:result});
    } catch (error) {
       console.log('Error al crear el ticket: ' + error)
       return null;
    }
}


//Traer ticket por id
export async function getTicketById(req,res) {
    res.send({status:"success",result:result})
}


export async function resolveTicket (req,res){
    res.send({status:"success",result:result})
}