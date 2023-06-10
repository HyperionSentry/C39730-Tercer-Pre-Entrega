//import {getById} from '../routes/products.router.js';
import ProductManager from '../dao/dbManagers/products.js';

/////////////////
/// Instancia ///
/////////////////
const product = new ProductManager();


export async function getAll(req, res) {   
    // Agregando límite, si no se agrega el límite trae todo los productos, de traer el límite trae la cantidad indicada.
    let limitValue = parseInt(req.query.limit, 10) || 10;
    let page = parseInt(req.query.page, 10) || 1;
    let customQuery = req.query.query;
    if(!customQuery){
        customQuery = '';
    }else{
        customQuery = customQuery.toLowerCase();
    }
    let sort = parseInt(req.query.sort) || '';
    const prod = await product.getAll(page, limitValue,sort, customQuery);
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink} = prod;
    res.send({
        products:docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        totalPages,
        prevLink,
        nextLink,
        limitValue,
        sort,
        customQuery
    });
};

export async function getProductById(req, res){
    let idP = req.params.pid;
    const prod = await product.getById(idP);
    res.send({status: "succes", body: prod});
};

export async function postProduct(req, res) {
    const item = req.body;
    const prod = await product.postProduct(item);
    res.send({status:"success",payload:prod})
};

export async function putProduct(req, res) {
    const item = req.body;
    const itemId = req.params.pid;
    const prod = await product.putProduct(item, itemId);
    res.send({status:"success",payload:prod})
};

export async function deleteProduct (req, res) {
    const itemId = req.params.pid;
    const prod = await product.deleteById(itemId);
    res.send({status:"success",payload:prod})
};