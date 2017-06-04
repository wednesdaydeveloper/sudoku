import * as React from 'react';
import Functions, {Props} from '../Functions';
import {shallow} from 'enzyme';

describe('ToggleButton', () => {

  let props: Props;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
      hint: false,
      teacher: false,
      canUndo: false,
      onToggleHint: () => {return; },
      onToggleTeacher: () => {return; },
      onUndo: () => {return; },
    };
    spyOn(props, 'onToggleHint');
    spyOn(props, 'onToggleTeacher');
    spyOn(props, 'onUndo');
  });

  it('rendering', () => {
    const wrapper = shallow(<Functions {...props} />);
    expect(wrapper.find('ToggleButton').length).toBe(2);
    expect(wrapper.find('ToggleButton').at(0).prop('children')).toBe('hint');
    expect(wrapper.find('ToggleButton').at(0).prop('active')).toBe(false);
    expect(wrapper.find('ToggleButton').at(1).prop('children')).toBe('teacher');
    expect(wrapper.find('ToggleButton').at(1).prop('active')).toBe(false);

    expect(wrapper.find('UndoButton').length).toBe(1);
    expect(wrapper.find('UndoButton').at(0).prop('children')).toBe('Undo');
    expect(wrapper.find('UndoButton').at(0).prop('disabled')).toBe(true);
  });

  it('rendering with hint true', () => {
    props.hint = true;

    const wrapper = shallow(<Functions {...props} />);
    expect(wrapper.find('ToggleButton').length).toBe(2);
    expect(wrapper.find('ToggleButton').at(0).prop('children')).toBe('hint');
    expect(wrapper.find('ToggleButton').at(0).prop('active')).toBe(true);
    expect(wrapper.find('ToggleButton').at(1).prop('children')).toBe('teacher');
    expect(wrapper.find('ToggleButton').at(1).prop('active')).toBe(false);

    expect(wrapper.find('UndoButton').length).toBe(1);
    expect(wrapper.find('UndoButton').at(0).prop('children')).toBe('Undo');
    expect(wrapper.find('UndoButton').at(0).prop('disabled')).toBe(true);
  });

  it('rendering with teacher true', () => {
    props.teacher = true;

    const wrapper = shallow(<Functions {...props} />);
    expect(wrapper.find('ToggleButton').length).toBe(2);
    expect(wrapper.find('ToggleButton').at(0).prop('children')).toBe('hint');
    expect(wrapper.find('ToggleButton').at(0).prop('active')).toBe(false);
    expect(wrapper.find('ToggleButton').at(1).prop('children')).toBe('teacher');
    expect(wrapper.find('ToggleButton').at(1).prop('active')).toBe(true);

    expect(wrapper.find('UndoButton').length).toBe(1);
    expect(wrapper.find('UndoButton').at(0).prop('children')).toBe('Undo');
    expect(wrapper.find('UndoButton').at(0).prop('disabled')).toBe(true);
  });

  it('rendering with canUndo true', () => {
    props.canUndo = true;

    const wrapper = shallow(<Functions {...props} />);
    expect(wrapper.find('ToggleButton').length).toBe(2);
    expect(wrapper.find('ToggleButton').at(0).prop('children')).toBe('hint');
    expect(wrapper.find('ToggleButton').at(0).prop('active')).toBe(false);
    expect(wrapper.find('ToggleButton').at(1).prop('children')).toBe('teacher');
    expect(wrapper.find('ToggleButton').at(1).prop('active')).toBe(false);

    expect(wrapper.find('UndoButton').length).toBe(1);
    expect(wrapper.find('UndoButton').at(0).prop('children')).toBe('Undo');
    expect(wrapper.find('UndoButton').at(0).prop('disabled')).toBe(false);
  });
});