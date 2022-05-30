/**
 * @file: Sidebar.js
 * @description: 카카오로컬 APi활용 검색 시 정보 구현
 * @author: 박찬우, 천경재
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getMapInfo } from '../Slices/MapSlice';
import searchIcon from '../asset/img/ico_search.png';
import moveloc from '../asset/img/moveloc.png';
import moveloc2 from '../asset/img/moveloc2.png';
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
      font-size: 1.7vw;
      font-weight: bold;
      text-align: center;
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
      background-color: white;
      border-top: 1px solid black;
      transition: .2s ease-in-out;
      &:hover {
          background-color: #0280e011;
          cursor: pointer;
        }
      li {
        line-height: 30px;
        color: #555;
        padding-left: 15px;
        z-index: 99;
        margin-bottom: 15px;
        &:nth-child(1) {
          font-size: 1vw;
          background: url(${moveloc}) no-repeat;
          background-size: 100% 100%;
          text-indent: -9999px;
          padding-left: 0;
          display:flex;
          flex-direction: row;
          span {
            width: 100%;
          }
          &:hover {
            background: url(${moveloc2}) no-repeat;
          background-size: 100% 100%;
          }
        }
        &:nth-child(2) {
          font-size: 1.1vw;
          font-weight: bold;
          color: #222;
          
        }
        &:nth-child(3) {
          font-size: .8vw;
          color: #999;
        }
        &:nth-child(4) {
          font-size: .7vw;
          color: #499970;
        }
        &:nth-child(5) {
          font-size: .9vw;
          color: #666;
        }
        
      }
    }
  }
`;

const SideBar = memo(({ button, maps }) => {

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

  // 클릭 시 Map.js로 값 전달
  const selectMove =(e) => {
    let location = e.target.innerText.split(',');
    maps(location);
  };

  // 디스패치
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
              <p><strong>검색할 키워드를<br/>입력해주세요.</strong></p>
            </div>
          ) : documents ? (
            documents.map((v,i) => {
              return (
                <ul key={v.id} onClick={selectMove}>
                  <li>
                    {v.y},{v.x}
                  </li>
                  <li>{v.place_name}</li>
                  <li>{v.category_name}</li>
                  <li>{v.phone}</li>
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
