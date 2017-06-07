import * as React from 'react';
import UndoButton, {Props} from '../UndoButton';
import {shallow} from 'enzyme';
import { create } from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('UndoButton', () => {

  let props: Props;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
        disabled: false,
        onclick: () => {return; },
        children: 'undo',
    };
    spyOn(props, 'onclick');
    
  });

  it('RaisedButton の Snapshot', () => {
    const renderedValue =  create(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <UndoButton {...props} />
    </MuiThemeProvider>).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('rendering when enabled', () => {
    props.disabled = false;

    const wrapper = shallow(<UndoButton {...props} />);
    expect(wrapper.find('RaisedButton').length).toBe(1);
    expect(wrapper.find('RaisedButton').at(0).prop('children')).toBe('undo');
    expect(wrapper.find('RaisedButton').at(0).prop('disabled')).toBe(false);
  });

  it('rendering when disabled', () => {
    props.disabled = true;

    const wrapper = shallow(<UndoButton {...props} />);

    expect(wrapper.find('RaisedButton').length).toBe(1);
    expect(wrapper.find('RaisedButton').at(0).prop('children')).toBe('undo');
    expect(wrapper.find('RaisedButton').at(0).prop('disabled')).toBe(true);
  });

  it('rendering when clicked', () => {

    const wrapper = shallow(<UndoButton {...props} />);

    wrapper.find('RaisedButton').at(0).simulate('click');
    
    expect(props.onclick).toHaveBeenCalled();
  });

});