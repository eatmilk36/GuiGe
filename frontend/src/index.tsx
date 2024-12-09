import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AxiosProvider from './components/AxiosProvider';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas); // 將 fas (free-solid-svg-icons) 添加到圖標庫

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AxiosProvider>
                <App />
            </AxiosProvider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
