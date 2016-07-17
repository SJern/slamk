const React = require('react');

import { Modal, Button, MenuItem } from 'react-bootstrap';

const NewSnippetForm = require('./new_snippet_form');

const NewSnippetModal = React.createClass({

  getInitialState() {
    return { showModal: false };
  },

  close() {
    console.log("hahahahhaksdfhwowh");
    console.log("beforeclose", this.state.showModal);
    this.setState({ showModal: false });
    console.log("afterclose", this.state.showModal);
  },

  open() {
    console.log("oppppeeeeen");
    console.log("before", this.state.showModal);
    this.setState({ showModal: true });
    console.log("after", this.state.showModal);
  },

  render() {
    return (
      <div>
        <MenuItem onClick={this.open}>Create a snippet of code</MenuItem>

        <Modal backdrop={'static'} show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewSnippetForm closeModal={this.close} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = NewSnippetModal;
