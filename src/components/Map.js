import React, { memo } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { toggleBtn } from '../Slices/MapSlice';
import arrowL from '../asset/img/left.png';
import arrowR from '../asset/img/right.png';

const MapCss = styled.div`
  display: flex;
  flex-direction: row;
  .map {
    width: 100vw;
    height: 100vh;
    background-color: gray;
    display: flex;
    flex-direction: row;
    .sideBtn {
      display: block;
      width: 25px;
      height: 75px;
      background-color: #0280e0;
      margin: auto 0;
      justify-self: center;
      border: 1px solid #0280e0;
      border-left: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      .left {
        display: block;
        background: url(${arrowL}) no-repeat;
        background-size: 25px 40px;
        background-position: -7px;
        text-indent: -99999px;
      }
      .false {
        display: block;
        width: 20px;
        height: 20px;
        background: url(${arrowR}) no-repeat;
        background-size: 20px 20px;
        margin: 0 auto;
        text-indent: -99999px;
      }
    }
  }
`;

// window 전역 객체로 들어간 kakao 객체 변수로 뽑기.
  // const { kakao } = window;
const Map = memo(() => {
  // const myMap = useRef();
  // useEffect(() => {
  //   // 지도를 렌더링할 영역을 ref로 뽑아 변수에 담기
  //   const container = myMap.current;
  //   // 지도 생성 시 옵션 (위치, 지도 확대 레벨)
  //   const options = {
  //     center: new kakao.maps.LatLng(37.5026, 127.0249),
  //     level: 3,
  //     tileAnimation: true,
  //   };
  //   const map = new kakao.maps.Map(container, options);
  //   // map에 컨트롤러 추가, 컨트롤러 위치는 오른쪽이다.
  //   const zoomControl = new kakao.maps.ZoomControl();
  //   map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  //   console.log(container.width);
  // }, []);

  const { toggle } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  return (
      <MapCss>
        <SideBar />
        <div className="map">
          <button className='sideBtn' onClick={(e) => { dispatch(toggleBtn(+false))}}>
          {toggle ? <span className="left">left</span> : <span className="left">right</span>}
          </button>
        </div>
      </MapCss>
  );
});

export default Map;
