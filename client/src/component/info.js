import React from 'react';
import { getProtoData, postProtoData } from '../utils/proto';
import { getMessage } from '../api/get-message';
import { postMessage } from '../api/post-message';
import { load } from "protobufjs";

export class Info extends React.Component {
  state = {
    data: {},
    lang: 'ru',
    text: '',
    proto: null,
  };

  componentDidMount() {
    load('./data/message.proto', (err, root) => {
      if (err) {
        throw err;
      }

      const AwesomeMessage = root.lookupType("Message");

      getProtoData(AwesomeMessage, (process) => {
        getMessage()
          .then((msg) => {
            this.setState({
              data: process(msg),
              proto: AwesomeMessage,
            });
          });
      });
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    console.log('form', this.state.lang, this.state.text);
    e.preventDefault();

    const data = {
      // lang: this.state.lang,
      text: this.state.text,
    };
    if (this.state.lang) {
      data.lang = this.state.lang;
    }

    try {
      postProtoData(this.state.proto, data, (processData) => {
        postMessage(processData)
      })
    } catch(errMsg) {
      console.log('ERROR!', errMsg);
    }
  };

  render() {
    return <>
      <div>Сообщение: {JSON.stringify(this.state.data)}</div>
      <div>Отправка:</div>
      <form onSubmit={this.handleSubmit}>
        <div>
          <select name="lang" onChange={this.handleChange}>
            <option value="fr">fr</option>
            <option value="en">en</option>
          </select>
        </div>
        <div>
          <input type="text" name="text" onChange={this.handleChange} />
        </div>
        <button type="submit">Нажми</button>
      </form>
    </>;
  }
}