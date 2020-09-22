import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleInput = (customerMsg) => {
    const msg = {
      role: 'CUSTOMER',
      text: customerMsg,
    };
    this.addMsg(msg);
    this.handleReply(customerMsg);
  };

  addMsg = (msg) => {
    this.setState((preState) => ({
      messages: preState.messages.concat(msg),
    }));
  };

  handleReply = (customerMsg) => {
    answersData.forEach((item) => {
      item.tags.some((tag) => {
        if (customerMsg.indexOf(tag) > -1) {
          this.addMsg(item);
          return true;
        }
        return false;
      });
    });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleInput={this.handleInput} />
      </main>
    );
  }
}

export default Chat;
