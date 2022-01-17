import React, { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { IoIosPeople } from 'react-icons/io';
import { getImage, JoinParty, getPeople } from './../api';
import Cookies from 'js-cookie';
import styles from './../../styles/Home.module.css';

export default function CardParty(props) {
	const [imageb64, setImageb64] = useState('');
	const [token, setToken] = useState(Cookies.get('tokenPartyHaan'));
	const [qPeople, setQPeople] = useState(0);
	const [reCom, setReCom] = useState(true);

	useEffect(async () => {
		try {
			let responseData = await getImage(props.typeRoom);
			if (responseData.success == 'success') {
				setImageb64(responseData.message);
				setReCom(!reCom);
			}

			let responnsePeople = await getPeople(props.idroomJoin);
			// console.log('responnsePeople : ', responnsePeople);
			if (responnsePeople.success == 'success') {
				setQPeople(responnsePeople.message.length);
				setReCom(!reCom);
			}

		} catch (err) {
			console.log(err);
		}
	}, []);

	const fetchPeople = async () => {
		try {
			let responnsePeople = await getPeople(props.idroomJoin);
			// console.log('responnsePeople : ', responnsePeople);
			if (responnsePeople.success == 'success') {
				setQPeople(responnsePeople.message.length);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleJoin = async (event) => {
		event.preventDefault();
		try {
			let index = {
				idRoom: props.idroomJoin,
			};

			if (token == undefined) {
				alert('กรุณาเข้าสู่ระบบ');
			} else {
				if (qPeople == props.quantity) {
					alert('ปาตี้นี้เต็มเเล้ว');
				} else {
					let responseJoin = await JoinParty(token, index);
					let fetchQuantity = await fetchPeople();
					if (responseJoin) {
						setReCom(!reCom);
					}
					alert(responseJoin.message_th);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className={` ${styles.BoxSigin} max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700`}
		>
			<div className='w-full flex justify-center items-center p-5'>
				<img
					className='p-0 rounded-t-lg rounded-b-lg w-full h-80'
					src={imageb64}
					alt='product image'
				/>
			</div>
			<div className='px-5 pb-5'>
				<a href='#'>
					<h3 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
						ชื่อปาตี้ : {props.partyName}
					</h3>
					<h4 className='text-sm font-semibold tracking-tight text-gray-900 dark:text-white'>
						รายละเอียดปาตี้ : {props.content.substring(0, 50)}
					</h4>
					<h4 className='text-sm font-semibold tracking-tight text-gray-900 dark:text-white'>
						ประเภทห้อง : {props.typeRoom}
					</h4>
				</a>
				<Divider className='text-white bg-white w-full my-3' />
				<div className='flex justify-between items-center'>
					<div className='flex justify-start items-center'>
						<IoIosPeople className='text-4xl font-bold dark:text-white mr-3' />
						<span className='flex justify-center items-center text-3xl font-bold text-gray-900 dark:text-white'>
							{' '}
							{qPeople} / {props.quantity}
						</span>
					</div>

					<a
						onClick={handleJoin}
						className='cursor-pointer shadow-md shadow-blue-500/50 duration-300 active:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						Join
					</a>
				</div>
			</div>
		</div>
	);
}
