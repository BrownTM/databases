var FormView = {
  $form: $('form#send'),
  $searchForm: $('form#searchSend'),

  //placeholder variable to store what room we're currently in
  //$select changes current room
  currentRoom: 'lobby',

  initialize: function(userinfo) {
    FormView.$form.on('submit', FormView.handleSubmit);
    $('#colors .textcolor').on('change', FormView.handleTextcolorChange);
    $(`.textcolor option[value=${userinfo.textcolor}]`).attr('selected', 'selected');
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

    var user = {
      username: App.username,
      textcolor: event.target.value
    };

    Parse.updateUser(user);
  }
};