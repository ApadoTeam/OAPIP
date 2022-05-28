import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MapView = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
`;
const MapMarker= styled.div`

`;

// window 전역 객체로 들어간 kakao 객체 변수로 뽑기.
const { kakao } = window;

const Map = memo(() => {
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

  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch("이태원 맛집", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          })
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map])

  return (
  <>
  <MapView ref={myMap}></MapView>
  {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
  </>
  )
})
export default Map;
