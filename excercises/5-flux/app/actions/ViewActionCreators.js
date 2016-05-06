var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');
var ApiUtil = require('../utils/ApiUtil');

var ViewActionCreators = {
  loadContacts () {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_CONTACTS
    });
    ApiUtil.loadContacts();
  },
  deleteContact(contact) {
  	// we need one dispatcher to change the state of the store to reflect deleting this contact. for now it can be null because we don't need to render that.
  	AppDispatcher.handleViewAction({
  		type: ActionTypes.CONTACT_DELETED,
      contact: contact
  	});
  	// and another dispatcher to the server to delete the value for that contact
  	ApiUtil.deleteContact(contact);
  }
};

module.exports = ViewActionCreators;

