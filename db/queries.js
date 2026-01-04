const pool = require("./pool");

const db = {

  /*
      USERS
              */
  async addNewUser(firstName, lastName, username, email, password) {
    await pool.query(
      `
      INSERT INTO users
      VALUES (DEFAULT, $1, $2, $3, $5, DEFAULT, $4);
      `, [firstName, lastName, username, email, password]
    );
  },

  async getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
  },

  async deleteUser(id) {
    await pool.query(
      `
      DELETE FROM users
      WHERE id=$1;
      `, [id]
    );
  },

  async findUsername(username) {
    const result = await pool.query(
      `
        SELECT EXISTS (
          SELECT 1 FROM users
          WHERE username=$1);
      `, [username]
    );

    return result;
  },

  /*
      Messages
                */

  async getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
  },

  async addNewMessage(title, timestamp, text, user_id) {
    console.log("new message added", title, timestamp, text, user_id, "finish this function in queries.js");
  },

};

module.exports = db;