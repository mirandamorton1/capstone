import { faker } from "@faker-js/faker";
import * as db from "./db.js";

// const combineProfiles = [];

// fs.createReadStream('./combine_profiles.csv')
// 	.pipe(csv())
// 	.on('data', (row) => {
// 		combineProfiles.push(row)
// 	})
// 	.on('end', () => {
// 		console.log('combine file processed')
// 	});

// const planterProfiles = [];

// fs.createReadStream('./planter_profiles.csv')
// 	.pipe(csv())
// 	.on('data', (row) => {
// 		planterProfiles.push(row)
// 	})
// 	.on('end', () => {
// 		console.log('planter file processed')
// 	});

// const sprayerSeederProfiles = [];

// fs.createReadStream('./sprayer_seeder_profiles.csv')
// 	.pipe(csv())
// 	.on('data', (row) => {
// 		sprayerSeederProfiles.push(row)
// 	})
// 	.on('end', () => {
// 		console.log('sprayer seeder file processed')
// 	});

const generateCustomers = (num) => {
  const customers = [];

  for (let i = 0; i < num; i++) {
    customers.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      street_address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      createdAt: faker.date.past(),
    });
  }

  return customers;
};

const generateTickets = (customers, numPerCustomer) => {
  const tickets = [];

  customers.forEach((c, index) => {
    for (let i = 0; i < numPerCustomer; i++) {
      tickets.push({
        customer_id: index + 1,
        issue: faker.lorem.words(),
        status: faker.helpers
          .arrayElement([
            "New",
            "Report",
            "Needs Information",
            "Recommendation Provided",
          ]),
        seasonality: faker.lorem.word(1),
        support: faker.person.fullName(),
        descritption: faker.lorem.words(),
		resolved: faker.datatype.boolean(),
      });
    }
  });

  return tickets;
};

const generateNotes = (customers, numPerCustomer) => {
  const notes = [];

  customers.forEach((c, index) => {
    for (let i = 0; i < numPerCustomer; i++) {
      notes.push({ customer_id: index + 1 , text: faker.lorem.paragraph() });
    }
  });

  return notes;
};

const insertData = async () => {
  const customers = new Array(await db.getCustomers());

  const tickets = generateTickets(customers, 5);

//   await db.insertTickets(tickets);

  const notes = generateNotes(customers.slice(0,4), 2);
  console.log(notes)

  await db.insertNotes(notes);
};

insertData();