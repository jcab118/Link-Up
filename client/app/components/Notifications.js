import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
var Link = require("react-router-dom").Link;

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
          messages: [],
          open: false,
          messageToUpdate: '',
          idToUpdate: '',
            submitButtonDisabled: false
        };
    }
    deleteMessage(id){
        fetch(`/api/delete-message/${id}`,{
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                messages: results
            });
        }); 
    }
    openModal(id,message){
      this.setState({
        open: true,
        messageToUpdate: message,
        idToUpdate: id
      }) 
    }
    updateMessage(){
        this.setState({
            submitButtonDisabled: true
        });
      const updatedMessage = {
        message: this.refs.updated_message.value
      }
        fetch(`/api/update-message/${this.state.idToUpdate}`,{
            method: 'PUT',
            body: JSON.stringify(updatedMessage),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                messages: results,
                submitButtonDisabled: false
            });
        });
    }
    messageForm(){
        this.setState({
            submitButtonDisabled: true
        });
      var newMessage = {
        name: this.refs.name.value,
        message: this.refs.message.value
      }
        fetch('/api/message', {
            method: 'post',
            body: JSON.stringify(newMessage),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                messages: this.state.messages.concat(results),
                submitButtonDisabled: false
            });
        });
    }
  componentWillMount(){
    fetch('/api/message', {
      headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
    }).then((response) => response.json())
        .then((results) => {
          this.setState({
            message: results
          });
      });
  }
    render() {
      //console.log(this.state.messages)
      const { messages } = this.state;

      let closeModal = () => this.setState({ open: false })

      const appendMessages = () => {
        return messages.map((message, index) => {
          return (
            <div className="well guest-div" key={index}>
            <button onClick={() => this.deleteMessage(message.id)} className="btn btn-danger x-button">x</button>
            <p style={{fontWeight: 'bold'}}>{message.name}</p>
            <p className="message" onClick={() => this.openModal(message.id, message.message)}>Message: {message.message}</p>
          </div>
          )
        });
      }

      return (
        <div>
        <nav className = "text-center" id="navbar navbar-light bg-faded">
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
      </nav>
            <div className="text-center">
              <h1>Link-Up Post Wall</h1>
            </div>
        <br></br>
        <h5 className="text-center">Write on wall to Link-Up</h5>
        <div className="text-center center-block">
          <form id="guestbook-form" onSubmit={this.messageForm.bind(this)}>
            <label>Name</label><br></br>
            <input type="text" ref="name"/><br></br>
            <label>Message</label><br></br>
            <textarea ref="message"></textarea>
            <br></br>
            <input disabled={this.state.submitButtonDisabled} className="btn btn-default" id="submit-this" type="submit"/>
          </form>
        </div>
        <div id="everything-div">
          {appendMessages()}
        </div>
            <Modal
              show={this.state.open}
              onHide={closeModal}
              aria-labelledby="ModalHeader"
            >
              <div id="modal-form-div" className="text-center">
            <form id="update-message-form" onSubmit={this.updateMessage.bind(this)}>
              <label>Message</label><br></br>
              <textarea defaultValue={this.state.messageToUpdate} ref="updated_message"></textarea>
              <br></br>
              <input disabled={this.state.submitButtonDisabled} className="btn btn-default" id="submit-this" type="submit"/>
            </form>
          </div>
            </Modal>
            <br></br>
            <footer className="text-center" id= "footer">
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
            <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
        </footer>
      </div>
      );
    }
};
