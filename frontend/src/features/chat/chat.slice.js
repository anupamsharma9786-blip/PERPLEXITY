import { createSlice, current } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null
    },
    reducers: {
        createNewchat: (state, action)=>{
            const {chatId , title} = action.payload
            state.chats[chatId] = {
                chatId: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },
        addNewMessage: (state, action)=>{
            const {chatId, content, role} = action.payload
            state.chats[chatId].messages.push({content, role})
        },
        setCurrentChatId: (state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading:(state, action)=>{
            state.isLoading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {setCurrentChatId, setLoading, setError, createNewchat, addNewMessage} = chatSlice.actions

export default chatSlice.reducer