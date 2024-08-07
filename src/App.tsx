// App.tsx
import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import ProductPage from './page/ProductPage/ProductPage';
import HomePage from './page/HomePage';
import EventPage from './page/EventPage/EventPage';
import RegisterPage from './page/RegisterPage';
import ProductUpload from './page/UploadPage';
import LoginPage from './page/LoginPage';
import MyPage from './page/MyPage';
import MyInfoModify from './page/MyPage/modify-myInfo/MyInfoModify';
import Apitest from './components/weather/WeatherApi';
import Attendance from './page/EventPage/attendance';
import Roulette from './page/EventPage/roulette';
import Donation from './page/DonationPage';
import DonationDetail from './page/DonationPage/DetailPage/DonationDetail';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import CartPage from './page/CartPage';
import Redirect from './page/KakaoRedirectPage/Redirect';

const Layout = () => {
  // Layout 컴포넌트 내에서 useNavigate를 사용하기 위해 라우터의 컨텍스트가 필요합니다.

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='event' element={<EventPage />} />
        <Route path='attendance' element={<Attendance />} />
        <Route path='roulette' element={<Roulette />} />
        <Route path='product' element={<ProductPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='productUpload' element={<ProductUpload />} />
        <Route path='mypage' element={<MyPage />} />
        <Route path='modify' element={<MyInfoModify />} />
        <Route path='test' element={<Apitest />} />
        <Route path='donation' element={<Donation />} />
        <Route path='donation-detail' element={<DonationDetail />} />
        <Route path='cart' element={<CartPage/>}/>
        <Route path='kakaoauth' element={<Redirect/>}/>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
