import { initSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteMessages } from "../services/chat.api";
import { useDispatch } from "react-redux";
import { setLoading, setCurrentChatId, setError, createNewchat, addNewMessage } from "../chat.slice";

export const useChat = () => {

    const dispatch = useDispatch()

    async function handSendMessage({message, chatId}) {
        dispatch(setLoading(true))

        const data = await sendMessage({message, chatId})

        const {chat, aiMessage} = data

        dispatch(createNewchat({
            chatId: chat._id,
            title: chat.title
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: "User"
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: "AI"
        }))
        dispatch(setCurrentChatId(chat._id))
        dispatch(setLoading(false))


    }

    return {
        initSocketConnection, handSendMessage
    }

}