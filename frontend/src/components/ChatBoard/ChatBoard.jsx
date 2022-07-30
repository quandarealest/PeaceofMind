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
import MobileChatterInfo from './MobileChatterInfo'
import ChatterInfo from './ChatterInfo'
import Conversation from './Conversation'
import NewChatDialog from './NewChatDialog'
import { reset, getChatList, getActiveChat, updateChatLog } from '../../features/conversation/conversationSlice'
import { getResidentList } from '../../features/resident/residentSlice'

function ChatBoard() {
  const dispatch = useDispatch()
  const [openNewChatDialog, setNewChatDialog] = useState(false)
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

  const { residents } = useSelector(state => state.residents)

  useEffect(() => {
    dispatch(getChatList({ userId: user._id, role: user.role, token: user.token }))
    dispatch(getResidentList())
    if (isError) {
      toast.error(message)
    }

  }, [dispatch, isError])


  const handleActiveChat = (roomId) => {
    dispatch(getActiveChat(roomId))
  }

  const handleUpdateChat = (roomId, updatedConversation, onSaveDB) => {
    dispatch(updateChatLog({ roomId, updatedConversation, onSaveDB }))
  }

  const handleOpenNewChat = () => {
    setNewChatDialog(true)
  }

  const handleCloseNewChat = () => {
    setNewChatDialog(false)
  }

  return (
    <Grid container component={Paper} sx={{ width: '100%', height: '100%' }}>
      <ChatList
        isLoading={isChatListLoading}
        chatList={chatList}
        activeChat={activeChat}
        handleActiveChat={handleActiveChat}
        user={user}
        newChat={handleOpenNewChat}
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
            newChat={handleOpenNewChat}
          />}
        mobileChatterInfoComponent={
          <MobileChatterInfo
            activeChat={activeChat}
            isLoading={isChatListLoading}
            user={user}
          />}
      />
      <ChatterInfo
        activeChat={activeChat}
        isLoading={isChatListLoading}
        user={user}
      />
      <NewChatDialog open={openNewChatDialog} onClose={handleCloseNewChat} residents={residents} />
    </Grid>
  )
}

export default ChatBoard
