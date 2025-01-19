import { Box, TextField, Tooltip, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ChatItem from '../components/ChatItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../store/exporter';
import { userActions } from '../store/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


const Chat = (): ReactNode => {
  let isLoggedIn = useAppSelector(state => state.isLoggedIn);
  let navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("here")
      navigate('/login')
      toast.info('Please login to access chat')
      return;
    }
  }, [isLoggedIn])

  const [isThreadOpen, setIsThreadOpen] = useState<boolean>(true);
  const toggleThread = () => {
    setIsThreadOpen(prevState => !prevState);
  };
  let inputRef = useRef<HTMLInputElement | null>(null)
  let dispatch = useAppDispatch()
  let chats = useAppSelector(state => state.chats)
  let isLoading = useAppSelector(state => state.isLoading)

  const theme = useTheme();
  const isScreenLargerThanLg = useMediaQuery(theme.breakpoints.up('lg'));

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      //@ts-ignore
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  
  let submitHandler = async () => {
    
    if (inputRef.current) {
      let content = inputRef.current?.value
      if (content === "") return;
      try {
        dispatch(userActions.setIsLoading(true))
        dispatch(userActions.setChats({ role: "user", message: content }))
        dispatch(userActions.setChats({ role: "assistant", message: "Generating response..." }))
        const res = await axios.post("https://mern-gpt-2.onrender.com/chat/new", { message: content }, { withCredentials: true })
        if (res.status !== 200) {
          dispatch(userActions.popback())
          dispatch(userActions.setIsLoading(false))
          throw new Error("Unable to send chat");
        }
        const data = await res.data;
        console.log(data.response)
        dispatch(userActions.popback())
        dispatch(userActions.setIsLoading(false))
        dispatch(userActions.setChats({ role: "assistant", message: data.response }))
      } catch (err) {
        console.log(err)
        toast.error("Some error occured. Cannot load chats!")
      }
    }
  }

  let deleteHandler = async () => {
    if (chats.length === 0) return;
    try {
      const res = await axios.delete("https://mern-gpt-2.onrender.com/chat/deleteChat", { withCredentials: true })
      if (res.status !== 200) {
        throw new Error("Unable to delete chat");
      }
      dispatch(userActions.deleteChat())
      toast.success("Chats deleted successfully!")
    } catch (err) {
      console.log(err)
      toast.error("Chat deletion failed!")
    }
  }


  // Function to scroll to a specific chat
  const scrollToChat = (chatId: string) => {
    const chatElement = document.getElementById(`chat-${chatId}`);
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <Box sx={{ display: "flex", flex: "1", width: "100vw", opacity: "0.9", height: "89vh" }} id="chat">
      {isThreadOpen && (
        <Box sx={{
          flexShrink: "1", maxWidth: "400px", flexGrow: "0.1", margin: "6px", border: "3px solid grey", backgroundColor: "#171719",
          borderRadius: "15px", display: { lg: "flex", xs: "none" }, flexDirection: "column", padding: "10px", py: "20px", transition: "width 0.5s"
        }} id="hello">
          <Box sx={{ display: "flex" }}>
            <Box sx={{
              display: "flex", flexDirection: "column", width: "100%", transition: 'transform 300ms ease-in-out',
              '&:hover': {
                transform: 'scale(1.03) translateX(5px)',
                cursor: "pointer",
              },
            }}>
              <Box
                onClick={() => {
                  inputRef.current?.focus()
                  scrollToBottom()
                }}>
                <Typography variant='h6' sx={{ display: "flex", flexDirection: "row", textAlign: "center" }} >
                  <Tooltip title="Create new chat" arrow placement="bottom" >
                    <ChatBubbleOutlineIcon fontSize="large" sx={{ mr: "8px", ml: "5px" }} />
                  </Tooltip>
                  <span>New Chat</span>
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Close Sidebar" arrow placement="bottom" >
              <ClearRoundedIcon fontSize="medium" sx={{
                ml: "auto", transition: 'transform 300ms ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  cursor: "pointer"
                },
              }} onClick={toggleThread} />
            </Tooltip>
          </Box>
          <Box
            sx={{
              mt: "20px",
              height: "76vh",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              paddingX: "5px",
              width: "100%",
              wordWrap: "break-word",
              scrollBehavior: "smooth",
              overflowY: "hidden",
              "&:hover": {
                overflowY: "overlay",
              },
            }}
          >
            {
              chats.map((chat) => (
                // Check if chat.role is "user" before rendering
                chat.role === "user" && (
                  // @ts-ignore
                  <Box key={chat._id} onClick={() => scrollToChat(chat._id)}>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontFamily: "monospace",
                        mb: "15px",
                        background: "#333333",
                        px: "12px",
                        py: "10px",
                        borderRadius: "10px",
                        overflowX: "hidden",
                        transition: "transform 300ms ease-in-out",
                        '&:hover': {
                          transform: "scale(1.02)",
                          cursor: "pointer",
                        }
                      }}
                    >
                      {chat.content.length > 28
                        ? chat.content.slice(0, 28) + '...'
                        : chat.content.slice(0, 30)}
                    </Typography>
                  </Box>
                )
              ))
            }
          </Box>


          <Box sx={{
            mt: "auto",
            transition: 'transform 300ms ease-in-out',
            display: "flex",
            justifyContent: "center",
            borderTop: "2px solid #333333",
            '&:hover': {
              transform: 'scale(1.03)',
              cursor: "pointer",
            },
          }}
            onClick={deleteHandler}>
            <Tooltip title="Delete chat history" arrow placement="bottom" >
              <Typography variant='h6' sx={{ display: "flex", flexDirection: "row", textAlign: "center", mt: "10px" }}>
                <DeleteOutlinedIcon fontSize="large" />
                <span>Delete History</span>
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", overflowY: "overlay", flexDirection: "column", border: "3px solid grey", flex: "1", margin: "6px", backgroundColor: "#171719", borderRadius: "15px" }}>
        {isThreadOpen && isScreenLargerThanLg &&
          <Tooltip title="Close Sidebar" arrow placement="right" >
            <ArrowBackIosNewRoundedIcon
              fontSize='large'
              sx={{ position: "relative", top: "50%" }}
              onClick={toggleThread}
            />
          </Tooltip>}
        {!isThreadOpen && isScreenLargerThanLg &&
          <Tooltip title="Open Sidebar" arrow placement="right" >
            <ArrowForwardIosRoundedIcon
              fontSize='large'
              sx={{ position: "relative", top: "50%" }}
              onClick={toggleThread}
            />
          </Tooltip>}
        <Box
          className="scrollable-container"
          ref={chatContainerRef}
          sx={{
            ml: { xl: "auto", xs: "auto" },
            mr: { xl: "auto", xs: "auto" },
            height: "100%",
            width: { xl: "62%", xs: "95%" },
            mt: "10px",
            position: "sticky",
            zIndex: "5",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}>
          {chats.map((chat) => {
            return (
              // @ts-ignore
              <Box key={chat._id} id={`chat-${chat._id}`}>
                <ChatItem role={chat.role} content={chat.content} />
              </Box>
            )
          })}
        </Box>
        <Box
          zIndex={5}
          sx={{
            ml: { xl: 'auto', xs: 'auto' },
            mr: { xl: 'auto', xs: 'auto' },
            minHeight: "70px",
            height: `80px`,
            width: { xl: '60%', xs: '80%' },
            background: '#333333',
            mb: '25px',
            borderRadius: '20px',
            border: '3px solid grey',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            '&::-webkit-scrollbar': {
              width: 0,
            },
          }}
        >
          {isLoading ? (
          <Box sx={{ position: 'relative', ml: "10px", top: 0, left: 0, right: 0, fontSize: "10px", color: "grey", bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TypeAnimation
              sequence={[
                200,
                'Hold on',
                700,
                'Hold on.',
                700,
                'Hold on..',
                700,
                'Hold on...',
                500,
              ]}
              speed={50}
              style={{ fontSize: '2em' }}
              repeat={Infinity}
            />
          </Box>
          ) : (
            <TextField
              id="standard-basic"
              placeholder="Ask a question"
              variant="standard"
              multiline
              maxRows={Infinity}
              fullWidth
              inputRef={inputRef}
              sx={{
                width: '98%',
                ml: '20px',
                mr: '10px',
                color: 'white',
                maxHeight: '65px',
                overflowY: 'auto',
                '& .MuiInputBase-input': {
                  height: 'auto',
                  fontSize: '20px',
                  color: 'white',
                  textDecoration: 'none',
                },
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '&::-moz-scrollbar': {
                  display: 'none',
                },
              }}
            />
          )}
          <Tooltip title="Generate" arrow placement="top" >
            <Box id="submitIcon" onClick={submitHandler} sx={{ ml: "auto" }}>
              <ArrowForwardRoundedIcon
                fontSize="large"
                sx={{
                  mr: '10px',
                  justifySelf: 'center',
                  transition: 'transform 300ms ease-in-out',
                  mt: '10px',
                  '&:hover': {
                    transform: 'translateX(1px)',
                    cursor: 'pointer',
                  },
                }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;