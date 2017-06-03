import * as React from 'react';
import {Message} from '../State';

export interface StateProps {
    messages: Message[];
}

export interface DispatchProps {
}

const MessageComponent = (props: StateProps & DispatchProps) => {

    const getClassName = (message: Message) => 'alert ' + message.messageType;

    return (
          <div className="alert">
              {props.messages.map(message => (
                <div className={getClassName(message)} role="alert">
                  {message.messageString}
                </div>))}
          </div>
    );
};

export default MessageComponent;