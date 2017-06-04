import * as React from 'react';
import Numbers from '../Numbers';
import {Props} from '../NumberButton';

import {shallow} from 'enzyme';

describe('Numbers', () => {

  let props: Props;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
      hint: false,
      hasSelectedCell: false,
      hintResult: [1, 2, 3],
      onFillCell: (val: number) => {return; },
    };
    spyOn(props, 'onFillCell');
  });

  it('rendering', () => {
    const wrapper = shallow(<Numbers {...props}/>);

    expect(wrapper.find('NumberButton').length).toBe(9);
    for(let i = 0; i < 9; i++ ) {
      expect(wrapper.find('NumberButton').at(i).prop('num')).toBe(i + 1);
      expect(wrapper.find('NumberButton').at(i).prop('hint')).toBe(false);
      expect(wrapper.find('NumberButton').at(i).prop('hasSelectedCell')).toBe(false);
      expect(wrapper.find('NumberButton').at(i).prop('hintResult')).toEqual([1,2,3]);
    }

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering with hint true', () => {
    props.hint = true;

    const wrapper = shallow(<Numbers {...props}/>);

    expect(wrapper.find('NumberButton').length).toBe(9);
    for(let i = 0; i < 9; i++ ) {
      expect(wrapper.find('NumberButton').at(i).prop('num')).toBe(i + 1);
      expect(wrapper.find('NumberButton').at(i).prop('hint')).toBe(true);
      expect(wrapper.find('NumberButton').at(i).prop('hasSelectedCell')).toBe(false);
      expect(wrapper.find('NumberButton').at(i).prop('hintResult')).toEqual([1,2,3]);
    }

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering with hasSelectedCell true', () => {
    props.hasSelectedCell = true;

    const wrapper = shallow(<Numbers {...props}/>);

    expect(wrapper.find('NumberButton').length).toBe(9);
    for(let i = 0; i < 9; i++ ) {
      expect(wrapper.find('NumberButton').at(i).prop('num')).toBe(i + 1);
      expect(wrapper.find('NumberButton').at(i).prop('hint')).toBe(false);
      expect(wrapper.find('NumberButton').at(i).prop('hasSelectedCell')).toBe(true);
      expect(wrapper.find('NumberButton').at(i).prop('hintResult')).toEqual([1,2,3]);
    }

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering with hintResult 4,5,6', () => {
    props.hintResult = [4, 5, 6];

    const wrapper = shallow(<Numbers {...props}/>);

    expect(wrapper.find('NumberButton').length).toBe(9);
    for(let i = 0; i < 9; i++ ) {
      expect(wrapper.find('NumberButton').at(i).prop('num')).toBe(i + 1);
      expect(wrapper.find('NumberButton').at(i).prop('hint')).toBe(false);
      expect(wrapper.find('NumberButton').at(i).prop('hasSelectedCell')).toBe(false);
      expect(wrapper.find('NumberButton').at(i).prop('hintResult')).toEqual([4,5,6]);
    }

    expect(props.onFillCell).not.toHaveBeenCalled();
  });
});

