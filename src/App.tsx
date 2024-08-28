import './App.css';
import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './page/HomePage';
import EventPage from './page/EventPage/EventPage';
import RegisterPage from './page/RegisterPage/RegisterPage';
import LoginPage from './page/LoginPage';
import MyInfoModify from './page/ModifyPage/MyInfoModify';
import Apitest from './components/weather/WeatherApi';
import Attendance from './page/EventPage/attendance';
import Roulette from './page/EventPage/roulette';
import Donation from './page/DonationPage';
import DonationDetail from './page/DonationPage/DetailPage/DonationDetail';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import CartPage from './page/CartPage';
import Redirect from './page/KakaoRedirectPage/Redirect';
import ProductPage from './page/ProductPage';
import MyPage from './page/MyPage/MyPage';
import ProductUpload from './page/UploadPage/ProductUpload';
import GiftPoint from './components/giftPoint/GiftPoint';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './page/NotFoundPage/NotFound';
import LoginRoute from './routes/LoginRoute';



const Layout = () => {

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
        <Route path='giftPoint' element={<GiftPoint/>}/>
        <Route path='/404' element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
