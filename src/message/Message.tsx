import * as React from 'react';
import { Message } from '../State';

export interface StateProps {
  messages: Message[];
}

export interface DispatchProps {
}

export type Props = StateProps & DispatchProps;

const MessageComponent = (props: Props) => {

  const getClassName = (message: Message) => 'alert ' + message.messageType;

  return (
    <div className="alert">
      {props.messages.map((message, i) => (
        <div key={i} className={getClassName(message)} role="alert">
          {message.messageString}
        </div>))}
    </div>
  );
};

export default MessageComponent;