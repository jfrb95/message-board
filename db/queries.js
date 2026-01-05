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
    const { rows } = await pool.query(
      `
      SELECT users.id, title, timestamp, text, username FROM messages
      LEFT JOIN users
      ON messages.user_id=users.id
      `
    );
    return rows;
  },

  async addNewMessage(title, timestamp, text, user_id) {
    await pool.query(
      `
      INSERT INTO messages
      VALUES (DEFAULT, $1, $2, $3, $4);
      `, [title, timestamp, text, user_id]
    );
  },

  async makeUserMember(userId) {
    await pool.query(
      `
      UPDATE users
      SET membership_status='yes'
      WHERE id=$1;
      `, [userId]
    );
  },
};

module.exports = db;