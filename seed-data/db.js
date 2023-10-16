import mysql from "mysql2/promise";

import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createConnection(
	{
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
},
console.log(`Connected to the capstonedb database.`)

);

//landingpage
export async function getCustomers() {
    const [rows] = await db.query(
        `SELECT customers.customer_id, customers.first_name, customers.last_name, customers.email, customers.phone, COUNT(tickets.ticket_id) as ticket_count
        FROM customers
        LEFT JOIN tickets ON customers.customer_id = tickets.customer_id
        GROUP BY customers.customer_id`
    );
    return rows;
}


//get one modal
export async function getOneCustomer(id) {
    const [rows] = await db.query(
        "SELECT * FROM customers WHERE id = ?", [id]
    );
    return rows[0];
}


export async function insertCustomers(customers) {
  await db.query(
    "INSERT INTO customers (first_name, last_name, email, phone, street_address, city, state, zip, createdAt) VALUES ?",
    [
      customers.map((c) => [
        c.first_name,
        c.last_name,
        c.email,
        c.phone,
        c.street_address,
        c.city,
        c.state,
        c.zip,
        c.createdAt,
      ]),
    ]
  );
}


export async function insertTickets(tickets) {
  await db.query(
    "INSERT INTO tickets (customer_id, issue, status, seasonality, support, description, resolved) VALUES ?",
    [
      tickets.map((t) => [
        t.customer_id,
        t.issue,
        t.status,
        t.seasonality,
        t.support,
        t.description,
		t.resolved,
      ]),
    ]
  );
}

export async function insertNotes(notes) {
  await db.query(
    "INSERT INTO notes (customer_id, text) VALUES ?",
    [notes.map((n) => [n.customer_id, n.text])]
  );
}

