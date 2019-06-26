var MessageView = {

  // <%- sanitizes input whereas <%= does not
  render: _.template(`
      <div class="chat">
        <div class="username"><%- username %></div>
        <div><%- text %></div>
      </div>
    `),

  renderFriend: _.template(`
      <div class="chat">
        <div class="username" style="font-weight:bold"><%- username %></div>
        <div style="background-color:lightblue"><%- text %></div>
      </div>
  `)

};