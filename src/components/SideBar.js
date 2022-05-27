import React,{useState,useCallback} from 'react';
import styled from 'styled-components';
import { RiZoomInLine,RiMapPin2Fill} from "react-icons/ri";

const MainSideBar = styled.div`
      position: relative;
      width: 300px;
      height: 100hv;
      background: #fff;
      box-sizing: border-box;
      transform: translate(0,-180%);
      opacity: 0;
      &.OnSide {
      opacity: 1;
      transform: translate(0,0);
      transition: opacity 0.4s ease-in-out;
      }

  .header{
    margin: auto;
    padding: 0;
    position: absolute;
    top: 0px;
    width: 300px;
    height: 100px;
    background-color: #0280e0;

      .header-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
      .location{
        font-size: 7px;
        color: #eee;
        padding-right:20px;
        margin-right: 20px;
        letter-spacing: -1px;
      }
      .icon-left {
        img{
          width: 30px;
          height: 30px;
          padding: 10px;
          margin-left: 24px;
        }
      }
    }
    .search-section{
      display: flex;
      margin: auto;
      width: 240px;
        .search-input{
          margin-left: 10px;
          width: 180px;
          border: none;
          padding: 5px 8px;
      }
      .search-btn{
        color: gray;
        font-size: 20px;
        padding: 3px 5px 3px 0;
        background-color: white;
      }
  }
  }

  .mainContainer{
    width: 300px;
    height: 100%;
    background-color: #F0F8FF;
    position: absolute;
    top: 0;
  }

  .footer{
    position: absolute;
    font-size: 2px;
    background-color: #eee;
    width: 300px;
    padding: 4px;
    box-sizing: border-box;
    ul{
      display: flex;
      justify-content: space-evenly;
      color: gray;
    }
  }

`;


const SideBar = () => {
// 사이드바 오픈을 위한 useState 
  const [isOpen, setIsOpen] = useState(true);
  const ClickBtn = useCallback((e)=>{
    setIsOpen(isOpen => !isOpen);},
  [isOpen])

  return (
    <>
    <img className='hidden-icon'  src={isOpen ? isOpen :
     require('../asset/img/square-blue.png')} alt='click' onClick={ClickBtn}/>

      <MainSideBar className={isOpen ? ('OnSide'):('')}>
          <div  className='header'>
                <div className='header-container'>
                <div className='icon-left'><img  className='image' src={require("../asset/img/menu.png")}  alt='icon'/></div>
                <div className='location'><RiMapPin2Fill/>현 지도 내 장소 검색</div>
                </div>
                <div className='search-section'>
                <input className='search-input' />
                <div className='search-btn'><RiZoomInLine/></div>
                </div>
          </div>
          <div className='mainContainer'>
            <form className="searchForm">
            <div className='searchList'>
            <select name="sort">
                <option>정확도순</option>
                <option>거리순</option>
            </select>
                <input type="text" className="query" placeholder="Search" />
                <button type="submit">검색</button>
            </div>
            </form>
        </div>
      
    <div className='footer'>
      <ul>
        <li>고객센터</li>
        <li>지도 정보 수정</li>
        <li>신규 장소 등록</li>
        s
      </ul>
    </div>
    </MainSideBar> 
    </>
  )
}

export default SideBar;