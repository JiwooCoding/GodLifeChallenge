import axios from 'axios';
import { useEffect, useState } from 'react';
import cityName from '../../city.name.json';
import './WeatherApi.scss';
import location from '../../image/location_map_icon.png';
import { formatDate } from '../../date-fns';
import cloudIcon from '../../image/cloud2.png';
import rainyIcon from '../../image/rainy.png'; 
import sunnyIcon from '../../image/sunny.png';
import { CityName, WeatherData } from '../../type/Weather';
import api from '../../api/api';
import { useUser } from '../../UserProvider';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;

const WeatherApi = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [backgroundClass, setBackgroundClass] = useState('clear');
  const [point, setPoint] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('포인트 적립');
  const [hasParticipate, setHasParticipate] = useState(false); // 참여 여부
  const [modalOpen, setModalOpen] = useState(false);
  const cityNameS = 'Seoul';

  const { user } = useUser();
  const navigate = useNavigate();
  const eventId = '7c21bfea-3160-4ddf-a00e-e9f7cbb70a68';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
      setCoords(coords);
      getWeather(coords.lat, coords.lon);
    });

    getParticipationData(eventId);
  }, []);

  const getWeather = async (lat: number, lon: number) => {
    try {
      const res = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameS}&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      setWeather(res.data);
      setError('');

      if (res.data.weather[0].description.toLowerCase().includes('rain')) {
        setBackgroundClass('rainy');
        setButtonColor('rainy');
      } else {
        setBackgroundClass('clear');
        setButtonColor('clear');
      }

      if (res.data.main.temp >= 25) {
        setButtonDisabled(false);
        setButtonText(user ? '포인트 적립' : '로그인하고 참여하기');
      } else {
        setButtonDisabled(true);
        setButtonText('조금 더 더워지면 참여해주세요😭');
      }
      console.log(res.data);

    } catch (error) {
      console.error('날씨 데이터 오류!!!', error);
      setError('날씨 데이터를 가져오는 데 문제가 발생했습니다.');
    }
  };

  const cityNameTyped = cityName as CityName;

  const getKoreanCityName = (eng: string) => {
    return cityNameTyped[eng] || eng;
  };

  const getWeatherIcons = (description: string) => {
    if (description.toLowerCase().includes('rain')) {
      return rainyIcon;
    } else if (description.toLowerCase().includes('clouds')) {
      return cloudIcon;
    } else {
      return sunnyIcon;
    }
  };

  

  const getParticipationData = async (eventId: string) => {
    try {
      const response = await api.get(`/event/checkParticipation`, { params: { eventId } });
      console.log(response.data);
      setHasParticipate(response.data);
    } catch (error) {
      console.log('데이터 받아오기 error입니다', error);
    }
  };

  const sendPointsToserver = async (eventId: string) => {
    try {
      await api.post(`/event/weather-event`, {
        points: point,
        participate: hasParticipate
      }, {
        params: { eventId },
        headers: {
          'Content-Type': 'application/json' // 수정된 부분
        }
      });
      console.log('포인트 전송 성공!');
      setModalOpen(true);
    } catch (error) {
      console.log('포인트 전송 실패', error);
    }
  };

  const handleButtonClick = () => {
    if (user) {
      if (weather && weather.main.temp >= 25 && !hasParticipate) {
        setPoint(200);
        sendPointsToserver(eventId);
        setButtonDisabled(true);
        setButtonText('내일 또 만나요🖐️');
        setHasParticipate(true);
        alert('200포인트가 적립되었습니다😊🍀🎉');
      }
    } else {
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className='page'>
      <div className={`weather-page ${backgroundClass}`}>
        {error && <p>{error}</p>}
        {weather ? (
          <div className='weather-container'>
            <div className='weather-date-location'>
              <p className='date'>{formatDate(new Date())}</p>
              <div className='location-content'>
                <img src={location} className='location' alt='location-image' />
                <p>{getKoreanCityName(weather.name)}</p>
              </div>
            </div>

            <div className='weather-condition'>
              <div className='weather-detail'>
                <img
                  src={getWeatherIcons(weather.weather[0].description)}
                  alt={weather.weather[0].description}
                  className='weather-icon'
                />
                {/* <p className='weather-des'>{weather.weather[0].description}</p> */}
              </div>
              <p className='weather-temp'>{weather.main.temp.toFixed(0)}°</p>
              {weather.main.temp >= 27 && (
                <div className='heat-warning'>
                  <p>폭염주의보</p>
                </div>
              )}
            </div>
            <button 
              className={`button ${buttonColor}`} 
              onClick={handleButtonClick}
              disabled={buttonDisabled}>
              {buttonText}
            </button>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApi;