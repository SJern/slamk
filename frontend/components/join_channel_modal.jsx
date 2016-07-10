const React = require('react');

import { Modal, Popover, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

const JoinChannelForm = require('./join_channel_form');


const JoinChannelModal = React.createClass({

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
      <Tooltip id="tooltip">Join different channels to chat !</Tooltip>
    );
    return (
      <div>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <div onClick={this.open} >CHANNELS</div>
        </OverlayTrigger>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JoinChannelForm closeModal={this.close} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});



module.exports = JoinChannelModal;
