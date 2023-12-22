import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="441571372848-k9nn43i3nqp3521ok8i92epo3bp1ceba.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </Provider>
)
