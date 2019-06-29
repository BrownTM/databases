const Sequelize = require('sequelize');
const db = new Sequelize('chat', 'root', 'passkey');

const User = db.define('User', {
  username: Sequelize.STRING,
  textcolor: Sequelize.STRING,
}, {
  timestamps: false,
  logging: false
});

const Room = db.define('Room', {
  roomname: Sequelize.STRING,
}, {
  timestamps: false,
  logging: false
});

const Message = db.define('Message', {
  'text': Sequelize.STRING
}, {
  logging: false
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
