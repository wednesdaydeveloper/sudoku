import * as React from 'react';
import UndoButton, {Props} from '../UndoButton';
import {shallow} from 'enzyme';

describe('UndoButton', () => {

  let props: Props;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
        disabled: false,
        onclick: () => {return; },
        children: "undo",
    };
    spyOn(props, 'onclick');
    
  });

  it('rendering when enabled', () => {
    props.disabled = false;

    const wrapper = shallow(<UndoButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('children')).toBe('undo');
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
  });


  it('rendering when disabled', () => {
    props.disabled = true;

    const wrapper = shallow(<UndoButton {...props} />);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('children')).toBe('undo');
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default disabled');
  });

  it('rendering when clicked', () => {

    const wrapper = shallow(<UndoButton {...props} />);

    wrapper.find('button').at(0).simulate('click');
    
    expect(props.onclick).toHaveBeenCalled();
  });

});