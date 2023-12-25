import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App, ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import appTheme from './styles/antd-app-theme'
import store from './store'
import MyApp from './App'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="1074910607418-t4vn3d08rknqmvtednikl8jm70er0jpf.apps.googleusercontent.com">
      <BrowserRouter>
        <ConfigProvider theme={appTheme}>
          <App>
            <MyApp />
          </App>
        </ConfigProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
)
