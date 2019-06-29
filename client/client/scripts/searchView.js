var SearchView = {
  $form: $('form#searchSend'),

  initialize: function() {
    SearchView.$form.on('submit', SearchView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    console.log(event);
    const searchString = this[0].value;

    Parse.search({searchUsername: searchString}, (data) => {
      console.log(data);
      data.results.map((message) => MessagesView.renderMessage(message));
    });

  },
};