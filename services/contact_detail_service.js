require('dotenv').config(); // Load environment variables
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Create a connection to the database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Signup service
const signup = async (userData) => {
  const { full_name, department, phone_number, job_title, email, password } = userData;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO contact_details (full_name, department, phone_number, job_title, email, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    return new Promise((resolve, reject) => {
      connection.query(query, [full_name, department, phone_number, job_title, email, hashedPassword], (err, result) => {
        if (err) {
          reject('Error signing up user: ' + err);
        } else {
          resolve({ message: 'User created successfully', userId: result.insertId });
        }
      });
    });

  } catch (err) {
    throw new Error('Error hashing password: ' + err);
  }
};

// Login service
const login = async (email, password) => {
  const query = 'SELECT * FROM contact_details WHERE email = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [email], async (err, result) => {
      if (err) {
        reject('Error logging in: ' + err);
      } else if (result.length === 0) {
        reject('User not found');
      } else {
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          // Create JWT token
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });
          resolve({ message: 'Login successful', token });
        } else {
          reject('Invalid password');
        }
      }
    });
  });
};

// Get all users
const getAll = () => {
  const query = 'SELECT * FROM contact_details';
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject('Error fetching users: ' + err);
      } else {
        resolve(result);
      }
    });
  });
};

// Delete user by ID
const deleteUser = (userId) => {
  const query = 'DELETE FROM contact_details WHERE id = ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [userId], (err, result) => {
      if (err) {
        reject('Error deleting user: ' + err);
      } else {
        resolve({ message: 'User deleted successfully' });
      }
    });
  });
};

// Get user details by email
const getDetailByEmail = (email) => {
  const query = 'SELECT * FROM contact_details WHERE email = ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [email], (err, result) => {
      if (err) {
        reject('Error fetching user details: ' + err);
      } else if (result.length === 0) {
        reject('User not found');
      } else {
        resolve(result[0]);
      }
    });
  });
};

// Get user by ID
const getById = (userId) => {
  const query = 'SELECT * FROM contact_details WHERE id = ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [userId], (err, result) => {
      if (err) {
        reject('Error fetching user by ID: ' + err);
      } else if (result.length === 0) {
        reject('User not found');
      } else {
        resolve(result[0]);
      }
    });
  });
};

// Find user by email and update details
const findByEmailAndUpdate = (email, updateData) => {
  const { full_name, department, phone_number, job_title, password } = updateData;

  // If password is included, hash it
  const updateFields = [
    full_name, department, phone_number, job_title, 
    password ? bcrypt.hashSync(password, 10) : undefined
  ];

  const query = `
    UPDATE contact_details 
    SET full_name = ?, department = ?, phone_number = ?, job_title = ?, password = ?
    WHERE email = ?
  `;

  return new Promise((resolve, reject) => {
    connection.query(query, [...updateFields, email], (err, result) => {
      if (err) {
        reject('Error updating user details: ' + err);
      } else {
        resolve({ message: 'User details updated successfully' });
      }
    });
  });
};

module.exports = {
  signup,
  login,
  getAll,
  deleteUser,
  getDetailByEmail,
  getById,
  findByEmailAndUpdate
};
