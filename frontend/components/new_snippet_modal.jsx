const React = require('react');

import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

const NewSnippetForm = require('./new_snippet_form');
const MdApps = require('react-icons/lib/md/apps');

const NewSnippetModal = React.createClass({

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
      <Tooltip id="tooltip">Open the source code editor here</Tooltip>
    );
    return (
      <div>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <MdApps onClick={this.open}/>
        </OverlayTrigger>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Source Code Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewSnippetForm roomId={this.props.roomId} closeModal={this.close} />
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
