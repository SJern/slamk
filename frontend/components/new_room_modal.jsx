const React = require('react');

import { Modal, Popover, Button } from 'react-bootstrap';
const MdAddBox = require('react-icons/lib/md/add-box');

const NewRoomForm = require('./new_room_form');


const NewRoomModal = React.createClass({

  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>
        <MdAddBox color="white" onClick={this.open} />

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewRoomForm isChannel={this.props.isChannel} closeModal={this.close} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});



module.exports = NewRoomModal;
