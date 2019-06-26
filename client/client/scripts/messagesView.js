var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function() {
    let html = '';

    _.each(Messages.data, (message) => {
      if (message.roomname === App.roomname) {
        if (Friends.friends[message.username]) {
          html += MessageView.renderFriend(message);
        } else {
          html += MessageView.render(message);
        }
      }
    });
    //iterate through length of usernames,
    //if !username, return null;
    //return username

    this.$chats.html(html);
    //this.$chats.children().filter('.username').on('click', Friends.toggleStatus);
    $('#chats .username').on('click', (event) => {
      Friends.toggleStatus(event.target.innerHTML);
    });
  },

  renderMessage: function(message) {
    this.$chats.html(MessageView.render(message));
    //this.$chats.children().filter('.username').on('click', Friends.toggleStatus);
    $('#chats .username').on('click', (event) => { Friends.toggleStatus(event); });
  }

};