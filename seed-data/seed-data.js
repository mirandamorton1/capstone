import { faker } from '@faker-js/faker';

import * as db from './db.js';



const generateCustomers = (num) => {
  const customers = [];

  for (let i = 0; i < num; i++) 
    customers.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      farm_name: faker.lorem.word(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      street_address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      createdAt: faker.date.past(),
      notes: faker.lorem.words()
    });
  

  return customers;
};

const generateTickets = (customers, numPerCustomer) => {
  const tickets = [];

  for (const [index, c] of customers.entries()) 
    for (let i = 0; i < numPerCustomer; i++) 
      tickets.push({
        customer_id: index + 1,
        issue: faker.helpers
        .arrayElement([
          `20|20 Gen 3`,
          `Photo Upload`,
          `SeederForce`,
          `General Assitance`,
          `Yield`,
          `Output Issue`,
          `Lost Connection`
        ]),
        status: faker.helpers
          .arrayElement([
            `New`,
            `Report`,
            `Needs Information`,
            `Recommendation Provided`,
          ]),
        seasonality: faker.helpers
        .arrayElement([
          `Quoting/Sales`,
          `Placing Orders`,
          `Training`,
          `Installation`,
          `Setup`,
          `Operation`,
          `Diagnostics`,
          `Analysis`,
          `General Inquiry`,
          `RMA`
        ]),
        support: faker.person.fullName(),
        description: faker.lorem.words(),
		    resolved: faker.datatype.boolean(),
        equip_profile:faker.helpers
        .arrayElement([
          `John Deere 750`,
          `Case 4430`,
          `Lexion 470`,
          `Claas 595`,
          `Gleaner M3`,
          `New Holland CR9`,
          `Hagie STS`,
          `Kinze 3120`,
          `Miller 5333`
        ]),
        updatedAt: faker.date.past(),

      });
    
  

  return tickets;
};


const generatePosts = (tickets, numPerTicket) => {
	const posts = []

	for (const [index, t] of tickets.entries()) 
		for (let i = 0; i < numPerTicket; i++) 
			posts.push({
				ticket_id: index +1,
				text: faker.lorem.words(),
        author_first: faker.person.firstName(),
        author_last: faker.person.lastName(),
        updatedAt: faker.date.past(),
			})
		
	

	return posts
}




/* const generateNotes = (customers, numPerCustomer) => {
     const notes = []; */

/*   customers.forEach((c, index) => {
       for (let i = 0; i < numPerCustomer; i++) {
         notes.push({ customer_id: index + 1 , text: faker.lorem.paragraph() });
       }
     }); */

/*   return notes;
   }; */

const insertData = async () => 

  // const customers = generateCustomers(1000)

  /* await db.insertCustomers(customers)
     const customers = new Array(await db.getCustomers()); */

  // const tickets = generateTickets(customers, 5);

  // await db.insertTickets(tickets);

  /* const posts = generatePosts(tickets, 2)
     SQLite
     await db.insertData('posts', posts)
     MongoDB or MySQL
     await db.insertPosts(posts) */

   await db.insertRandomProfiles()
;

insertData();