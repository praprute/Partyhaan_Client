import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { alpha, styled } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';
import Link from '@mui/material/Link';
import { SignIn } from './../api';
import Cookies from 'js-cookie';

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

export default function FormLogin() {
    const router = useRouter();
	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	const [errorEmail, setErrorEmail] = useState({
		status: false,
		value: '',
	});
	const [errorPassword, setErrorPassword] = useState({
		status: false,
		value: '',
	});
	const onChangeValues = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log('login : ', values);
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

			if (values.email !== '' && values.password !== '') {
				let data = {
					email: values.email,
					password: values.password,
				};

				let callLogin = await SignIn(data);

				// console.log('call login : ', callLogin);
				if (callLogin.success == 'success') {
					Cookies.set('tokenPartyHaan', callLogin.message.token);
                    router.push('/Party');
				} else {
					if (callLogin.message_th == 'รหัสผ่านไม่ถูกต้อง') {
						setErrorPassword({
							...errorPassword,
							status: true,
							value: 'รหัสผ่านไม่ถูกต้อง',
						});
					} else if (
						callLogin.message_th == 'กรุณาสมัครสมาชิกเพื่อเข้าใช้งาน'
					) {
						setErrorEmail({
							...errorEmail,
							status: true,
							value: 'อีเมลไม่ถูกต้อง',
						});
					} else {
						setErrorPassword({
							...errorPassword,
							status: true,
							value: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
						});
						setErrorEmail({
							...errorEmail,
							status: true,
							value: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
						});
					}
				}
			}
		} catch (err) {
			console.log(err);
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
				<CssTextField
					className=' w-full md:mt-5 md:mb-5'
					id='email'
					label='อีเมล์'
					type='email'
					color='primary'
					onChange={onChangeValues('email')}
					value={values.email}
					variant='standard'
					required
					error={errorEmail}
					helperText={errorEmail.value}
				/>
				<CssTextField
					className=' w-full mt-7 md:mt-5 md:mb-5'
					id='email'
					type='password'
					label='รหัสผ่าน'
					color='primary'
					onChange={onChangeValues('password')}
					value={values.password}
					variant='standard'
					required
					error={errorPassword}
					helperText={errorPassword.value}
				/>
				<button
					className='w-full md:w-5/12 mt-10 md:mt-5 active:bg-[#7a221c] duration-300 hover:bg-[#f72415] py-2 px-4 rounded-full bg-[#F9675C] text-white text-md font-light tracking-normal'
					variant='contained'
					type='submit'
				>
					เข้าสู่ระบบ
				</button>
				<div className='w-full'>
					<Link href='/register' className='no-underline'>
						<a className='float-right text-right cursor-pointer text-[#F9675C] hover:text-[#f72415] mt-10 md:mt-7 text-sm font-light'>
							สร้างบัญชีผู้ใช้
						</a>
					</Link>
				</div>
			</Box>
		</>
	);
}
