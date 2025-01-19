import { Box, Typography } from "@mui/material"
// import img1 from '../assets/img1.png'
// import img2 from '../assets/img9.png'
import { Link } from "react-router-dom"
import { useAppSelector } from "../store/exporter"

function Home() {
  let isLoggedIn = useAppSelector(state => state.isLoggedIn)
  return (
    <Box sx={{ h: "auto", display: "flex", flexDirection: "column" }}>

      <Box sx={{ height: "80vh", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div>
          <Typography sx={{ fontSize: { lg: "4.5vw", md: "5", sm: "5.3", xs: "7.5vw" } }} fontWeight={"700"}>
            The Ultimate AI Assistant
          </Typography>
        </div>
        <Typography sx={{ maxWidth: { lg: "40%", xs: "75%" }, textAlign: "center", mt: "25px", fontSize: { lg: "1.5vw", md: "2vw", xs: "3vw" } }}>
          Create human-like conversations with the power of AI and Create custom images from a variety of styles by just a single click.
        </Typography>
        {
          isLoggedIn ? (
            <Box sx={{ display: "flex", mt: "50px", gap: "10px" }}>
              <div>
                <Link
                  className="nav-link"
                  to='/chat'
                  style={{ margin: "10px" }}
                >
                  <button style={{ color: "--clr:#0FF0FC", backgroundColor: "green", width: "150px" }}>
                    <span>Chat</span><i></i>
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  className="nav-link"
                  to='/image'
                  style={{ margin: "10px" }}
                >
                  <button style={{ color: "--clr:#0FF0FC", backgroundColor: "red", width: "280px" }}>
                    <span>Generate Image</span><i></i>
                  </button>
                </Link>
              </div>
            </Box>
          ) : (
            <Box sx={{ display: "flex", mt: "50px", gap: "25px" }}>
              <div>
                <Link
                  className="nav-link"
                  to='/login'
                  style={{ margin: "10px" }}
                >
                  <button style={{ color: "--clr:#0FF0FC", backgroundColor: "green", width: "150px" }}>
                    <span>Login</span><i></i>
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  className="nav-link"
                  to='/signup'
                  style={{ margin: "10px" }}
                >
                  <button style={{ color: "--clr:#0FF0FC", backgroundColor: "red", width: "150px" }}>
                    <span style={{ marginRight: "100px" }}>Signup</span><i></i>
                  </button>
                </Link>
              </div>
            </Box>
          )
        }

      </Box>


      {/* <Box sx={{ display: "flex", flexDirection: { lg: "row", xs: "column" }, gap: "50px", alignItems: "center", mt: { lg: "120px", xs: "90px" }, ml: { lg: "120px", xs: "20px" }, height: "auto" }}>
        <Box>
          <img src={img1} style={{ height: "auto", width: "400px" }}></img>
        </Box>
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: { lg: "flex-start", xs: "center" } }}>
          <div>
            <Typography sx={{ fontSize: { lg: "2.5vw", md: "5vw", sm: "5.3vw", xs: "6.5vw", textDecoration: "underline" }, fontWeight: "600" }}>
              The Chat GPT Experience
            </Typography>
          </div>
          <Box sx={{ direction: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Typography sx={{ maxWidth: { lg: "36vw", xs: "75vw" }, textAlign: { lg: "justify", xs: "center" }, mt: "25px", fontSize: { lg: "1.1vw", md: "1.9vw", xs: "2.5vw" } }}>
              MERN-Bot lets you have natural conversations with an AI language model.
              Whether you need help with homework, want to generate creative writing, or simply chat with a friendly AI, Chat GPT is here for you.
            </Typography>
          </Box>
        </Box>
      </Box>


      <Box sx={{ display: "flex", flexDirection: { lg: "row", xs: "column-reverse" }, justifyContent: "flex-end", gap: "50px", mb: "50px", alignItems: "center", mt: "60px", mr: { lg: "120px", xs: "-20px" }, height: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: { lg: "flex-start", xs: "center" } }}>
          <div>
            <Typography sx={{ fontSize: { lg: "2.5vw", md: "5vw", sm: "5.3vw", xs: "6.5vw", textDecoration: "underline" }, fontWeight: "600" }}>
              Image Generator
            </Typography>
          </div>
          <Box sx={{ direction: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Typography sx={{ maxWidth: { lg: "36vw", xs: "75vw" }, textAlign: { lg: "justify", xs: "center" }, mt: "25px", fontSize: { lg: "1.1vw", md: "1.9vw", xs: "2.5vw" } }}>
              Create custom images that represent interest using MERN-Bot. Choose from a variety of styles, enter your own text, and customize the colors to match your mood.
            </Typography>
          </Box>
        </Box>
        <Box>
          <img src={img2} style={{ height: "auto", width: "400px" }}></img>
        </Box>
      </Box> */}

    </Box>
  )
}

export default Home

/*
The Chat GPT Experience
Chat GPT lets you have natural conversations with an AI language model.
Whether you need help with homework, want to generate creative writing, or simply chat with a friendly AI, Chat GPT is here for you.
*/
// D:\Vs_Code\Dev\BOOTCAMP\5.REACT\MERN_GPT\frontend\src\assets