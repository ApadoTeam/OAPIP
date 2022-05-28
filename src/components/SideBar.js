import React, { memo } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { useQueryString } from "../hooks/useQueryString";
import searchIcon from '../asset/img/ico_search.png'; 

const SideBarCss = styled.div`
  width: 25vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  border-right: 1px solid #04c1de;
  .menuArea {
    width: 100%;
    height: 20vh;
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

  const side = React.useRef();
  const { toggle } = useSelector((state) => state.map);

  /**
  const qs = useQueryString();
  console.log(qs);
  const query = qs.query;
  /*/
  const { query } = useQueryString();
  /**/

  React.useEffect(() => {
    toggle === +false ? (side.current.style.width = '0') : (side.current.style.width = '25vw')
  }, [toggle]);

  const onSearch = React.useCallback((e) => {
    e.preventDefault();
    console.log("검색 누름");
  }, []);

  return (
    <SideBarCss ref={side}>
      <div className="menuArea">
        <form onSubmit={onSearch} className='form'>
          <input type='search' name='query' defaultValue={query} placeholder="검색어를 입력 해주세요." />
          <button type='submit'></button>
        </form>
      </div>
      <ul className="listArea">
        <li className="list"></li>
        <li className="list"></li>
        <li className="list"></li>
      </ul>
    </SideBarCss>
  );
});

export default SideBar;
