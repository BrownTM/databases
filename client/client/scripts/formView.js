var FormView = {

  $form: $('form'),
  $message: $('#message'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    $('#rooms select').on('change', FormView.changeRoom);
    $('#rooms button').on('click', () => {
      FormView.createRoom(prompt('Enter a room: '));
    });
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    //create jquery event to handle a submit click
    //user should be able to click submit upon typing
    //a message, and that msg render onto the chatbox.

    // get the tex from message
    // call Parse.create with the message

    Parse.create({
      username: App.username,
      text: FormView.$message.val(),
      roomname: App.roomname
    });

    // $message.val();
    console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

  //create function that will allow user to change room
  changeRoom: () => {
    App.roomname = $('#rooms select').children().filter(':selected').text();
  },

  createRoom: (room) => {
    Parse.create({
      username: App.username,
      text: `${App.username} created a new room: ${room}`,
      roomname: room
    });

    Rooms.add(room);
    FormView.changeRoom(room);

  }

};