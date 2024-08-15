import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'
import {PostHogProvider} from 'posthog-js/react'

posthog.init('phc_JHXDEpCWQRLpHDZe6tMJdo4lVl62hy1P8n13cvMcqDU',{api_host:'https://us.i.posthog.com'})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
    <App />
    </PostHogProvider>
  </React.StrictMode>,
)
