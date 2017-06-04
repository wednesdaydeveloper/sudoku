import * as React from 'react';
import {shallow} from 'enzyme';

import NumberButton, {NumberButtonProps} from '../NumberButton';

describe('NumberButton', () => {
  let props: NumberButtonProps;

  beforeEach(() => {
    //  デフォルトのプロパティ
    props = {
      hint: false,
      hasSelectedCell: false,
      hintResult: [1, 2, 3, 4, 5, 6],
      onFillCell: (val: number) => {return; },
      num: 9, 
    };
    spyOn(props, 'onFillCell');
  });

  it('rendering', () => {
    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
    expect(wrapper.find('button').at(0).prop('children')).toBe(9);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering hint のみtrue', () => {
    props.hint = true;

    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
    expect(wrapper.find('button').at(0).prop('children')).toBe(9);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering hasSelectedCell のみtrue', () => {
    props.hasSelectedCell = true;

    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
    expect(wrapper.find('button').at(0).prop('children')).toBe(9);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });


  it('rendering hintResult が空', () => {
    props.hintResult = [];

    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
    expect(wrapper.find('button').at(0).prop('children')).toBe(9);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering num がhintResultに含まれる', () => {
    props.num = 6;

    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
    expect(wrapper.find('button').at(0).prop('children')).toBe(6);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });

  it('rendering hint hasSelectedCell がtrue でnum がhintResultに含まれる', () => {
    props.hasSelectedCell = true;
    props.hint = true;
    props.num = 6;

    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default');
    expect(wrapper.find('button').at(0).prop('children')).toBe(6);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });  

  it('rendering hint hasSelectedCell がtrue でnum がhintResultに含まれない', () => {
    props.hasSelectedCell = true;
    props.hint = true;
    props.num = 9;

    const wrapper = shallow(<NumberButton {...props}/>);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).prop('className')).toBe('btn btn-default disabled');
    expect(wrapper.find('button').at(0).prop('children')).toBe(9);

    expect(props.onFillCell).not.toHaveBeenCalled();
  });  


  it('click', () => {

    const wrapper = shallow(<NumberButton {...props} />);

    wrapper.find('button').at(0).simulate('click');
    
    expect(props.onFillCell).toHaveBeenCalledWith(9);
  });

});
