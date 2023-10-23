//@ts-ignore
import * as db from "../seed-data/db.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
    res.send("Hello, World!");
});
//GET ALL CUSTOMERS LIMIT and OFFSET (landingpage) 
app.get("/customers", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 50;
        const sortOrder = req.query.sortOrder || 'ASC';
        const customers = await db.getCustomers(page, limit, sortOrder);
        res
            .status(200)
            .json({
            status: "success",
            results: customers.length,
            data: { customers },
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({
            status: "error",
            message: "An error occurred while fetching customers",
        });
    }
});
//CREATE CUSTOMER
app.post("/customers", async (req, res) => {
    try {
        const customer = await db.createCustomer(req.body);
        res
            .status(200)
            .json({
            status: "success",
            data: { customer }
        });
    }
    catch (err) {
        console.log(err);
    }
});
//GET ONE CUSTOMER (main modal)
app.get("/customers/:id", async (req, res) => {
    try {
        const customer_id = parseInt(req.params.id);
        const customer = await db.getOneCustomer(customer_id);
        if (customer) {
            res.status(200).json({ status: "success", data: { customer } });
        }
        else {
            res
                .status(404)
                .json({ status: "error", message: "Customer not found" });
        }
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({
            status: "error",
            message: "An error occurred while fetching the customer",
        });
    }
});
//UPDATE CUSTOMER NOTES 
app.put("/customers/:id/notes", async (req, res) => {
    try {
        const customer_id = parseInt(req.params.id);
        const notes = req.body.notes;
        const customer = await db.editCustomerNotes(notes, customer_id);
        if (customer) {
            res.status(200).json({ status: "success", data: { customer } });
        }
        else {
            res
                .status(404)
                .json({ status: "error", message: "Customer not found" });
        }
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({
            status: "error",
            message: "An error occurred while updating the customer",
        });
    }
});
//UPDATE ALL CUSTOMER INFO INCLUDING NOTES
app.put("/customers/:id", async (req, res) => {
    try {
        const customer_id = parseInt(req.params.id);
        const { first_name, last_name, email, phone, street_address, city, state, zip, notes } = req.body;
        const customer = {
            id: customer_id,
            first_name,
            last_name,
            email,
            phone,
            street_address,
            city,
            state,
            zip,
            notes
        };
        const updatedCustomer = await db.editCustomer(customer);
        if (updatedCustomer) {
            res.status(200).json({ status: "success", data: { updatedCustomer } });
        }
        else {
            res.status(404).json({ status: "error", message: "Customer not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred while updating the customer",
        });
    }
});
;
//SEARCH FOR CUSTOMER
app.get('/customers/search/:first_name', async (req, res) => {
    try {
        const { first_name } = req.params;
        const result = await db.searchByName(first_name);
        console.log(first_name);
        res.status(200)
            .json({
            status: "success",
            data: { customers: result }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500)
            .json({
            status: "error",
            message: "could not find customer"
        });
    }
});
//DELETE CUSTOMER
app.delete("/customers/:id", async (req, res) => {
    try {
        const results = await db.softDeleteCustomer(req.params.id);
        res.status(200).json({
            status: "sucess"
        });
    }
    catch (err) {
        res.status(500).json({ status: "error", message: "Unable to delete customer" });
    }
});
//GET ALL TICKETS FOR A SINGLE CUSTOMER 
app.get("/customers/:id/tickets", async (req, res) => {
    try {
        const customer_id = req.params.id;
        const tickets = await db.getTicketsByCustomerId(customer_id);
        res
            .status(200)
            .json({
            status: "success",
            results: tickets.length,
            data: { tickets },
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({
            status: "error",
            message: "An error occurred while fetching tickets",
        });
    }
});
//GET ALL POSTS FOR SINGLE TICKET
app.get("tickets/:id/", async (req, res) => {
    try {
        const ticket_id = req.params.id;
        const posts = await db.getPostsByTicketId(ticket_id);
        res.status(200)
            .json({
            status: "success",
            results: posts.length,
            data: { posts }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
            status: "error",
            message: "unable to fetch posts"
        });
    }
});
// GET ALL EQUIPMENT FOR A SINGLE CUSTOMER
app.get("/customers/:id/profiles", async (req, res) => {
    try {
        const customer_id = req.params.id;
        const profiles = await db.getEquipmentByCustomerId(customer_id);
        res
            .status(200)
            .json({
            status: "success",
            results: profiles.length,
            data: { profiles },
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({
            status: "error",
            message: "An error occurred while fetching profiles",
        });
    }
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
