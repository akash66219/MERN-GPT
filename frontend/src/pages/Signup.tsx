import { Form, Link, useNavigation } from "react-router-dom"
import type { ActionFunction } from "react-router";
import Animation from "../components/Animation";
import axios, { AxiosResponse } from "axios";
import { useActionData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/exporter";
import { userActions } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { LinearProgress, useMediaQuery, useTheme } from "@mui/material";

function Signup() {

  let actionResponse: any = useActionData();
  let dispatch = useAppDispatch();
  let isLoggedIn = useAppSelector(state => state.isLoggedIn);
  let navigate = useNavigate();
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
       toast.success("Signup Successful.")
       navigate('/chat');
       return;
     } else if (actionResponse?.status !== 201 && (actionResponse && actionResponse.data.msg) || (actionResponse && actionResponse.data.error) && !isLoggedIn) {
       console.log(actionResponse);
       toast.error('Invalid credentials! Please retry....');
     } 
  }, [isLoggedIn, actionResponse, navigate, prevIsLoggedInRef]);

  return (
    <>
      {isSubmitting && <LinearProgress sx={{position:"absolute",top:"0px", left:"0px", right:"0px", bottom:"0px"}} />}
    <div className="container">
      {isScreenSizeGreaterThanMd && 
        <div>
          <Animation />
        </div>
      }
      <div className="login-box">
        <h2 className="heading-login-box">Signup</h2>
        <Form method="POST">
          <div className="user-box">
            <input className="user-box-input" name='name' autoComplete="off" type="text" required />
            <label className="user-box-label">Name</label>
          </div>
          <div className="user-box">
            <input className="user-box-input" name='email' autoComplete="off" type="text" required />
            <label className="user-box-label">Email</label>
          </div>
          <div className="user-box">
            <input className="user-box-input" name="password" type="password" required />
            <label className="user-box-label">Password</label>
          </div>
          {actionResponse && actionResponse.data.msg && <p style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{actionResponse.data.msg}</p>}
          {actionResponse && actionResponse.data.error && actionResponse.data.error.map((err: any) => <p key={err.msg} style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{err.msg}</p>)}
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
                margin: "0px"
              }} value={isSubmitting ? "Submitting" : "Signup"} />
            </a>
          </div>
        </Form>
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <p>Already have an account ?</p>
          <Link to='../login' className='no-dec' style={{ background: 'none' }}>Login here</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup

let SignupAction: ActionFunction = async ({ request }) => {
  let userData = await request.formData()
  let user = {
    name: userData.get('name'),
    email: userData.get('email'),
    password: userData.get('password')
  }

  try {
    let response: AxiosResponse = await axios.post('https://mern-gpt-2.onrender.com/user/signup', user, { withCredentials: true })
    // let response: AxiosResponse = await axios.post('https://mern-gpt-2.onrender.com/user/signup', user, { withCredentials: true })
    return response

  } catch (err: any) {
    return err.response
  }
};


export { SignupAction }
