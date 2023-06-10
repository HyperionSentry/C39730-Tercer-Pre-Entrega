import Users from "../dao/dbManagers/user.js";
import Carts from "../dao/dbManagers/carts.js";

const usersManager = new Users();
const cartsManager = new Carts();

//Traemos todos los usuarios
const getAll = async (req, res) => {
    let users = await usersManager.getAll();

    if (!users)
        return res
            .status(500)
            .send({ status: "error", error: "No se pudo traer la información" });

    res.send({ status: "success", payload: users });
}

//Agregamos usuario
const saveUser = async (req, res) => {
    const { first_name, last_name, email, age } = req.body;
    let result = await usersManager.saveUser({
        first_name,
        last_name,
        email,
        age
    });
    res.send({ status: "success", payload: result });
}

//Agregamos usuario a carrito
const addUserToCart = async (req, res) => {
    const { uid, cid } = req.params;
    const cart = await cartsManager.getById(cid);
    if (!cart)
      return res.status(404).send({ status: "error", error: "Cart not found" });
    const user = await usersManager.getById({ _id: uid });
    if (!user)
      return res.status(404).send({ status: "error", error: "User not found" });
    let cartVacio = {"cart" : cart};
    Object.assign(user, cartVacio);
    await usersManager.updateUser(uid, user);

    res.send({ status: "success", message: "user add to cart" });
  }

export default {
    getAll,
    saveUser,
    addUserToCart
}