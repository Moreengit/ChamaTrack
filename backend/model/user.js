// models/user.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({
    full_name,
    email,
    phone_number,
    password,
    role = 'chairman'
  }) {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO users (full_name, email, phone_number, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, full_name, email, phone_number, role, created_at
    `;
    const values = [full_name, email, phone_number, password_hash, role];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

  static async comparePassword(candidatePassword, hash) {
    return bcrypt.compare(candidatePassword, hash);
  }
}

module.exports = User;