/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'passkey');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  username: Sequelize.STRING,
}, {
  timestamps: false
});

var Room = db.define('Room', {
  roomname: Sequelize.STRING,
}, {
  timestamps: false
});

var Message = db.define('Message', {
  'text': Sequelize.STRING
});

User.hasMany(Message, {foreignKey: 'user_id'});
Message.belongsTo(User, {foreignKey: 'user_id'});

Room.hasMany(Message, {foreignKey: 'room_id'});
Message.belongsTo(Room, {foreignKey: 'room_id'});

//Message.hasOne(User, { foreignKey: 'user_id' });
//Message.hasOne(Room, { foreignKey: 'user_id' });

//async function postMessage(message) {
const postMessage = async function(message) {
  let otherInfo = {};
  let user = await User.find({where: { username: message.username } });
  if (!user) {
    user = await User.create({ username: message.username });
  }
  let room = await Room.find({where: { roomname: message.roomname } });
  if (!room) {
    room = await Room.create({ roomname: message.roomname });
  }
  const msg = await Message.create({ 'user_id': user.id, text: message.text, 'room_id': room.id });
  console.log(JSON.stringify(msg));
}

User.create({username: 'Jimbo'}, {ignore: true}).then(console.log).catch(console.error);

User.findAll({}).then((rooms) => console.log(JSON.stringify(rooms)));