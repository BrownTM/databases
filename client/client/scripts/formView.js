var FormView = {

  $form: $('form'),

  //placeholder variable to store what room we're currently in
  //$select changes current room
  currentRoom: 'lobby',

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    //Thérèse: reference your code on your computer for what is supposed to go here. it's supposed to be about #rooms
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    var message = {
      text: this[0].value,
      username: App.username,
      roomname: FormView.currentRoom
    };

    Parse.create(message);
    $('#chats').empty();
    App.fetch();

  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },


  handleTextcolorChange: function(event) {
    event.preventDefault();
  },
};