import './App.css';
import { Outlet, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import NotFound from './page/NotFoundPage/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginRoute from './routes/LoginRoute'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChallengeUploadPage from './page/ChallengeUploadPage';
import ChallengePage from './page/ChallengePage';
import ChallengeDetailPage from './page/ChallengeDetailPage';
import AppliedDetailPage from './page/AppliedChallengeDetailPage';
import ManageChallengePage from './page/ManageChallengePage/ManageAuthImage';
import AuthDetailPage from './page/AppliedChallengeDetailPage/authDetailPage/AuthDetailPage';


const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
  const navigate = useNavigate();

  const hideFabPath = ['/login', '/register', '/kakaoauth', '/404','/challenge-upload', '/challenge/:challengeId'];
  const shouldHideFab = hideFabPath.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
      {/* Floating Icon */}
      {!shouldHideFab && (
        <Fab 
          color="primary" 
          aria-label="add" 
          className="floating-icon" 
          onClick={()=>navigate('/challenge-upload')}>
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path='/event' element={<EventPage />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/roulette' element={<Roulette />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/productUpload' element={<ProductUpload />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/modify' element={<MyInfoModify />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/giftPoint' element={<GiftPoint />} />
          <Route path='/test' element={<Apitest />} />
          <Route path='/donation' element={<Donation />} />
          <Route path='/donation-detail' element={<DonationDetail />} />
          <Route path='/challenge-upload' element={<ChallengeUploadPage/>}/>
          <Route path='/challenge' element={<ChallengePage/>}/>
          <Route path='/challenge/:challengeId' element={<ChallengeDetailPage/>}/>
          <Route path='/challenge/detail/:userChallengeId' element={<AppliedDetailPage/>}/>
          <Route path='/challengeAuthDetail' element={<AuthDetailPage/>}/>
          {/* path변경해야함! */}
          <Route path='/managePage/:challengeId' element={<ManageChallengePage/>}/>
        </Route>

        <Route path='/login' element={<LoginRoute><LoginPage /></LoginRoute>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/kakaoauth' element={<Redirect />} />
        <Route path='/404' element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
