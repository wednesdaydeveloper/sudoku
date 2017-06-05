import * as React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import MessageContainer from '../Container';
import MessageComponent from '../Message';
import { SudokuState } from '../../State';

const initialState: SudokuState = {
  initialCells: [],
  resultCells: [],
  selectedCell: undefined,
  hint: false,
  teacher: false,
  hintResult: [],
  solved: false,
  messages: [
    { messageType: 'alert-success', messageString: '成功' },
    { messageType: 'alert-fail', messageString: '失敗' },
  ],
};

describe('Messageのコンテナのテスト', () => {

  const mockStore = configureStore()
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState)
    container = shallow(<MessageContainer store={store} />)
  })

  it('+++ render the connected(SMART) component', () => {
    expect(container.length).toEqual(1)
  });

  it('+++ check Prop matches with initialState', () => {
    expect(container.prop('messages')).toEqual(initialState.messages)
  });

});

describe('Messageのコンテナのテスト.Provider を経由',()=>{
    const mockStore = configureStore()
    let store,wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><MessageContainer /></Provider> )
    })

    it('div タグが３つ', () => {
      expect(wrapper.find('div').length).toBe(3);
      expect(wrapper.find('div').at(0).prop('className')).toBe('alert');
      
      expect(wrapper.find('div').at(1).prop('className')).toBe('alert alert-success');
      expect(wrapper.find('div').at(1).prop('children')).toBe('成功');
      expect(wrapper.find('div').at(2).prop('className')).toBe('alert alert-fail');
      expect(wrapper.find('div').at(2).prop('children')).toBe('失敗');
    });

    it('+++ render the connected(SMART) component', () => {
       expect(wrapper.find(MessageContainer).length).toEqual(1)
    });

    it('+++ check Prop matches with initialState', () => {
       expect(wrapper.find(MessageComponent).prop('messages')).toEqual(initialState.messages)
    });
});