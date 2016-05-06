var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
  getInitialState () {
    return ContactsStore.getState();
  },

  componentDidMount () {
    ContactsStore.addChangeListener(this.handleStoreChange);
    ViewActionCreators.loadContacts();
  },

  componentWillUnmount () {
    ContactsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange () {
    this.setState(ContactsStore.getState());
  },

  deleteContactClick (contact) {
    // this is a user interaction. We need to go to ActionCreator for this interaction
    ViewActionCreators.deleteContact(contact);
  },

  renderContacts () {
    return this.state.contacts.map((contact) => {
      var deleteContact = this.deleteContactClick.bind(null, contact)
      return <li onClick={deleteContact}>{contact.first} {contact.last}</li>;
    });
  },

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul>{this.renderContacts()}</ul>
      </div>
    );
  }
});

module.exports = App;

