import axios from 'axios'
import { CHAT_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'
import residentService from '../resident/residentService'


//create new chat
const createNewChat = async (conversationData, token) => {
  const response = await axios.post(CHAT_API_URL, conversationData)
  const familyMemberInfo = await residentService.getFamilyMemberDetail(response.data.familyMemberId)
  const supervisorInfo = await employeeService.getEmployeeDetail(token, response.data.supervisorId)
  const residentInfo = await residentService.getResidentDetail(familyMemberInfo.residentId)

  return {
    ...response.data,
    familyMemberInfo,
    supervisorInfo,
    residentInfo
  }
}

//get chat list
const getChatList = async (userId, role, token) => {

  const response = await axios.get(CHAT_API_URL).then((res) => {
    if (role === 'supervisor') {
      return res.data.filter(chat => chat.supervisorId === userId)
    } else {
      return res.data.filter(chat => chat.familyMemberId === userId)
    }
  })

  const chatList = await response.map(async (res) => {
    const familyMemberInfo = await residentService.getFamilyMemberDetail(res.familyMemberId)
    const supervisorInfo = await employeeService.getEmployeeDetail(token, res.supervisorId)
    const residentInfo = await residentService.getResidentDetail(familyMemberInfo.residentId)
    return {
      ...res,
      familyMemberInfo,
      residentInfo,
      supervisorInfo,
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
  getChatLog,
  createNewChat
}

export default conversationService