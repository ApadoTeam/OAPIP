import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getMapInfo } from '../Slices/MapSlice';
// import { useQueryString } from '../hooks/useQueryString';
import searchIcon from '../asset/img/ico_search.png';
import Spinner from './Spinner';

const SideBarCss = styled.div`
  width: 25vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* transition: all .3s; */
  border-right: 1px solid #04c1de;
  overflow: scroll;

  .menuArea {
    width: 100%;
    min-height: 20vh;
    background-color: #0280e0;
    display: flex;
    border-bottom: 1px solid #04c1de;
    .form {
      width: 80%;
      height: 46px;
      display: flex;
      margin: auto auto;
      background-color: white;
      border-radius: 5px;
      input {
        width: 100%;
        height: 36px;
        outline: none;
        padding-left: 15px;
        font-size: 15px;
        margin: auto auto;
      }
      button {
        width: 36px;
        height: 36px;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        color: #333;
        background: url(${searchIcon}) no-repeat;
        background-position: -2px -118px;
        margin: auto auto;
        border: 0;
        &:hover {
          background-position: -42px -118px;
        }
      }
    }
  }
  .listArea {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .list {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: aliceblue;
      border-top: 1px solid #ccc;
      &:first-child {
        border-top: 0;
      }
    }
  }
`;

const SideBar = memo(() => {
  /*************************
   * 불필요 하다고 생각된 부분은 주석처리 했습니다
   *************************/

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 기존 작업
  const side = useRef();
  const { toggle } = useSelector((state) => state.map);

  /**
  const qs = useQueryString();
  console.log(qs);
  const query = qs.query;
  /*/
  // const { query } = useQueryString();
  /**/

  useEffect(() => {
    toggle === +false ? (side.current.style.width = '0') : (side.current.style.width = '25vw');
  }, [toggle]);

  // const onSearch = React.useCallback((e) => {
  //   e.preventDefault();
  //   console.log('검색 누름');
  // }, []);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 기존 작업 끝

  

  const { meta, same_name, documents, loading, error } = useSelector((state) => state.map);
  console.log(documents)

  const dispatch = useDispatch();

  // input 입력 상태 값
  const [inputValue, setInputValue] = useState('');

  // 검색할 값 저장
  const [searchValue, setSearchValue] = useState('');

  // input 입력값 가져온다
  const onChange = useCallback((e) => {
    setInputValue((inputValue) => e.target.value);
  }, []);

  // 검색 버튼 클릭시 searchValue에 값 저장, inputValue는 초기화
  const onClick = useCallback(
    (e) => {
      e.preventDefault();

      setSearchValue((searchValue) => inputValue);
      setInputValue('');
    },
    [inputValue]
  );

  useEffect(() => {
    dispatch(
      getMapInfo({
        query: searchValue,
        page: 1,
        size: 10,
      })
    );
  }, [dispatch, searchValue]);

  return (
    <div>
      <Spinner visible={loading} />

      <SideBarCss ref={side}>
        <div className="menuArea">
          {/* 기존작업 */}
          {/* <form onSubmit={onSearch} className='form'>
          <input type='search' name='query' defaultValue={query} placeholder="검색어를 입력 해주세요." />
          <button type='submit'></button>
        </form> */}

          <form className="form">
            <input type="text" name="search" placeholder="키워드로 검색" value={inputValue} onChange={onChange} />
            <button type="submit" onClick={onClick} />
          </form>
        </div>

        {error ? (
          <p>검색할 키워드를 입력해주세요 ^_^</p>
        ) : (
          documents &&
          documents.map((v,i) => {
            return (
              <ul key={v.id} style={{borderBottom: '1px solid #000', lineHeight: '1.5'}}>
                <li>{v.id}</li>
                <li>{v.place_name}</li>
                {/* <li>{v.category_group_name}</li> */}
                <li>{v.category_name}</li>
                <li>{v.phone}</li>
                {/* <li>{v.place_url}</li> */}
                <li>{v.road_address_name}</li>
              </ul>
            );
          })
        )}
      </SideBarCss>
    </div>
  );
});

export default SideBar;
