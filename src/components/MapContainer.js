import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";

const MapView = styled.div`
  width: 500px;
  height: 500px;
`;

// window 전역 객체로 들어간 kakao 객체 변수로 뽑기.
const { kakao } = window;

const MapContainer = memo(() => {
  const myMap = useRef();

  useEffect(() => {
    const container = myMap.current;
    const options = {
      center: new kakao.maps.LatLng(37.5026, 127.0249),
      level: 3,
    };
    // 지도를 렌더링할 div를 ref로 뽑아 변수에 담기

    const map = new kakao.maps.Map(container, options);

    // map에 컨트롤러 추가, 컨트롤러 위치는 오른쪽이다.
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return <MapView ref={myMap}></MapView>;
});

export default MapContainer;
