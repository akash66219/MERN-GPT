import { ActionFunction, Form, Link, useActionData, useNavigate, useNavigation } from "react-router-dom"
import Animation from "../components/Animation"
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "../store/exporter";
import { useEffect, useRef } from "react";
import { userActions } from "../store/store";
import { toast } from "sonner";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

function Login() {
  let actionResponse: any = useActionData();
  let dispatch = useAppDispatch();
  let isLoggedIn = useAppSelector(state => state.isLoggedIn);
  const navigate = useNavigate();
  const navigation = useNavigation();
  let isSubmitting = navigation.state === 'submitting'
  let theme = useTheme()
  const isScreenSizeGreaterThanMd = useMediaQuery(theme.breakpoints.up('md'));
 
  // Use useRef to store the previous state of isLoggedIn
  const prevIsLoggedInRef = useRef(isLoggedIn);
 
  useEffect(() => {
     // Update the ref with the current isLoggedIn value
     prevIsLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);
 
  useEffect(() => {
     if (actionResponse && actionResponse.status === 201 && !isLoggedIn) {
       let userData = actionResponse.data.user;
       dispatch(userActions.login({ name: userData.name, email: userData.email, chats: userData.chats }));
       console.log(userData);
       toast.success("Login Successful");
       navigate('/chat');
       return;
     } else if (actionResponse?.status !== 201 && (actionResponse && actionResponse.data.msg) || (actionResponse && actionResponse.data.error) && !isLoggedIn) {
       console.log(actionResponse);
       toast.error('Invalid credentials! Please retry....');
     } else if (isLoggedIn && prevIsLoggedInRef.current !== isLoggedIn) {
       toast.info('You are already logged in');
       navigate('/chat');
       return;
     }
  }, [isLoggedIn, actionResponse, navigate, prevIsLoggedInRef]);
 
  return (
    <>
      {isSubmitting && <Box sx={{position:"absolute",top:"0px", left:"0px", right:"0px", bottom:"0px"}}><LinearProgress /></Box>}
    <div className="container">
      {isScreenSizeGreaterThanMd && 
        <div>
          <Animation />
        </div>
      }
      <div className="login-box">
        <h2 className="heading-login-box">Login</h2>
        <Form method="POST"> 
          <div className="user-box">
            <input className="user-box-input" name='email' autoComplete="off" type="text" required />
            <label className="user-box-label">Email</label>
          </div>
          <div className="user-box">
            <input className="user-box-input" name="password" type="password" required />
            <label className="user-box-label">Password</label>
          </div>
          {actionResponse?.data?.msg && <p style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{actionResponse.data.msg}</p>}
          {actionResponse?.data?.error?.map((err: any) => <p key={err.msg} style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{err.msg}</p>)}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a className="login-box-button">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <input type="submit" style={{
                border: 'none',
                background: 'none',
                color: 'inherit',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
                width: "100px",
                height: "30px",
                margin: "0px",
              }} value={isSubmitting ? "Submitting..." : "Login"} />
            </a>
          </div>
        </Form>
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <p>Account not created yet ?</p>
          <Link to='../signup' className='no-dec' style={{ background: 'none' }}>Signup here</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login

let loginAction: ActionFunction = async ({ request }) => {
  let userData = await request.formData()
  let user = {
    name: userData.get('name'),
    email: userData.get('email'),
    password: userData.get('password')
  }

  try {
    // let response: AxiosResponse = await axios.post('http://localhost:8080/user/login', user, { withCredentials: true })
    let response: AxiosResponse = await axios.post('https://mern-gpt-2.onrender.com/user/login', user, { withCredentials: true })
    return response
  } catch (err: any) {
    return err.response
  }
};

export { loginAction }

