import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ailogo from '../assets/ailogo.png'

const Logo = () => {
    return (
        <Link to='/' style={{ textDecoration: "none" }}>
            <div className='logo'>
                <div style={{ marginTop: "12px" }}>
                    <img className='logo-img' src={ailogo} height={"75px"} alt="AI logo" />
                </div>
                <div>
                    <Typography sx={{
                        ml: "8px",
                        display: {
                            md: "block",
                            xs: "none",
                            fontWeight: "800",
                            textShadow: "2px 2px 20px #000",
                            fontSize : 23,
                        },
                        pt:1
                    }}>
                        <span>MERN</span>-Bot</Typography>

                </div>
            </div>
        </Link>
    )
}

export default Logo
