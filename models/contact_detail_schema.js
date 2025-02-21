require('dotenv').config(); // Load environment variables

const mysql = require('mysql2');

// Create a connection to the database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT // Added port configuration from .env file
});

const createContactDetailSchema = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS contact_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        department VARCHAR(255),
        phone_number VARCHAR(50),
        job_title VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(400),  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
  

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error creating contact_details table: ', err);
    } else {
      console.log('Contact details table created successfully.');
    }
  });
};

createContactDetailSchema();

module.exports = connection;
