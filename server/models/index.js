var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT users.username, rooms.roomname, messages.text FROM users, rooms, messages WHERE users.id = messages.user_id AND rooms.id = messages.room_id', (err, results) => {
        if (err) {
          callback(err, null);
        }
        callback(null, results);
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      // INSERT IGNORE INTO ...
      /* message -> {
        username: user,
        text: text,
        roomname: roomname
      }*/
      db.query('INSERT IGNORE INTO users (username) VALUES (?)', message.username, (err) => {
        if (err) {
          callback(err, null);
        } else {
          db.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', message.roomname, (err) => {
            if (err) {
              callback(err, null);
            } else {
              db.query('INSERT INTO messages (user_id, room_id, text) VALUES ((SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), ?)',
                [message.username, message.roomname, message.text], (err, result) => {
                  if (err) {
                    callback(err, null);
                  } else {
                    callback(null, result);
                  }
                });
            }
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT users.username FROM users', (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (username, callback) {
      db.query('INSERT IGNORE INTO users (username) VALUES (?)', username, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  rooms: {
    get: function (callback) {
      db.query('SELECT rooms.roomname FROM rooms', (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (roomname, callback) {
      db.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', roomname, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  }
};

