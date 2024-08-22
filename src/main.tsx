// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserProvider from './contexts/UserProvider';
import { Provider } from 'react-redux';
import store from './store';
import GlobalModal from './components/modal/GlobalModal';
import { BrowserRouter } from 'react-router-dom'; // 추가
import ModalProvider from './contexts/ModalProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <UserProvider>
            <ModalProvider>
                <BrowserRouter> {/* 최상위에서 BrowserRouter를 감싸야 합니다. */}
                    <GlobalModal />
                    <App />
                </BrowserRouter>
            </ModalProvider>
        </UserProvider>
    </Provider>
);
