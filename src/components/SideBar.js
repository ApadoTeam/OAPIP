import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getMapInfo } from '../Slices/MapSlice';
import searchIcon from '../asset/img/ico_search.png';
import Spinner from './Spinner';

import ryan from '../asset/img/ryan.png';

const SideBarCss = styled.div`
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #04c1de;
  overflow: scroll;

  .menuArea {
    width: 100%;
    min-height: 15vh;
    background-color: #0280e0;
    display: flex;
    border-bottom: 1px solid #04c1de;
    position: sticky;
    top: 0%;
    .form {
      width: 80%;
      height: 50px;
      display: flex;
      margin: auto auto;
      background-color: white;
      border-radius: 5px;
      input {
        width: 85%;
        height: 36px;
        outline: none;
        padding-left: 20px;
        font-size: 18px;
        margin: auto 0;
      }
      button {
        width: 46px;
        height: 46px;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        color: #333;
        background: url(${searchIcon}) no-repeat;
        background-position: 7px -114px;
        margin: auto auto;
        border: 0;
        &:hover {
          background-position: -33px -114px;
        }
      }
    }
  }
  .errorArea {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 15%;
    .ryan {
      width: 10vw;
    }
    p {
      font-size: 1.2vw;
      font-weight: bold;
    }
  }

  .listArea {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    ul {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: aliceblue;
      border-top: 1px solid #ccc;
      padding-left: 15px;
      &:first-child {
        border-top: 0;
      }
      li {
        line-height: 30px;
      }
    }
  }
`;

const SideBar = memo(({ button }) => {

  const { documents, loading, error } = useSelector((state) => state.map);

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
        size: 15,
      })
    );
  }, [dispatch, searchValue]);

  return (
    <div>
      <Spinner visible={loading} />

      {button && <SideBarCss>
        <div className="menuArea">
          <form className="form">
            <input type="text" name="search" placeholder="키워드로 검색" value={inputValue} onChange={onChange} />
            <button type="submit" onClick={onClick} />
          </form>
        </div>
        <div className='listArea'>
        {error ? (
          <div className='errorArea'>
            <img src={ryan} alt='ryan' className='ryan' />
            <p><strong>검색할 키워드를 입력해주세요</strong></p>
          </div>
        ) : documents ? (
          documents.map((v,i) => {
            return (
              <ul key={v.id}>
                {/* <li>{v.id}</li> */}
                <li>{v.place_name}</li>
                {/* <li>{v.category_group_name}</li> */}
                <li>{v.category_name}</li>
                <li>{v.phone}</li>
                {/* <li>{v.place_url}</li> */}
                <li>{v.road_address_name}</li>
              </ul>
            );
          })
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
        </div>
      </SideBarCss>}
    </div>
  );
});

export default SideBar;
