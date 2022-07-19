import axios from 'axios'
import { CHAT_API_URL } from '../../common/api'
import residentService from '../resident/residentService'


//get chat list
const getChatList = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }

  const response = await axios.get(CHAT_API_URL)

  const chatList = await response.data.map(async (res) => {
    const familyMemberInfo = await residentService.getFamilyMemberDetail(res.familyMemberId)
    const residentInfo = await residentService.getResidentDetail(familyMemberInfo.residentId)
    return {
      ...res,
      familyMemberInfo,
      residentInfo,
    }
  })

  return await Promise.all(chatList)
}

const updateChatLog = async (roomId, updatedConversation) => {
  const response = await axios.put(CHAT_API_URL + roomId, updatedConversation)
  return response.data

}

const getChatLog = async (roomId) => {
  const response = await axios.get(CHAT_API_URL + roomId)
  return response.data
}

const conversationService = {
  getChatList,
  updateChatLog,
  getChatLog
}

export default conversationService