/**
 * @file: Map.js
 * @description: 카카오맵 기능 구현
 * @author: 박찬우, 천경재
 */

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
// import { toggleBtn } from '../Slices/MapSlice';
import arrowL from "../asset/img/left.png";
import arrowR from "../asset/img/right.png";

const MapCss = styled.div`
  display: flex;
  flex-direction: row;

  .map {
    width: 100%;
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
    .moveMapBtn {
      width: 100px;
      height: 100px;
      background-color: #0280e0;
      z-index: 99;
    }
  }
`;
const { kakao } = window;

const Map = () => {
  const { documents } = useSelector((state) => state.map);

  // 지도를 생성할 영역
  const myMap = useRef();

  // 버튼 토글
  const [button, setButton] = useState(true);

  // 버튼 클릭시 boolean 값 변경
  const onClick = useCallback((e) => {
    setButton((button) => !button);
  }, []);

  // 자식 컴포넌트인 side에서 받아올 위치 state
  const [loc, setLoc] = useState();

  // 자식 컴포넌트에서 값을 전달 받기 위해 내려보낼 함수
  const maps = (location) => {
    setLoc(location);
  };

  useEffect(() => {
    // 지도를 렌더링할 영역을 ref로 뽑아 변수에 담기
    const container = myMap.current;

    // 처음 지도가 생설될 중심 좌표 (이젠 강남점)
    const dft = new kakao.maps.LatLng(37.5026, 127.0249);

    // 지도 생성 옵션 (위치, 지도 확대 레벨, 키보드로 확대(+)와 축소(-))
    const options = {
      center: dft,
      level: 4,
      keyboardShortcuts: true,
      MaxLevel: 10,
    };
    // 지도 생성
    var map = new kakao.maps.Map(container, options);

    // 지도에 컨트롤러 추가
    const zoomControl = new kakao.maps.ZoomControl();

    // 컨트롤러 위치 왼쪽 상단 지정
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    // 지도상 표시될 커서 스타일 변경
    map.setCursor("move");

    // 검색 시 키워드와 일치하는 장소에 마커 생성
    documents &&
      documents.map(({ x, y }) => {
        return new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(y, x),
        });
      });

    // 검색 시 검색한 위치로 지도 범위 재설정(이동)
    if (documents) {
      documents.forEach(({ y, x }) => {
        let bounds = new kakao.maps.LatLngBounds();
        map.setBounds(bounds.extend(new kakao.maps.LatLng(y, x)));
      });
    }
    // 검색된 목록 클릭 시 위치 이동
    if (loc) {
      let locBounds = new kakao.maps.LatLngBounds();
      let locLatLng = new kakao.maps.LatLng(loc[0], loc[1]);
      locBounds.extend(locLatLng);
      map.setBounds(locBounds);
      map.panTo(locLatLng);
    }

    // 사이드바 토글 시 화면 지도 재출력
    if (button === false) map.relayout();
  }, [button, documents, loc]);

  return (
    <div>
      <MapCss>
        <SideBar button={button} maps={maps} />
        <div className="map" ref={myMap}>
          <button className="sideBtn" onClick={onClick}>
            {/* 사이드바 버튼 클릭 시 이미지 토글 */}
            {button && button ? (
              <span className="left">left</span>
            ) : (
              <span className="right">right</span>
            )}
          </button>
        </div>
      </MapCss>
    </div>
  );
};

export default memo(Map);
