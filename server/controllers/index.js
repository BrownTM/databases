var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then((results) => {
          res.status(200);
          res.type('json');
          res.send(JSON.stringify({results}));
        })
        .catch((error) => {
          res.status(500);
          res.send('Could not get messages');
          console.error('Error reading all messages', error);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body)
        .then((result) => {
          res.status(201);
          res.type('json');
          res.send(JSON.stringify(result));
        })
        .catch((error) => {
          res.status(500);
          res.send('Could not post message.');
          console.error('Could not post message', error);
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get()
        .then((results) => {
          res.status(200);
          res.type('json');
          res.send(JSON.stringify({results}));
        })
        .catch((err) => {
          res.status(500);
          res.send('Could not get users');
        });
    },

    post: function (req, res) {
      models.users.post(req.body.username)
        .then((result) => {
          res.status(201);
          res.type('json');
          res.send(JSON.stringify(result));
        })
        .catch((err) => {
          res.status(500);
          res.send('Could not post message.');
        });
    },
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get()
        .then((results) => {
          res.status(200);
          res.send(JSON.stringify({results}));
        })
        .catch((err) => {
          res.status(500);
          res.send('Could not get users from database.');
        });
    },
    post: function (req, res) {
      models.rooms.post(req.body.roomname)
        .then((result) => {
          res.status(201);
          res.type('json');
          res.send(JSON.stringify(result));
        })
        .catch((err) => {
          res.status(500);
          res.send('Could not post message.');
        });
    }
  }
};

