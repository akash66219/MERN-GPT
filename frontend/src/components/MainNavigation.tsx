import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Box } from '@mui/material'

const MainNavigation = () => {
  return (
    <Box sx={{display:"flex", flexDirection:"column", height:"100vh"}}>
        <Header />
        <Outlet />
    </Box>
  )
}

export default MainNavigation
