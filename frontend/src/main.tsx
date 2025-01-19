import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import store from './store/store'
import { Toaster } from 'sonner'

let theme = createTheme({
    typography:{
      fontFamily : "Roboto Slab,serif",
        allVariants : {
            color : 'white'
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}> 
      <Toaster richColors/>
        <App />
      </ThemeProvider>
    </Provider> 
  </React.StrictMode>,
)
