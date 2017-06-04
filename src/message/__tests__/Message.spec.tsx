import * as React from 'react';
import MessageComponent, {Props} from '../Message';
import {shallow} from 'enzyme';

describe('Message', () => {

  let props: Props;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
        messages: [],
    };
  });

  it('rendering messagesが空', () => {
    const wrapper = shallow(<MessageComponent {...props} />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').at(0).prop('className')).toBe('alert');
  });

  it('rendering messages２件', () => {
    props.messages = [
      {messageType: 'alert-success', messageString: '成功' },      
      {messageType: 'alert-fail', messageString: '失敗' },      
    ];

    const wrapper = shallow(<MessageComponent {...props} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('div').at(0).prop('className')).toBe('alert');
    
    expect(wrapper.find('div').at(1).prop('className')).toBe('alert alert-success');
    expect(wrapper.find('div').at(1).prop('children')).toBe('成功');
    expect(wrapper.find('div').at(2).prop('className')).toBe('alert alert-fail');
    expect(wrapper.find('div').at(2).prop('children')).toBe('失敗');
  });

});