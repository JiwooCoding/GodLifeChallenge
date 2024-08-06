import { Map, MapMarker } from "react-kakao-maps-sdk";


const KakoAPI = () => {
  return (
    <div>
      <Map
        center={{ lat: 37.488167, lng: 127.011576 }}
        style={{
          width: '378px',
          height: '237px',
        }}
      >
      {/* 지도에 보여줄 위치 지정 (위도,경도)  */}
      
        <MapMarker
          position={{ lat: 37.488167, lng: 127.011576 }}
        >
        {/* 핀 찍힐 위치 */}
        
          {/* <div
            style={{
              // color: '#9971ff',
              // fontSize: '19px',
              // fontWeight: '700',
              // border: '4px solid #9971ff',
              // borderRadius: '10px',
              // padding: '2.5px',
            }}
          >
            티디아이 서초사옥
          </div> */}
        </MapMarker>
      </Map>
    </div>
  );
};

export default KakoAPI;