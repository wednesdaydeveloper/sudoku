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
        label: 'undo',
    };
    spyOn(props, 'onclick');
    
  });

  it('rendering when active', () => {
    props.active = true;

    const wrapper = shallow(<ToggleButton {...props} />);
    expect(wrapper.find('Toggle').length).toBe(1);
    expect(wrapper.find('Toggle').at(0).prop('label')).toBe('undo');
    expect(wrapper.find('Toggle').at(0).prop('defaultToggled')).toBe(true);
  });

  it('rendering when inactive', () => {
    props.active = false;

    const wrapper = shallow(<ToggleButton {...props} />);

    expect(wrapper.find('Toggle').length).toBe(1);
    expect(wrapper.find('Toggle').at(0).prop('label')).toBe('undo');
    expect(wrapper.find('Toggle').at(0).prop('defaultToggled')).toBe(false);
  });

  it('rendering when clicked', () => {

    const wrapper = shallow(<ToggleButton {...props} />);

    wrapper.find('Toggle').at(0).simulate('click');
    
    expect(props.onclick).toHaveBeenCalled();
  });
});