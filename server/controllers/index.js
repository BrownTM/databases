var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, results) => {
        if (err) {
          res.status(500);
          res.send('Could not get messages');
        } else {
          res.status(200);
          res.type('json');
          res.send(JSON.stringify({results}));
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      const message = {
        username: req.body.username,
        roomname: req.body.roomname,
        text: req.body.text
      };
      models.messages.post(message, (err, result) => {
        if (err) {
          res.status(500);
          res.send('Could not post message.');
        } else {
          res.status(201);
          res.type('json');
          res.send(JSON.stringify(result));
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, results) => {
        if (err) {
          res.status(500);
          res.send('Could not get users');
        } else {
          res.status(200);
          res.type('json');
          res.send(JSON.stringify({results}));
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body.username, (err, result) => {
        if (err) {
          res.status(500);
          res.send('Could not post message.');
        } else {
          res.status(201);
          res.type('json');
          res.send(JSON.stringify(result));
        }
      });
    }
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get((err, results) => {
        if (err) {
          res.status(500);
          res.send('Could not get users from database.');
        } else {
          res.status(200);
          res.send(JSON.stringify({results}));
        }
      });
    },
    post: function (req, res) {
      models.rooms.post(req.body.roomname, (err, result) => {
        if (err) {
          res.status(500);
          res.send('Could not post message.');
        } else {
          res.status(201);
          res.type('json');
          res.send(JSON.stringify(result));
        }
      });
    }
  }
};

