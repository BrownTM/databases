var db = require('../db');

module.exports = {
  messages: {
    get: (params) => {
      if (params.searchUsername) {
        return module.exports.users.get({username: params.searchUsername})
          .then((user) => {
            return db.Message.findAll({include: [db.Room, db.User], where: {user_id: user.id}})
              .then((messages) => {
                return messages.map((message) => {
                  return {
                    username: message.User.username,
                    text: message.text,
                    textcolor: message.User.textcolor,
                    roomname: message.Room.roomname,
                    createdAt: message.createdAt,
                    updatedAt: message.updatedAt
                  }
                });
              });
          })
      } else if (params.searchMessage) {
        return db.Message.findAll({include: [db.Room, db.User], where: {text: `%s${req.searchMessage}%s`}})
      } else {
        return db.Message.findAll({include: [db.Room, db.User], logging: false})
          .then((messages) => {
            return messages.map((message) => {
              return {
                username: message.User.username,
                text: message.text,
                textcolor: message.User.textcolor,
                roomname: message.Room.roomname,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt
              }
            })
          });
      }
    }, // a function which produces all the messages
    post: async (message) => {
      let user = await db.User.find({where: { username: message.username } });
      if (!user) {
        user = await db.User.create({ username: message.username });
      }
      let room = await db.Room.find({where: { roomname: message.roomname } });
      if (!room) {
        room = await db.Room.create({ roomname: message.roomname });
      }

      return db.Message.create({ 'user_id': user.id, text: message.text, 'room_id': room.id });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: (user) => {
      if(!user.username) {
        return db.User.findAll({});
      } else {
        return db.User.find({where: {username: user.username}});
      }

    },
    post: (username) => db.User.create({username: username}, {ignore: true}),
    put: (user) => db.User.update({textcolor: user.textcolor}, {where: {username: user.username}})
  },

  rooms: {
    get: () => db.Room.findAll({}),
    post: (roomname) => db.Room.create({roomname: roomname})
  }
};

