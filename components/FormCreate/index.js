import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Alert, FormHelperText } from '@mui/material';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getType } from '../api';
import Cookies from 'js-cookie';
import { createParty } from './../api';

const CssTextSelect = styled(FormControl)({
	'& label.Mui-focused': {
		color: '#e7544a',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#e7544a',
		borderColor: '#e7544a',
	},
	'& .MuiInput-underline:hover': {
		borderColor: '#e7544a',
		borderBottomColor: '#e7544a !important',
	},
	'& .MuiInput-root:before': {
		borderBottomColor: '#e7544a',
	},
	'& .MuiInput-root': {
		color: 'black',
		borderBottomColor: '#e7544a',
		'& fieldset': {
			borderColor: '#e7544a',
		},
		'&:hover fieldset': {
			borderColor: '#e7544a',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#e7544a',
		},
	},
	// MuiInputBase-input
	'& label': {
		color: '#e7544a',
	},
});

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: '#e7544a',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#e7544a',
		borderColor: '#e7544a',
	},
	'& .MuiInput-underline:hover': {
		borderColor: '#e7544a',
		borderBottomColor: '#e7544a !important',
	},
	'& .MuiInput-root:before': {
		borderBottomColor: '#e7544a',
	},
	'& .MuiInput-root': {
		color: 'black',
		borderBottomColor: '#e7544a',
		'& fieldset': {
			borderColor: '#e7544a',
		},
		'&:hover fieldset': {
			borderColor: '#e7544a',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#e7544a',
		},
	},
	// MuiInputBase-input
	'& label': {
		color: '#e7544a',
	},
});

export default function FormCreate() {
	const [type, setType] = useState([]);
	const [typeSelect, setTypeSelect] = useState('');
	const [errSelect, setErrorSelect] = useState({
		status: false,
		value: 'กรุณาเลือกประเภทปาตี้',
	});
	const [values, setValues] = useState({
		partyName: '',
		content: '',
		quantity: '',
	});
	const [errorPartyName, setErrorPartyName] = useState({
		status: false,
		value: '',
	});
	const [errorContent, setErrorContent] = useState({
		status: false,
		value: '',
	});
	const [errorQuantity, setErrorQuantity] = useState({
		status: false,
		value: '',
	});
	const [successCreate, setSuccessCreate] = useState(false);

	const [token, setToken] = useState(Cookies.get('tokenPartyHaan'));

	useEffect(async () => {
		let responseType = await getType();
		if (responseType.success == 'success') {
			setType(responseType.message);
		}
		//   console.log('responseType : ', responseType);
	}, []);

	const handleChangeType = (event) => {
		setTypeSelect(event.target.value);
		// setAge(event.target.value);
	};

	const onChangeValues = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (values.partyName == '') {
				setErrorPartyName({
					...errorPartyName,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorPartyName({
					...errorPartyName,
					status: false,
					value: '',
				});
			}

			if (values.content == '') {
				setErrorContent({
					...errorContent,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorContent({
					...errorContent,
					status: false,
					value: '',
				});
			}

			if (values.quantity == '') {
				setErrorQuantity({
					...errorQuantity,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorQuantity({
					...errorQuantity,
					status: false,
					value: '',
				});
			}

			if (values.quantity > 5) {
				setErrorQuantity({
					...errorQuantity,
					status: true,
					value: 'จำนวนสมาชิกไม่เกิน 5 คน',
				});
			} else {
				setErrorQuantity({
					...errorQuantity,
					status: false,
					value: '',
				});
			}

			if (typeSelect == '') {
				setErrorSelect({
					...errSelect,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorSelect({
					...errSelect,
					status: false,
					value: '',
				});
			}
			let index = {
				type: typeSelect,
				content: values.content,
				quantity: values.quantity,
				partyName: values.partyName,
			};
			if (
				typeSelect !== '' &&
				values.content !== '' &&
				values.quantity !== '' &&
				values.partyName !== '' &&
				values.quantity <= 5
			) {
				let responseCreate = await createParty(token, index);
				if (responseCreate.success == 'success') {
					setValues({
						...values,
						partyName: '',
						content: '',
						quantity: '',
					});
					setTypeSelect('');
					setSuccessCreate(true);
					setTimeout(() => {
						setSuccessCreate(false);
					}, 5000);
				} else {
					setSuccessCreate(false);
				}
			
			}
		} catch (err) {
			console.log(err);
		}
	};

	const alertRegister = () => {
		if (successCreate == true) {
			return (
				<Alert
					className='md:mb-5 w-full'
					style={{ display: successCreate ? '' : 'none' }}
					severity='success'
				>
					สร้างปาตี้เรียบร้อย
				</Alert>
			);
		} else {
			return null;
		}
	};

	return (
		<>
			<Box
				className=' h-full w-full px-10 flex flex-col justify-center items-center'
				component='form'
				onSubmit={handleSubmit}
				noValidate
				autoComplete='off'
			>
				{alertRegister()}
				<CssTextSelect
					variant='standard'
					className='w-full mt-0 md:mb-3'
					error={errSelect.status}
				>
					<InputLabel
						helperText={'error'}
						id='demo-simple-select-standard-label'
					>
						ประเภทปาตี้
					</InputLabel>
					<Select
						labelId='demo-simple-select-standard-label'
						id='demo-simple-select-standard'
						value={typeSelect}
						onChange={handleChangeType}
						label='Type'
					>
						{type.map((index, i) => (
							<MenuItem value={index.idroomType}>{index.name}</MenuItem>
						))}
					</Select>
					{errSelect.status && (
						<FormHelperText>{errSelect.value}</FormHelperText>
					)}
				</CssTextSelect>
				<CssTextField
					className=' w-full md:mt-3 md:mb-3'
					id='partyName'
					label='ชื่อปาตี้'
					type='text'
					color='primary'
					onChange={onChangeValues('partyName')}
					value={values.partyName}
					variant='standard'
					required
					error={errorPartyName.status}
					helperText={errorPartyName.value}
				/>
				<CssTextField
					className=' w-full md:mt-3 md:mb-3'
					id='content'
					label='รายละเอียด'
					type='text'
					color='primary'
					onChange={onChangeValues('content')}
					value={values.content}
					variant='standard'
					required
					error={errorContent.status}
					helperText={errorContent.value}
				/>
				<CssTextField
					className=' w-full md:mt-3 md:mb-3'
					id='quantity'
					label='จำนวนผู้เข้าร่วม'
					type='number'
					color='primary'
					onChange={onChangeValues('quantity')}
					value={values.quantity}
					variant='standard'
					required
					error={errorQuantity.status}
					helperText={errorQuantity.value}
				/>
				<button
					className='w-full md:w-5/12 mt-10 md:mt-5 active:bg-[#7a221c] duration-300 hover:bg-[#f72415] py-2 px-4 rounded-full bg-[#F9675C] text-white text-md font-light tracking-normal'
					variant='contained'
					type='submit'
				>
					สร้างปาตี้
				</button>
			</Box>
			{/* {JSON.stringify(type)} */}
		</>
	);
}
