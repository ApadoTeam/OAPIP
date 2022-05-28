import React, { memo, useEffect, useState, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import { getMapInfo } from '../Slices/MapSlice';

const Local = () => {

  const { meta, documents, loading, error } = useSelector(state => state.map);
  console.log(documents)

  const dispatch = useDispatch();

  // input 입력 상태 값
  const [inputValue, setInputValue] = useState('');

  // 검색할 값 저장
  const [searchValue, setSearchValue] = useState('');

  // input 입력값 가져온다
  const onChange = useCallback(e => {
    setInputValue(inputValue => e.target.value);
  }, [])
  
  // 
  const onClick = useCallback(e => {
    e.preventDefault();

    setSearchValue(search => inputValue);
    setInputValue('')
  }, [inputValue]); 

  useEffect(() => {
    dispatch(getMapInfo({
      query: searchValue,
      analyze_type: 'similar',
      page: 1,
      size: 10,
    }))
  }, [dispatch, searchValue])

  return (
    <div>
      <form>
        <input type='text' name='search' placeholder='찾기' value={inputValue} onChange={onChange} />
        <button type='submit' onClick={onClick}>검색</button>
      </form>
    </div>
  );
};

export default memo(Local);

