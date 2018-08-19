import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';
import ComposeForm from './components/ComposeForm';
import axios from 'axios'

class App extends Component {

  constructor(){
    super()
    this.state= {
      messages: [],
      composeOn: false,
      bodyHidden: ''
    }
  }

  getAllMessages = async () => {
    const response = await axios.get(` http://localhost:8082/api/messages`)
    return response.data
  }

  componentDidMount = async () => {
    const newMessages = await this.getAllMessages();
    const selectedMessages = newMessages.filter(message => message.selected)

    this.setState({
      messages:newMessages
    })
  }

  starMessage = async (id) => {
    const response = await axios.patch(`http://localhost:8082/api/messages`, { messageIds:[id], command:'star', starred:true })
    // const newMessages = this.state.messages.map(message => {
    //   if(message.id === id) {
    //     message.starred = !message.starred;
    //   }
    //   return message;
    // })
    const newMessages = await this.getAllMessages();

    this.setState({
      messages:newMessages
    })
  }

  highLightMessage = (id) => {
    const newMessages = this.state.messages.map(message => {
      if(message.id === id) message.selected ? delete message.selected: message.selected=true;
      return message;
    })
    this.setState ({
      messages: newMessages
    })
  }

  highLightAll = () => {

    const allMessages = this.state.messages.every(message => message.selected === true)

    const highlightedMsgs = this.state.messages.map(message => {
      allMessages ? delete message.selected : message.selected=true
      return message;
    });

    this.setState({
      messages: highlightedMsgs
    })
  }

  deleteMessage = async () => {
    const deletedMsgIds = this.state.messages.reduce((acc, message) => {
      if (message.selected !== undefined) {
        acc.push(message.id)
      }
      return acc;
    },[])

    const response = await axios.patch(`http://localhost:8082/api/messages`,  {messageIds: deletedMsgIds, command:'delete'})

    this.setState({
      messages: response.data
    })
  }

  addLabels = async (event) => {
    const selectedIds = this.state.messages.filter(message => message.selected).map(message => message.id)
    // const labelledMsgs = this.state.messages.map(message => {
    //   if(message.selected) message.labels.push(event.target.value)
    //   return message;
    // })
    const response = await axios.patch(`http://localhost:8082/api/messages`,  {messageIds: selectedIds, command:'addLabel', label: event.target.value})
    this.setState({
      messages: response.data
    })
  }

  removeLabels = async (event) => {
    const selectedIds = this.state.messages.filter(message => message.selected).map(message => message.id)
    const response = await axios.patch(`http://localhost:8082/api/messages`,  {messageIds: selectedIds, command:'removeLabel', label: event.target.value})
    // const unlabelledMsgs = this.state.messages.map(message => {
    //   if(message.selected === true && message.labels.includes(event.target.value)) {
    //     const indexToRemove = message.labels.indexOf(event.target.value)
    //     const altered = message.labels.splice(indexToRemove, 1)
    //   }
    //   return message;
    // })
    this.setState({
      messages: response.data
    })
  }

  markRead = async () => {
    const selectedIds = this.state.messages.filter(message => message.selected).map(message => message.id)
    const response = await axios.patch(`http://localhost:8082/api/messages`, {messageIds: selectedIds, command:'read', read:true})

    // const newMessages = this.state.messages.map(message => {
    //   message.selected === true ? message.read = true : null
    //   return message;
    // })
    this.setState({
      messages: response.data
    })
    // this.componentDidMount();
  }

  markUnRead = async () => {
    const selectedIds = this.state.messages.filter(message => message.selected).map(message => message.id)
    const unReadMessages = await axios.patch(`http://localhost:8082/api/messages`, {messageIds: selectedIds, command:'read', read:false})
    // const newMessages = this.state.messages.map(message => {
    //   message.selected === true ? message.read = false : null
    //   return message;
    // })
    // this.setState({
    //   messages: unReadMessages
    // })
    this.setState({
      messages: unReadMessages.data
    })
  }

  createMessage = async ({subject, body}) => {
    const response = await axios.post(`http://localhost:8082/api/messages`, { subject, body })
    this.setState({
      messages: [...this.state.messages, response.data],
      composeOn: false
    })
  }

  toggleBody = (id) => {
    this.setState({
      bodyHidden : this.state.bodyHidden === id ? '' : id
    })
  }

  toggeleForm = () => {
    this.setState({
      composeOn : !this.state.composeOn
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          highLightAll={this.highLightAll}
          deleteMessage={this.deleteMessage}
          addLabels={this.addLabels}
          removeLabels={this.removeLabels}
          markRead={this.markRead}
          markUnRead={this.markUnRead}
          composeForm={this.toggeleForm}
        />
        {this.state.composeOn === true && <ComposeForm createMessage={this.createMessage}/> }
        <MessageList
          messages={this.state.messages}
          starMessage={this.starMessage}
          highLightMessage={this.highLightMessage}
          bodyHidden={this.state.bodyHidden}
          toggleBody={this.toggleBody}
        />
      </div>
    );
  }
}

export default App;
