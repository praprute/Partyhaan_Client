import React, { useState, useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, TextField, Button, Checkbox, Alert } from '@mui/material';
import Link from '@mui/material/Link';
import { registerUser } from './../api';
import { useRouter } from 'next/router';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FormRegister() {
    const router = useRouter();
	const [values, setValues] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		accept: false,
	});

	const [successRegis, setSuccessRegis] = useState(false);

	const [errorEmail, setErrorEmail] = useState({
		status: false,
		value: '',
	});
	const [errorPassword, setErrorPassword] = useState({
		status: false,
		value: '',
	});
	const [errorConfirmPassword, setErrorConfirmPassword] = useState({
		status: false,
		value: '',
	});
	const [errorAccept, setErrorAccept] = useState({
		status: false,
		value: '',
	});

	const onChangeValues = (name) => (event) => {
		if (name == 'accept') {
			setValues({ ...values, [name]: event.target.checked });
		} else {
			setValues({ ...values, [name]: event.target.value });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (values.email == '') {
				setErrorEmail({
					...errorEmail,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorEmail({
					...errorEmail,
					status: false,
					value: '',
				});
			}

			if (values.password == '') {
				setErrorPassword({
					...errorPassword,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorPassword({
					...errorPassword,
					status: false,
					value: '',
				});
			}

			if (values.confirmPassword == '') {
				setErrorConfirmPassword({
					...errorConfirmPassword,
					status: true,
					value: 'กรุณากรอกข้อมูลให้ครบถ้วน',
				});
			} else {
				setErrorConfirmPassword({
					...errorConfirmPassword,
					status: false,
					value: '',
				});
			}

			if (values.accept == false) {
				setErrorAccept({
					...errorAccept,
					status: true,
					value: 'กรุญายอมรับเงื่อนไขการสมัครสมาชิก',
				});
			}

			if (
				values.password == values.confirmPassword &&
				values.email !== '' &&
				values.accept == true
			) {
				let data = {
					email: values.email,
					password: values.password,
					confirmPassword: values.confirmPassword,
					accept: values.accept,
				};

				// console.log('data : ', data);

				let Register = await registerUser(data);
				if (Register.success == 'success') {
					setValues({
						...values,
						email: '',
						password: '',
						confirmPassword: '',
						accept: false,
					});
					// setSuccessRegis(true);
					setSuccessRegis(true)
                    setTimeout(() => {
                        setSuccessRegis(false);
                    }, 3000)
				} else {
					setSuccessRegis(false);
				}

			} else {
				setErrorPassword({
					...errorPassword,
					status: true,
					value: 'กรุณาตรวจสอบรหัสผ่านของท่าน',
				});
				setErrorConfirmPassword({
					...errorConfirmPassword,
					status: true,
					value: 'กรุณาตรวจสอบรหัสผ่านของท่าน',
				});
			
			}
		} catch (err) {
			console.log(err);
		}
	};

	const alertRegister = () => {
		if (successRegis == true) {
			return (
				<Alert
					className='md:mt-5 w-full'
					style={{ display: successRegis ? '' : 'none' }}
					severity='success'
				>
					สมัครสมาชิกเรียบร้อย
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
				<CssTextField
					className=' w-full md:mt-5 md:mb-5'
					id='email'
					label='อีเมล์'
					type='email'
					color='primary'
					onChange={onChangeValues('email')}
					value={values.email}
					// helperText='Incorrect entry.'
					variant='standard'
					required
					error={errorEmail.status}
					helperText={errorEmail.value}
				/>
				<CssTextField
					className=' w-full mt-7 md:mt-5 md:mb-5 '
					id='email'
					type='password'
					label='รหัสผ่าน'
					color='primary'
					onChange={onChangeValues('password')}
					value={values.password}
					// helperText='Incorrect entry.'
					variant='standard'
					required
					error={errorPassword.status}
					helperText={errorPassword.value}
				/>
				<CssTextField
					className=' w-full mt-7 md:mt-5 md:mb-5'
					id='email'
					type='password'
					label='ยืนยันรหัสผ่าน'
					color='primary'
					onChange={onChangeValues('confirmPassword')}
					value={values.confirmPassword}
					// helperText='Incorrect entry.'
					variant='standard'
					required
					error={errorConfirmPassword.status}
					helperText={errorConfirmPassword.value}
				/>
				<div className='w-full h-full -ml-5 p-0 flex justify-start items-center'>
					<Checkbox
						{...label}
						// defaultChecked
						checked={values.accept}
						onChange={onChangeValues('accept')}
						color='primary'
						sx={{
							color: '#F9675C',
							'&.Mui-checked': {
								color: '#F9675C',
							},
						}}
					/>
					<span className='text-[#F9675C]'>
						ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน
					</span>
				</div>
				{errorAccept.status ? (
					<div className='w-full h-full p-0 flex justify-center items-center'>
						<span className='text-[#F9675C] text-sm'>
							กรุณายอมรับเงื่อไขการสมัครสมาชิกผู่ใช้งาน
						</span>
					</div>
				) : null}

				<button
					className='w-full md:w-5/12 mt-10 md:mt-5 active:bg-[#7a221c] duration-300 hover:bg-[#f72415] py-2 px-4 rounded-full bg-[#F9675C] text-white text-md font-light tracking-normal'
					variant='contained'
					type='submit'
				>
					ยืนยัน
				</button>
				<div className='w-full'>
					<Link href='/' className='no-underline'>
						<a className='float-right text-right cursor-pointer text-[#F9675C] hover:text-[#f72415] mt-10 md:mt-7 text-sm font-light'>
							เข้าสู่ระบบ
						</a>
					</Link>
				</div>
			</Box>
		</>
	);
}
