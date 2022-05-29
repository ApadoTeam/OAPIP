import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getMapInfo } from '../Slices/MapSlice';
import searchIcon from '../asset/img/ico_search.png';
import Spinner from './Spinner';

import ryan from '../asset/img/ryan.png';

const SideBarCss = styled.div`
  width: 25vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

const ErrorMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 10%;

  img {
    width: 15vw;
  }

  p {
    font-size: 1.2vw;
    font-weight: bold;
  }
`;

const SideBar = memo(({ button }) => {

  const side = useRef();
  // const { toggle } = useSelector((state) => state.map);

  // useEffect(() => {
  //   toggle === +false ? (side.current.style.width = '0') : (side.current.style.width = '25vw');
  // }, [toggle]);

  

  const { meta, documents, loading, error } = useSelector((state) => state.map);

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

      {button && <SideBarCss ref={side}>
        <div className="menuArea">
          <form className="form">
            <input type="text" name="search" placeholder="키워드로 검색" value={inputValue} onChange={onChange} />
            <button type="submit" onClick={onClick} />
          </form>
        </div>

        {error ? (
          <ErrorMessage>
            <img src={ryan} alt='ryan' />
            <p>검색할 키워드를 입력해주세요</p>
          </ErrorMessage>
        ) : documents ? (
          documents.map((v,i) => {
            return (
              <ul key={v.id} style={{borderBottom: '1px solid #000', lineHeight: '1.5'}}>
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
      </SideBarCss>}
    </div>
  );
});

export default SideBar;
