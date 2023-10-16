//@ts-ignore
import * as db from "../seed-data/db.js";
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get('/', (_, res) => {
    res.send('Hello, World!');
});
//GET ALL CUSTOMERS LIMIT and OFFSET (landingpage) & show ticket #
app.get("/customers", async (_, res) => {
    try {
        const customers = await db.getCustomers();
        res.status(200).json({
            status: "success",
            results: customers.length,
            data: {
                customers,
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching customers' });
    }
});
//GET ONE CUSTOMER (main modal)
app.get("/customers/:id", async (req, res) => {
    try {
        const customer = await db.getOneCustomer(req.params.id);
        if (customer) {
            res.status(200).json({
                status: "success",
                data: {
                    customer,
                },
            });
        }
        else {
            res.status(404).json({ status: 'error', message: 'Customer not found' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching the customer' });
    }
});
//SEARCH FOR CUSTOMER
//CREATE NEW CUSTOMER
// app.post("/customers", async (req, res) => {
//   console.log(req.params.id)
// })
//UPDATE CUSTOMER NOTES
//UPDATE CUSTOMER DETAILS
//DELETE CUSTOMER
//GET ALL TICKETS (history for customer)
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
