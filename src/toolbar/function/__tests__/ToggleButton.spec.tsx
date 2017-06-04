import * as React from 'react';
import ToggleButton, {Props} from '../ToggleButton';
import {shallow} from 'enzyme';

describe('ToggleButton', () => {

  let props: Props;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
        active: false,
        onclick: () => {return; },
        children: "undo",
    };
    spyOn(props, 'onclick');
    
  });

  it('rendering when active', () => {
    props.active = true;

    const wrapper = shallow(<ToggleButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('children')).toBe('undo');
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default active');
  });


  it('rendering when inactive', () => {
    props.active = false;

    const wrapper = shallow(<ToggleButton {...props} />);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('children')).toBe('undo');
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
  });



  it('rendering when clicked', () => {

    const wrapper = shallow(<ToggleButton {...props} />);

    wrapper.find('button').at(0).simulate('click');
    
    expect(props.onclick).toHaveBeenCalled();
  });


});