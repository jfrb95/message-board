const { Client } = require("pg");

const SQL = `
INSERT INTO users (first_name, last_name, email, password, username) 
VALUES
  ('Emma', 'Johnson', 'emma.johnson@email.com', 'securePass123!', 'emma_j'),
  ('Liam', 'Smith', 'liam.smith@email.com', 'mySecret456@', 'liam_smith'),
  ('Olivia', 'Williams', 'olivia.w@email.com', 'oliviaPass789#', 'oliviaw'),
  ('Noah', 'Brown', 'noah.brown@email.com', 'noahBrown$101', 'noah_b'),
  ('Ava', 'Jones', 'ava.jones@email.com', 'avaJ202!secure', 'avajones'),
  ('Ethan', 'Garcia', 'ethan.g@email.com', 'ethanG303#pass', 'ethan_garcia'),
  ('Sophia', 'Miller', 'sophia.miller@email.com', 'sophiaM404@word', 'sophiam'),
  ('Jackson', 'Davis', 'jackson.d@email.com', 'jacksonD505!key', 'jacksond'),
  ('Isabella', 'Rodriguez', 'isabella.r@email.com', 'bellaR606#safe', 'bella_rod'),
  ('Lucas', 'Martinez', 'lucas.m@email.com', 'lucasM707@guard', 'lucasmartinez');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://jb:niceguy@localhost:5432/message_board",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
