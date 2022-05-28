import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { RiZoomInLine, RiMapPin2Fill } from "react-icons/ri";
import Comment from "../components/Comment";
import Map from "../components/Map";

const SideSlice = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  z-index: 9999999;
  .hidden-icon {
    width: 30px;
    position: absolute;
    background-color: #0280e0;
  }
  .SliceIcon {
    background-color: #0280e0;
    width: 30px;
    height: 100hv;
  }
`;
const MainSideBar = styled.div`
  height: 100%;
  z-index: 99;
  position: absolute;
  top: 0;
  left: -270px;
  transition: all 0.4s;
  &.OnSide {
    margin-left: 30px;
    left: 0px;
    transition: all 0.4s;
  }
  .backgroundBox {
    position: relative;
    width: 300px;
    height: 100%;
    background-color: #fff;
    .header {
      margin: auto;
      padding: 0;
      position: absolute;
      top: 0px;
      width: 300px;
      height: 100px;
      background-color: #0280e0;
      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .location {
          font-size: 7px;
          color: #eee;
          padding-right: 20px;
          margin-right: 20px;
          letter-spacing: -1px;
        }
        .icon-left {
          img {
            width: 30px;
            height: 30px;
            padding: 10px;
            margin-left: 24px;
          }
        }
      }
      .search-section {
        display: flex;
        margin: auto;
        width: 240px;
        .search-input {
          margin-left: 10px;
          width: 180px;
          border: none;
          padding: 8px 8px;
        }
        .search-btn {
          color: gray;
          font-size: 20px;
          padding: 3px 5px 3px 0;
          background-color: white;
        }
      }
    }

    .mainContainer {
      width: 300px;
      height: 100hv;
      background-color: white;
      position: relative;
      top: 99px;
      display: flex;
      flex-direction: column;

      .searchForm {
        padding: 20px 0;
        display: flex;
        justify-content: space-evenly;

        input {
          padding: 7px 1px;
        }
        button {
          border: none;
          padding: 8px;
          font-size: 12px;
          background-color: #0280e0;
          color: #f0f8ff;
          font-weight: bold;
          &:hover {
            background-color: white;
            color: #0280e0;
          }
        }
      }
    }
  }
`;

const MapContainer = () => {
  // 사이드바 오픈을 위한 useState
  const [isOpen, setIsOpen] = useState(+true);
  const ClickBtn = useCallback((e) => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  //아이콘 클릭시 채워짐
  const [iconLight, setIconLight] = useState(+true);
  const CheckBtn = useCallback((e) => {
    setIconLight((iconLight) => !iconLight);
  }, [])

    const [inputText, setInputText] = useState('')
    const [place, setPlace] = useState('')
  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setPlace(inputText)
      setInputText('')
    }
  

  return (
    <>
      {/* <img className='hidden-icon'  src={isOpen ? isOpen :require('../asset/img/right')
     require('../asset/img/left')} alt='click' onClick={ClickBtn}/> */}
      <SideSlice>
        <img
          className="hidden-icon"
          src={
            isOpen
              ? require("../asset/img/right.png")
              : require("../asset/img/left.png")
          }
          alt="click"
          onClick={ClickBtn}
        />
        <div className="SliceIcon"></div>
      </SideSlice>

      <MainSideBar className={isOpen && "OnSide"}>
        <div className="backgroundBox">
          <div className="header">
            <div className="header-container">
              <div className="icon-left">
                <img
                  className="image"
                  src={require("../asset/img/menu.png")}
                  alt="icon"
                />
              </div>
              <div className="location">
                <RiMapPin2Fill />현 지도 내 장소 검색
              </div>
            </div>
            <form className="search-section" onSubmit={handleSubmit}>
                <input className="search-input" onChange={onChange} value={inputText}/>
              <button className="search-btn" type="submit">
                <RiZoomInLine />
              </button>
            </form>
            <Map searchPlace={place} />
          </div>
          <div className="mainContainer">                                            
                <img
                  width={20}
                  src={
                    iconLight
                      ? require("../asset/img/star.png")
                      : require("../asset/img/star-full.png")
                  }
                  alt="click"
                  onClick={CheckBtn}
                />
          </div>
        </div>
      </MainSideBar>
      <Map/>
    </>
  )
}
export default MapContainer;
