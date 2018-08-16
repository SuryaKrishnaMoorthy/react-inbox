import React, { Component} from 'react'

class Toolbar extends Component{
  constructor(props){
    super(props)

  }

  checkIcon = (messages) => {
    const allMessages = messages.every(message => message.selected === true);
    const someMessages = messages.some(message => message.selected === true);

    if (allMessages) return 'fa fa-check-square-o'
    else if (someMessages) return 'fa fa-minus-square-o'
    else return 'fa fa-square-o'
  }

  countUnRead = (messages) => {
    const count = messages.filter(message => message.read === false).length;
    return count;
  }

  disableToolbar = () => {
    const selected = this.props.messages.filter(message => message.selected === false)
    return selected.length ? '' : 'disabled'
  }

  render(){
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.countUnRead(this.props.messages)}</span>
            unread message{`${this.countUnRead(this.props.messages) > 1 ? 's' : ''}`}
          </p>

          <button onClick={this.props.highLightAll} className="btn btn-default">
            <i  className={this.checkIcon(this.props.messages)}></i>
          </button>

          <button onClick={this.props.markRead} className="btn btn-default" disabled={this.disableToolbar()}>
            Mark As Read
          </button>

          <button onClick={this.props.markUnRead} className="btn btn-default" disabled={this.disableToolbar()}>
            Mark As Unread
          </button>

          <select onChange={this.props.addLabels} className="form-control label-select" disabled={this.disableToolbar()}>
            <option>Apply label</option>
            <option  value="dev">dev</option>
            <option  value="personal">personal</option>
            <option  value="gschool">gschool</option>
          </select>

          <select onChange={this.props.removeLabels} className="form-control label-select" disabled={this.disableToolbar()}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={this.props.deleteMessage} className="btn btn-default" disabled={this.disableToolbar()}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar;
