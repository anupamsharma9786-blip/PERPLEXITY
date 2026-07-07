import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { useEffect } from 'react'
import { MessageCircle, Plus, Settings, HelpCircle, Search, Send, Paperclip } from 'lucide-react'

const Dashboard = () => {
  

    const chat = useChat()

    const [chatHistory] = useState([
      { _id: 'chat-1', title: 'Biomimicry in Architecture', createdAt: '2026-07-07T10:30:00.000Z' },
      { _id: 'chat-2', title: 'Eastgate Centre Analysis', createdAt: '2026-07-06T10:30:00.000Z' },
      { _id: 'chat-3', title: 'Passive Cooling Systems', createdAt: '2026-07-07T08:15:00.000Z' },
      { _id: 'chat-4', title: 'Termite Mound Ventilation', createdAt: '2026-07-05T14:20:00.000Z' }
    ])

    const [inputValue, setInputValue] = useState('')

    useEffect(()=>{
      chat.initSocketConnection()
    },[])

    const user = useSelector((state) => state.auth.user) 
    const chats = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state) => state.chat.currentChatId)

    const formatMessageTime = (value) => {
      if (!value) return ''

      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return value

      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const formatChatDate = (value) => {
      if (!value) return ''

      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return value

      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }

    const handleSendMessage = () => {
      const trimmedValue = inputValue.trim()

      if (!trimmedValue) return

      chat.handSendMessage({message: trimmedValue, chatId: currentChatId})
      setInputValue('')
    }

  return (
    <main className='h-screen w-full flex bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
      
      {/* SIDEBAR */}
      <aside className='w-64 bg-slate-900/80 border-r border-slate-700/50 flex flex-col shadow-xl'>
        {/* Header */}
        <div className='p-6 border-b border-slate-700/50'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <MessageCircle size={20} />
            </div>
            <span className='text-xs font-bold text-slate-400 tracking-wider'>CREATIVE MODE</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className='px-4 py-4 border-b border-slate-700/50'>
          <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-blue-600/50'>
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className='flex-1 overflow-y-auto px-3 py-4'>
          <h3 className='text-xs font-bold text-slate-400 tracking-wider mb-4 px-2'>CHAT HISTORY</h3>
          <div className='space-y-2'>
            {chatHistory.map((chat) => (
              <div key={chat._id} className='group p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-colors duration-200'>
                <p className='text-sm text-slate-200 truncate group-hover:text-white transition-colors'>{chat.title || 'New Chat'}</p>
                <p className='text-xs text-slate-500 mt-1'>{formatChatDate(chat.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-slate-700/50 space-y-3'>
          <button className='w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors duration-200'>
            <Settings size={18} />
            Settings
          </button>
          <button className='w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors duration-200'>
            <HelpCircle size={18} />
            Support
          </button>
          {user && (
            <div className='pt-3 border-t border-slate-700/50'>
              <p className='text-xs text-slate-400 truncate'>{user.email || user.name}</p>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className='flex-1 flex flex-col'>
        
        {/* CHAT AREA */}
        <div className='flex-1 overflow-y-auto p-8'>
          <div className='max-w-4xl mx-auto space-y-6'>
            {chats[currentChatId]?.messages.map((msg, index) => {
              const isUserMessage = msg.role === 'User'

              return (
                <div key={msg._id || `${msg.role}-${index}`} className={`flex gap-4 ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
                  
                  <div className={`max-w-2xl ${isUserMessage ? 'bg-blue-600/30 border border-blue-500/50' : 'bg-slate-800/50 border border-slate-700/50'} rounded-2xl p-4 shadow-lg`}>
                    <p className='text-slate-200 leading-relaxed whitespace-pre-wrap'>{msg.content}</p>
                    <p className='text-xs text-slate-500 mt-2'>{formatMessageTime(msg.createdAt)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* INPUT AREA */}
        <div className='border-t border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-8'>
          <div className='max-w-4xl mx-auto'>
            <div className='bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 shadow-lg focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200'>
              <div className='flex gap-3'>
                <button className='text-slate-400 hover:text-slate-200 transition-colors p-2 rounded hover:bg-slate-700/30'>
                  <Paperclip size={20} />
                </button>
                <input
                  type='text'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder='Ask me anything you want'
                  className='flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm'
                />
                <button
                  onClick={handleSendMessage}
                  className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200 hover:shadow-lg hover:shadow-blue-600/50'
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className='flex items-center justify-between mt-3 text-xs text-slate-500'>
              <span>💡 Sketch Mode</span>
              <span>SHIFT + ENTER for new line</span>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}

export default Dashboard