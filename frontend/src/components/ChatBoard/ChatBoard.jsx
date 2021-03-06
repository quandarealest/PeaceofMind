import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  Paper,
  Grid,
} from '@mui/material'

import './ChatBoard.css'

import ChatList from './ChatList'
import MobileChatList from './MobileChatList'
import Conversation from './Conversation'
import { reset, getChatList, getActiveChat, updateChatLog } from '../../features/conversation/conversationSlice'

function ChatBoard() {
  const dispatch = useDispatch()
  const {
    isChatListLoading,
    isError,
    isConversationLoading,
    isSuccess,
    message,
    chatList,
    activeChat
  } = useSelector(state => state.conversation)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getChatList({ userId: user._id, role: user.role, token: user.token }))
    if (isError) {
      toast.error(message)
    }
    // return () => {
    //   dispatch(reset())
    // }
  }, [dispatch, isError])


  const handleActiveChat = (roomId) => {
    dispatch(getActiveChat(roomId))
  }

  const handleUpdateChat = (roomId, updatedConversation, onSaveDB) => {
    dispatch(updateChatLog({ roomId, updatedConversation, onSaveDB }))
  }

  return (
    <Grid container component={Paper} sx={{ width: '100%', height: '100%' }}>
      <ChatList
        isLoading={isChatListLoading}
        chatList={chatList}
        activeChat={activeChat}
        handleActiveChat={handleActiveChat}
        user={user}
      />
      <Conversation
        activeChat={activeChat}
        isLoading={isConversationLoading}
        handleUpdateChat={handleUpdateChat}
        mobileChatListComponent={
          <MobileChatList
            isLoading={isChatListLoading}
            chatList={chatList}
            activeChat={activeChat}
            handleActiveChat={handleActiveChat}
            user={user}
          />}
      />
    </Grid>
  )
}

export default ChatBoard
