import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserProvider from './contexts/UserProvider';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom'; // 추가
import ModalProvider from './contexts/ModalProvider';
import ToastProvider from './components/ToastProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter> {/* 최상위에 BrowserRouter를 위치시킵니다. */}
        <Provider store={store}>
            <UserProvider>
                <ModalProvider>
                    <ToastProvider/>
                    <App />
                </ModalProvider>
            </UserProvider>
        </Provider>
    </BrowserRouter>
);
