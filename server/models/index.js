var db = require('../db');

module.exports = {
  messages: {
    get: () => {
      return db.Message.findAll({include: [db.Room, db.User]})
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
    get: () => db.User.findAll({}),
    post: (username) => db.User.create({username: username}),
    put: (textcolor) => db.User.update({textcolor})
  },

  rooms: {
    get: () => db.Room.findAll({}),
    post: (roomname) => db.Room.create({roomname: roomname})
  }
};

