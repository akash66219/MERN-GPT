import { createSlice, configureStore } from '@reduxjs/toolkit'

type Chat = {
    role : "user" | "assistant",
    content : string
}

type UserState = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: any;
    chats : Array<Chat>
}

const initialState: UserState = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    chats : []
};

let userAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login : (state : UserState, action: { payload: {name: String, email: String, chats: Array<Chat>} }) => {
            state.isLoggedIn=true
            state.user = {
                name :  action.payload.name, 
                email  : action.payload.email,
            }
            state.chats  = action.payload.chats
        },
        logout : (state: UserState) => {
            state.isLoggedIn = false 
            state.user = null
        },
        setChats : (state: UserState,action: {payload: {role : "user" | "assistant", message: string}}) => {
            state.chats.push({
                role : action.payload.role,
                content : action.payload.message
            })
        },
        deleteChat : (state: UserState) => {
            state.chats=[]
        },
        popback : (state: UserState) => {
            state.chats.pop()
        },
        setIsLoading : (state: UserState, action:{payload : boolean}) => {
            state.isLoading = action.payload
        }
    }
})



let store = configureStore({
    reducer: userAuth.reducer
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const userActions = userAuth.actions
