const React = require('react');

import { Modal, Popover, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
    const tooltip = (
      <Tooltip id="tooltip">Start a {this.props.isChannel ? "new channel" : "private chat between some friends" } !</Tooltip>
    );
    return (
      <div>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <MdAddBox color="white" onClick={this.open} />
        </OverlayTrigger>

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
