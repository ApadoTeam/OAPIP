import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBtn } from '../Slices/MapSlice';
import arrowL from '../asset/img/left.png';
import arrowR from '../asset/img/right.png';

const MapCss = styled.div`
  display: flex;
  flex-direction: row;

  .map {
    width: 75vw;
    height: 100vh;
    background-color: gray;
    display: flex;
    flex-direction: row;

    @media (min-width: 1600px) {
      width: 100%;
    }

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
      cursor: pointer;
      z-index: 99;

      .left {
        display: block;
        background: url(${arrowL}) no-repeat;
        background-size: 25px 40px;
        background-position: -7px;
        text-indent: -99999px;
      }
      .right {
        display: block;
        background: url(${arrowR}) no-repeat;
        background-size: 25px 40px;
        background-position: -7px;
        text-indent: -99999px;
      }
    }
  }
`;
const { kakao } = window;

const Map = () => {

  // 토글 기능
  const { toggle } = useSelector((state) => state.map);

  const dispatch = useDispatch();

  const myMap = useRef();

  useEffect(() => {
    // 지도를 렌더링할 영역을 ref로 뽑아 변수에 담기
    const container = myMap.current;

    // 지도 생성 시 옵션 (위치, 지도 확대 레벨)
    const options = {
      center: new kakao.maps.LatLng(37.5026, 127.0249),
      level: 3,
      tileAnimation: true,
    };

    const map = new kakao.maps.Map(container, options);

    // map에 컨트롤러 추가, 컨트롤러 위치는 오른쪽이다.
    const zoomControl = new kakao.maps.ZoomControl();

    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    // 지형도? 쓸일 없을 듯
    // map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN); 

    if(toggle === 0) {
      map.relayout();
    }

  }, [toggle]);

  return (
    <div>
      <MapCss>
        <SideBar />

        <div className="map" ref={myMap}>
          <button className="sideBtn" onClick={(e) => {
            dispatch(toggleBtn(+false));
          }}>
            {toggle ?  <span className="left">left</span> : <span className="right">right</span>}
          </button>
        </div>
      </MapCss>
    </div>
  );
};

export default memo(Map);