import * as React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Typography,
	Button,
	Divider,
	Grid,
	Box,
	CssBaseline,
	Container,
	Stepper,
	Step,
	StepLabel
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/CustomizedTheme'
import { toast } from 'react-toastify';


import PersonalDetails from './PersonalDetails';
import MedicalInformation from './MedicalInformation';
import ResidentNotes from './ResidentNotes';
import { NoteType } from '../ResidentDetail/ResidentEnum'
import ResidentFinalDisplay from './ResidentFinalDisplay'
import { createResident } from '../../features/resident/residentSlice'


const steps = ['Basic Details', 'Medical Information', 'Resident Notes'];


export default function ResidentAddingNew(props) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = props
	const { residents } = useSelector(state => state.residents)
	const { employees, isError, isLoading: employeeLoading, message } = useSelector(state => state.employees);
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());
	const [createdResident, setCreatedResident] = useState({
		user: {
			userName: '',
			password: '',
			email: '',
			role: 'resident',
		},
		firstName: '',
		lastName: '',
		contactNumber: '',
		residentNumber: '',
		roomNumber: '',
		gender: '',
		dob: null,
		supervisorEmployeeId: user.info.userId,
	})
	const [createdFamily, setCreatedFamily] = useState({
		user: {
			userName: '',
			password: '',
			email: '',
			role: 'family',
		},
		firstName: '',
		lastName: '',
		contactNumber: '',
		emergencyContact: null,
	})

	const [createdMedical, setCreatedMedical] = useState({
		basicMedicalRecord: {
			bloodGroup: null,
			weight: '',
			height: '',
		},
		specialMedicalRecord: {
			diet: [],
			allergy: [],
			medication: []
		}
	})

	const [createdNote, setCreatedNote] = useState({
		specialNote: [],
		dailyNote: [],
		privateNote: []
	})


	const optionalSet = new Set([2]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createResident({ newResident: createdResident, newFamily: createdFamily, newMedical: createdMedical, newNote: createdNote, token: user.token }))
			.then((res) => {
				toast.success(`New resident ${createdResident.firstName} ${createdResident.lastName} - ${createdResident.residentNumber} has been added to the system successfully`)
				navigate('/resident-info', {
					state: {
						selectedUserId: res.payload
					}
				})
			})
	};
	const style1 = {
		marginBottom: 2,
	};

	const handleAddNewNote = (newData) => {
		if (newData.noteType === NoteType[0].value) {
			setCreatedNote({
				...createdNote,
				dailyNote: [
					...createdNote.dailyNote,
					{
						...newData
					}
				]
			})
		} else if (newData.noteType === NoteType[1].value) {
			setCreatedNote({
				...createdNote,
				specialNote: [
					...createdNote.specialNote,
					{
						...newData
					}
				]
			})
		} else {
			setCreatedNote({
				...createdNote,
				privateNote: [
					...createdNote.privateNote,
					{
						...newData
					}
				]
			})
		}
	}

	const handleChangeNewResidentValue = (newData, type) => {
		if (type === 'resident') {
			setCreatedResident(newData)
		} else {
			setCreatedFamily(newData)
		}
	}

	const handleChangeBasicMedicalValue = (newData, type) => {
		setCreatedMedical({
			...createdMedical,
			basicMedicalRecord: newData
		})
	}

	const handleAddMedicalRecord = (newData, type) => {
		if (type === 'medication') {
			setCreatedMedical({
				...createdMedical,
				specialMedicalRecord: {
					...createdMedical.specialMedicalRecord,
					medication: [
						...createdMedical.specialMedicalRecord.medication,
						{
							...newData
						}
					]
				}
			})
		} else if (type == 'allergy') {
			setCreatedMedical({
				...createdMedical,
				specialMedicalRecord: {
					...createdMedical.specialMedicalRecord,
					allergy: [
						...createdMedical.specialMedicalRecord.allergy,
						{
							...newData
						}
					]
				}
			})
		} else {
			setCreatedMedical({
				...createdMedical,
				specialMedicalRecord: {
					...createdMedical.specialMedicalRecord,
					diet: [
						...createdMedical.specialMedicalRecord.diet,
						{
							...newData
						}
					]
				}
			})
		}
	}

	const isStepOptional = (step) => {
		return optionalSet.has(step);
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (activeStep === 0) {
			let flag = false
			let key = ''

			// >>> will uncomment when done with other steps <<<
			Object.values(createdResident).every((el, index) => {
				if (index === 0) {
					Object.values(el).every((microEl, microIndex) => {
						if (microEl === '' || microEl === null) {
							flag = true
							return
						}
					})
				} else {
					if (el === '' || el === null) {
						flag = true
						return
					}
				}
			})

			if (flag) {
				toast.error('Missing value')
			} else {
				if (isStepSkipped(activeStep)) {
					newSkipped = new Set(newSkipped.values());
					newSkipped.delete(activeStep);
				}
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				setSkipped(newSkipped);
			}
		} else if (activeStep === 1) {
			let flag = false
			let key = ''

			// >>> will uncomment when done with other steps <<<
			Object.values(createdMedical.basicMedicalRecord).every((el, index) => {
				if (el === '' || el === null) {
					flag = true
					return
				}
			})

			if (flag) {
				toast.error('Missing value')
			} else {
				if (isStepSkipped(activeStep)) {
					newSkipped = new Set(newSkipped.values());
					newSkipped.delete(activeStep);
				}
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				setSkipped(newSkipped);
			}
		} else {
			if (isStepSkipped(activeStep)) {
				newSkipped = new Set(newSkipped.values());
				newSkipped.delete(activeStep);
			}

			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			setSkipped(newSkipped);
		}


	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	// Get content based on which step is active
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<PersonalDetails
						handleChangeNewResidentValue={handleChangeNewResidentValue}
						residentList={residents}
						user={user}
						createdResident={createdResident}
						createdFamily={createdFamily} />
				);
			case 1:
				return (
					<MedicalInformation
						createdMedical={createdMedical}
						handleChangeBasicMedicalValue={handleChangeBasicMedicalValue}
						handleAddMedicalRecord={handleAddMedicalRecord}
					/>
				);
			case 2:
				return (
					<ResidentNotes
						createdNote={createdNote}
						employees={employees}
						user={user}
						isError={isError}
						employeeLoading={employeeLoading}
						message={message}
						handleAddNewNote={handleAddNewNote}
					/>
				);
			default:
				return 'Unknown step';
		}
	}

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						marginBottom: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',

					}}
				>
					<Typography component="h1" variant="h5">
						Create New Resident
          </Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4, width: '100%' }}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, index) => {
								const stepProps = {};
								const labelProps = {};
								if (isStepOptional(index)) {
									labelProps.optional = (
										<Typography variant="caption">Optional</Typography>
									);
								}
								if (isStepSkipped(index)) {
									stepProps.completed = false;
								}
								return (
									<Step key={label} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === steps.length ? (
							<>
								<Grid container spacing={2} sx={{ pt: 4, maxWidth: '100%' }}>
									<Grid item xs={12} sm={12}>
										<ResidentFinalDisplay
											createdResident={createdResident}
											createdFamily={createdFamily}
											createdMedical={createdMedical}
											createdNote={createdNote} />
									</Grid>
								</Grid>

								<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
									<Box sx={{ flex: '1 1 auto' }} />
									<Button onClick={handleReset}>Edit</Button>
								</Box>
								<Grid container spacing={2} sx={{ pt: 4 }}>
									<Grid item xs={12} sm={4} md={6}>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											sx={{ mt: 3, mb: 2 }}
											onClick={handleSubmit}
										>
											Submit
            				</Button>
									</Grid>
									<Grid item xs={12} sm={4} md={6}>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="error"
											sx={{ mt: 3, mb: 2 }}
										>
											Cancel
                		</Button>
									</Grid>
								</Grid>

							</>
						) : (
								<>
									<Grid container spacing={2} sx={{ pt: 4, maxwidhth: '100%' }}>
										{getStepContent(activeStep)}
									</Grid>

									<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
										<Button
											color="inherit"
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mr: 1 }}
										>
											Back
            				</Button>
										<Box sx={{ flex: '1 1 auto' }} />
										{isStepOptional(activeStep) && (
											<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
												Skip
											</Button>
										)}

										<Button onClick={handleNext}>
											{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
										</Button>
									</Box>
								</>
							)}
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}