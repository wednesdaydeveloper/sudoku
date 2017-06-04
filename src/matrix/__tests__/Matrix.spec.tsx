import * as React from 'react';
import {shallow} from 'enzyme';

import Matrix, {Props} from '../Matrix';
import { SudokuCell } from '../../State';

describe('Matrix', () => {

  let props: Props;

  beforeEach(() => {

    const data: SudokuCell[] = Array<SudokuCell>(81);
    for (let row=0; row<9; row++) {
      for (let col=0; col<9; col++) {
        const val = row * 9 + col + 1;
        data[val-1] = {row, col, initial: true, val};
      }
    }
    //  デフォルトのプロパティ
    props = {
      data,
      selected: undefined ,
      onSelectCell: (cell: SudokuCell) => {return; },
    };
    spyOn(props, 'onSelectCell');
    
  });

  it('rendering', () => {
    const wrapper = shallow(<Matrix {...props} />);
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('table').at(0).prop('className')).toBe('sudokuTable');

    expect(wrapper.find('tr').length).toBe(9);
    expect(wrapper.find('tr > td').length).toBe(81);
    for (let i=0; i<81; i++) {
      expect(wrapper.find('tr > td').at(i).prop('className')).toBe('initial ');
    }
    expect(wrapper.find('tr > td > p').length).toBe(81);
    for (let i=0; i<81; i++) {
      expect(wrapper.find('tr > td > p').at(i).prop('children')).toBe(i + 1);
    }
  });

  it('rendering valが０の場合は、数値を表示しない。', () => {
    props.data[10].val = 0;

    const wrapper = shallow(<Matrix {...props} />);

    expect(wrapper.find('tr > td > p').at(10).prop('children')).toBe('');
  });


  it('rendering initialがfalseの場合', () => {
    props.data[10].initial = false;

    const wrapper = shallow(<Matrix {...props} />);

    expect(wrapper.find('tr > td').at(10).prop('className')).toBe('');
    expect(wrapper.find('tr > td > p').at(10).prop('children')).toBe(11);
  });


  it('rendering selected が設定されている', () => {
    props.selected = {row: 1, col: 1, val: 999};  //  val は関係ない

    const wrapper = shallow(<Matrix {...props} />);

    expect(wrapper.find('tr > td').at(10).prop('className')).toBe('selected initial ');
    expect(wrapper.find('tr > td > p').at(10).prop('children')).toBe(11);
  });


  it('rendering selected が設定されていて initial がfalse', () => {
    props.data[10].initial = false;
    props.selected = {row: 1, col: 1, val: 999};  //  val は関係ない

    const wrapper = shallow(<Matrix {...props} />);

    expect(wrapper.find('tr > td').at(10).prop('className')).toBe('selected ');
    expect(wrapper.find('tr > td > p').at(10).prop('children')).toBe(11);
  });

  it('rendering when clicked initial がfalse', () => {
    props.data[10].initial = false;

    const wrapper = shallow(<Matrix {...props} />);

    wrapper.find('tr > td').at(10).simulate('click');
    
    expect(props.onSelectCell).toHaveBeenCalledWith(props.data[10]);
  });


  it('rendering when clicked initial がtrue', () => {
    props.data[10].initial = true;

    const wrapper = shallow(<Matrix {...props} />);

    wrapper.find('tr > td').at(10).simulate('click');
    
    expect(props.onSelectCell).not.toHaveBeenCalled();
  });

});