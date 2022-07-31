import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Divider,
  CircularProgress,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

import PoMAvatar from '../PoMAvatar/PoMAvatar'
import { formatPhoneNumber, normalizeDate } from '../../common/NormalizingData'

const cssProps = {
  width: '80px',
  height: '80px'
}

function MobileChatterInfo(props) {
  const navigate = useNavigate()
  const { activeChat, isLoading, user } = props

  const renderLine = (title, data) => {
    return (
      <Grid sx={{ marginBottom: '5px' }} spacing={2} container>
        <Grid item xs={5}>
          <Typography variant="subtitle2">
            {title}:
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="body2">
            {data}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const renderFamilyInfo = () => {
    const { familyMemberInfo } = activeChat
    const renderInfoData = [
      {
        title: 'Name',
        data: `${familyMemberInfo.firstName} ${familyMemberInfo.lastName}`
      },
      {
        title: 'Contact No.',
        data: formatPhoneNumber(familyMemberInfo.contactNumber.toString())
      },
      {
        title: 'Emergency',
        data: familyMemberInfo.emergencyContact.toString().toUpperCase()
      },
      {
        title: 'Created At',
        data: normalizeDate(new Date(familyMemberInfo.createdAt))
      }
    ]
    return (
      <>
        {renderInfoData.map(info => (
          <>
            {renderLine(info.title, info.data)}
          </>
        ))}
      </>
    )
  }

  const renderResidentInfo = () => {
    const { residentInfo } = activeChat
    const renderInfoData = [
      {
        title: 'Name',
        data: `${residentInfo.firstName} ${residentInfo.lastName}`
      },
      {
        title: 'Gender',
        data: residentInfo.gender.toUpperCase()
      },
      {
        title: 'DoB',
        data: normalizeDate(new Date(residentInfo.dob))
      },
      {
        title: 'Contact No.',
        data: formatPhoneNumber(residentInfo.contactNumber.toString())
      },
      {
        title: 'Resident No.',
        data: residentInfo.residentNumber
      },
      {
        title: 'Room No.',
        data: residentInfo.roomNumber
      },
      {
        title: 'Created At',
        data: normalizeDate(new Date(residentInfo.createdAt))
      }
    ]
    return (
      <>
        {renderInfoData.map(info => (
          <>
            {renderLine(info.title, info.data)}
          </>
        ))}
      </>
    )
  }

  const renderSupervisorInfo = () => {
    const { supervisorInfo } = activeChat
    const renderInfoData = [
      {
        title: 'Name',
        data: `${supervisorInfo.firstName} ${supervisorInfo.lastName}`
      },
      {
        title: 'Contact No.',
        data: formatPhoneNumber(supervisorInfo.contactNumber.toString())
      },
      {
        title: 'Employee No.',
        data: supervisorInfo.employeeNumber
      },
    ]
    return (
      <>
        {renderInfoData.map(info => (
          <>
            {renderLine(info.title, info.data)}
          </>
        ))}
      </>
    )
  }

  const handleNavigateResDetail = (e) => {
    e.preventDefault()
    navigate('/resident-info', {
      state: {
        selectedUserId: activeChat.residentInfo.userId
      }
    })
  }
  return (
    <Grid container lg={3} sx={{ borderLeft: '1px solid #e0e0e0', display: { xs: 'block', md: 'block', lg: 'none' } }}>
      {isLoading ? (
        <>
          <Box sx={{ backgroundColor: '#f3f3f3', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ marginLeft: "5px" }} size={40} thickness={6} />
          </Box>
        </>
      ) : (
          <>
            {Object.keys(activeChat).length !== 0 ? (
              <Box
                sx={{
                  my: 4,
                  mx: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {user.role === 'supervisor' && (
                  <>
                    <PoMAvatar {...cssProps} firstName={activeChat.familyMemberInfo.firstName} lastName={activeChat.familyMemberInfo.lastName} />
                    <Typography component="h1" variant="h5">
                      {`${activeChat.familyMemberInfo.firstName} ${activeChat.familyMemberInfo.lastName}`}
                    </Typography>
                    <Accordion sx={{ width: '100%' }} expanded={true}>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="subtitle2">Family Information</Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        {renderFamilyInfo()}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ width: '100%' }} expanded={true}>
                      <AccordionSummary
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography variant="subtitle2">Resident Information</Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        {renderResidentInfo()}
                        <Button fullWidth onClick={handleNavigateResDetail}>
                          Resident Information
                    </Button>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {user.role === 'family' && (
                  <>
                    <PoMAvatar {...cssProps} firstName={activeChat.supervisorInfo.firstName} lastName={activeChat.supervisorInfo.lastName} />
                    <Typography component="h1" variant="h5">
                      {`${activeChat.supervisorInfo.firstName} ${activeChat.supervisorInfo.lastName}`}
                    </Typography>
                    <Accordion sx={{ width: '100%' }} expanded={true}>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="subtitle2">Supervisor Information</Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        {renderSupervisorInfo()}
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
              </Box>
            ) : (
                <>
                  <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>
                      No user information selected
                    </Typography>
                  </Box>
                </>
              )}
          </>
        )}
    </Grid>
  )
}

export default MobileChatterInfo
