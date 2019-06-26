var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // SELECT * FROM messages
    }, // a function which produces all the messages
    post: function (message, callback) {
      /* message -> {
        user: user,
        text: text,
        roomname: roomname
      }*/
      // users.post  param.user
      // rooms.post
      // 'INSERT INTO messages (user_id, room_id, text) VALUES ((SELECT id FROM users WHERE name = ?), (SELECT id FROM rooms WHERE name = ?), ?)'
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {},
    post: function (message, callback) {}
  },

  rooms: {
    get: function (callback) {},
    post: function (message, callback) {}
  }
};

