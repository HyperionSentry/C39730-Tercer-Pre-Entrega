import ticketModel from "../models/tickets.model.js";
import { v4 as uuidv4 } from 'uuid';

export default class Tickets {
    constructor() {
        console.log("Trabajando con MongoDB");
    }

    getAll = async () => {
        try {
            let products = await ticketModel.find();
            return products;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    getOne = async (id) => {
        try {
            let product = await ticketModel.findOne({ _id: id });
            return product;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    createTicket = async (ticket) => {
        try {
            let result = await ticketModel.create(ticket);
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    resolveTicket = async (id, ticket) => {
        try {
            let updateTicket = await ticketModel.updateOne({ _id: id }, { $set: ticket });
            return updateTicket;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    createCode = async () => {
        try {
            let isCodeUnique = false;
            let ticketCode;
            // Generar código autogenerado único para el ticket
            while (!isCodeUnique) {
                ticketCode = uuidv4();
                const existingTicket = await ticketModel.findOne({ code:ticketCode });
                if (!existingTicket) {
                    isCodeUnique = true;
                }
            }
            return ticketCode;
        }
        catch (error) {
            console.log(error);
            return null
        }
    }

}