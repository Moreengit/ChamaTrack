const { client } = require("../config/db");

async function registerUser(user) {

  const query = `
    INSERT INTO users (
      national_id,
      full_name,
      phone,
      email,
      password_hash
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const values = [
    user.national_id,
    user.full_name,
    user.phone,
    user.email,
    user.password_hash
  ];

  const result = await client.query(query, values);

  return result.rows[0];
}

module.exports = { registerUser };