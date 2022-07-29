import axios from 'axios'
import { TIMELINE_API_URL } from '../../common/api'
import employeeService from '../employee/employeeService'
import residentService from '../resident/residentService'


const updateTimelineLog = async (residentId, updatedTimeline) => {
  const response = await axios.put(TIMELINE_API_URL + residentId, updatedTimeline)
  return response.data

}

const getTimelineLog = async (residentId) => {
  const response = await axios.get(TIMELINE_API_URL + residentId)
  return response.data
}

const conversationService = {
  updateTimelineLog,
  getTimelineLog
}

export default conversationService