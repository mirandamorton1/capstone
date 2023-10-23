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

//landingpage OG
// export async function getCustomers(page = 1, limit = 50) {
//   const offset = (page - 1) * limit;  
//   const [rows] = await db.query(
// 		`SELECT customers.customer_id, customers.first_name, customers.last_name, customers.farm_name, customers.email, customers.phone, customers.street_address, customers.city, customers.state, customers.zip, customers.createdAt, customers.notes, COUNT(tickets.ticket_id) as ticket_count
//         FROM customers
//         LEFT JOIN tickets ON customers.customer_id = tickets.customer_id
//         WHERE customers.deleted_at IS NULL
//         GROUP BY customers.customer_id
//         LIMIT ? OFFSET ?`,
//         [parseInt(limit), parseInt(offset)]
        
//     );
//     return rows;
// }

//landing page for sorting
export async function getCustomers(page = 1, limit = 50, sortOrder = 'ASC') {
  const offset = (page - 1) * limit;  
  const [rows] = await db.query(
		`SELECT customers.customer_id, customers.first_name, customers.last_name, customers.farm_name, customers.email, customers.phone, customers.street_address, customers.city, customers.state, customers.zip, customers.createdAt, customers.notes, COUNT(tickets.ticket_id) as ticket_count
        FROM customers
        LEFT JOIN tickets ON customers.customer_id = tickets.customer_id
        WHERE customers.deleted_at IS NULL
        GROUP BY customers.customer_id
        ORDER BY customers.first_name ${sortOrder} LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)]
        
    );
    return rows;
}




//get all tickets for customer
export async function getTicketsByCustomerId(customer_id) {
  const [tickets] = await db.query(
    `SELECT * FROM tickets WHERE customer_id = ?`, 
    [customer_id]
  );
  
  for (const ticket of tickets) {
    const [posts] = await db.query(
      `SELECT * FROM posts WHERE ticket_id = ?`, 
      [ticket.ticket_id]
    );
    ticket.posts = posts;
  }
  
  return tickets;
}


//get all posts for a ticket
// export async function getPostsByTicketId(ticket_id) {
//   const [rows] = await db.query(
//       `SELECT * FROM posts WHERE ticket_id = ?`, [ticket_id]
//   );
//   return rows;
// }

//get all equipment for customer
export async function getEquipmentByCustomerId(customer_id) {
  const [rows] = await db.query(
      `SELECT 
      cp.*, 
      p.equipment_type, 
      p.make, 
      p.model 
    FROM 
      customers_to_profiles cp
    JOIN 
      profiles p 
    ON 
      cp.profile_id = p.profile_id
    WHERE 
      cp.customer_id = ?
    `, [customer_id]
  );
  return rows;
}

//create new customer
export async function createCustomer(customer) {
  await db.query(
    `INSERT INTO customers (first_name, last_name, email, phone, street_address, city, state, zip, notes, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`, [customer.first_name, customer.last_name, customer.email, customer.phone, customer.street_address, customer.city, customer.state, customer.zip, customer.notes,]
  )
  const [rows] = await db.query('SELECT LAST_INSERT_ID() as id');
  return rows[0].id;
}


//update customer notes only
export async function editCustomerNotes(notes, customer_id) {
  const [rows] = await db.query(
    `UPDATE customers SET notes = ? WHERE customer_id = ?`, [notes, customer_id]
  )
  return rows;
}

export async function editCustomer(customer) {
  const [rows] = await db.query(
    `UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ?, street_address = ?, city = ?, state = ?, zip = ?, notes = ? WHERE customer_id = ?`, 
    [customer.first_name, customer.last_name, customer.email, customer.phone, customer.street_address, customer.city, customer.state, customer.zip, customer.notes, customer.id]
  )
  return rows;
}

// delete a customer
export async function softDeleteCustomer(customer_id) {
  const current_time = new Date();
  await db.query(
    `UPDATE customers SET deleted_at = ? WHERE customer_id = ?`, [current_time, customer_id]
  )
}

//search for customer
export async function searchByName(first_name) {
  const [rows] = await db.query(
      `SELECT * FROM customers WHERE first_name = ?`, [first_name]
    )
    return rows;
}

//get one modal
export async function getOneCustomer(customer_id) {
    const [rows] = await db.query(
        "SELECT * FROM customers WHERE customer_id = ?", [customer_id]
    );
    return rows[0];
}


export async function insertCustomers(customers) {
  await db.query(
    "INSERT INTO customers (first_name, last_name, farm_name, email, phone, street_address, city, state, zip, createdAt, notes) VALUES ?",
    [
      customers.map((c) => [
        c.first_name,
        c.last_name,
		    c.farm_name,
        c.email,
        c.phone,
        c.street_address,
        c.city,
        c.state,
        c.zip,
        c.createdAt,
		c.notes
      ]),
    ]
  );
}


export async function insertTickets(tickets) {
  await db.query(
    "INSERT INTO tickets (customer_id, issue, status, seasonality, support, description, resolved, equip_profile, updatedAt) VALUES ?",
    [
      tickets.map((t) => [
        t.customer_id,
        t.issue,
        t.status,
        t.seasonality,
        t.support,
        t.description,
		    t.resolved,
        t.equip_profile,
        t.updatedAt
      ]),
    ]
  );
}

export async function insertPosts(posts) {
	await db.query('INSERT INTO posts (ticket_id, text, author_first, author_last, updatedAt) VALUES ?', 
  [
		posts.map((p) => [
      p.ticket_id, 
      p.text,
      p.author_first,
      p.author_last,
      p.updatedAt
    ]),
	])
}

//funciton to insert customers and profiles
// insert into customers_and_profiles 
//grab random customer_id and random profile_id 
export async function insertRandomProfiles() {
const [customers] = await db.query('SELECT customer_id FROM customers ORDER BY customer_id');
const [profiles] = await db.query('SELECT profile_id FROM profiles');

for (let customer of customers) {
  const profileCount = Math.floor(Math.random() * 3) + 1; // Generate a random number between 1 and 3
  for (let i = 0; i < profileCount; i++) {
    const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
    await db.query('INSERT INTO customers_to_profiles (customer_id, profile_id) VALUES (?, ?)', [customer.customer_id, randomProfile.profile_id]);
  }
}
}