import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";

const MapView = styled.div`
  width: 100vw;
  height: 720PX;
  position: absolute;
  top: 0;
  right: 0;
`;

// window 전역 객체로 들어간 kakao 객체 변수로 뽑기.
const { kakao } = window;

const MapContainer = memo(() => {
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
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return (
    <>
      <MapView ref={myMap}>
      </MapView>
    </>
  );
});

export default MapContainer;
