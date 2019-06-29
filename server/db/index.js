const Sequelize = require('sequelize');
const db = new Sequelize('chat', 'root', 'passkey');

const User = db.define('User', {
  username: Sequelize.STRING,
  textcolor: Sequelize.STRING,
}, {
  timestamps: false
});

const Room = db.define('Room', {
  roomname: Sequelize.STRING,
}, {
  timestamps: false
});

const Message = db.define('Message', {
  'user_id': {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  'text': Sequelize.STRING,
  'room_id': {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'id'
    }
  }
});

User.hasMany(Message, { foreignKey: 'user_id' });
Room.hasMany(Message, { foreignKey: 'room_id' });

Message.belongsTo(User, { foreignKey: 'user_id' });
Message.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = {
  User,
  Room,
  Message
};
