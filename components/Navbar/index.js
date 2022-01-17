import React, { useState, useEffect } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { AiOutlineClose, AiOutlineLogin } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Link from '@mui/material/Link';
// import logo from '../../img/party_haan.png';

const NavBarItem = ({ title, classprops }) => (
	<li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
	const router = useRouter();
	const [toggleMenu, setToggleMenu] = React.useState(false);
	const [token, setToken] = useState(Cookies.get('tokenPartyHaan'));
	const [auth, setAuth] = useState(false);

	const logOut = () => {
		Cookies.remove('tokenPartyHaan');
		router.push('/');
	};
	const Register = () => {
		router.push('/register');
	};

	const AuthComponent = () => {
		if (token == undefined) {
			return (
				<ul className='text-black md:flex hidden list-none flex-row justify-between items-center flex-initial'>
					<li
						onClick={Register}
						className='flex text-[#FFFFFF] duration-300 justify-center items-center bg-gray-800 py-2 px-3 mx-0 rounded-md cursor-pointer active:bg-gray-600 hover:bg-gray-700'
					>
						Register
					</li>
					<li
						onClick={logOut}
						className='flex text-[#FFFFFF] duration-300 justify-center items-center bg-gray-800 py-2 px-3 mx-4 rounded-md cursor-pointer active:bg-gray-600 hover:bg-gray-700'
					>
						Login
						<AiOutlineLogin
							fontSize={18}
							className='text-[#FFFFFF]  cursor-pointer ml-2 mr-0'
						/>
					</li>
				</ul>
			);
		} else {
			return (
				<ul
					onClick={logOut}
					className='text-black md:flex hidden list-none flex-row justify-between items-center flex-initial'
				>
					<li className='flex text-[#FFFFFF] duration-300 justify-center items-center bg-gray-800 py-2 px-3 mx-0 rounded-md cursor-pointer active:bg-gray-600 hover:bg-gray-700'>
						Sign out
						<FaSignOutAlt
							fontSize={18}
							className='text-[#FFFFFF]  cursor-pointer ml-2 mr-0'
						/>
					</li>
				</ul>
			);
		}
	};

	return (
		<nav className='absolute overflow-hidden z-40 top-0 bg-white bg-opacity-80  w-full flex md:justify-center justify-between items-center pl-2 pr-2 pt-0'>
			<div className='md:flex-[0.5] flex justify-start items-center'>
				{/* flex-initial */}
				<img
					src='/img/party_haan.png'
					alt='logo'
					className='w-20 cursor-pointer drop-shadow-xl m-0 p-0 border-transparent'
				/>
				<ul className='text-black md:flex hidden list-none flex-row justify-between items-center flex-initial'>
					{[
						{ path: 'Party', title: 'PARTY' },
						{ path: 'Create', title: 'CREATE' },
					].map((item, index) => (
						<Link
							href={`/${item.path}`}
							underline='none'
							className=' active:text-[#7a221c] hover:text-[#f72415] text-black cursor-pointer'
						>
							<NavBarItem
								key={item.path + index}
								title={item.title}
								classprops=' duration-300 active:text-[#7a221c] hover:text-[#f72415]'
							/>
						</Link>
					))}
				</ul>
			</div>
			{AuthComponent()}

			<div className='flex relative'>
				{!toggleMenu && (
					<HiMenuAlt3
						fontSize={28}
						className='text-[#f72415] md:hidden cursor-pointer'
						onClick={() => setToggleMenu(true)}
					/>
				)}
				{toggleMenu && (
					<AiOutlineClose
						fontSize={28}
						className='text-white md:hidden cursor-pointer'
						onClick={() => setToggleMenu(false)}
					/>
				)}
				{toggleMenu && (
					<ul
						className='z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
					>
						<li className='text-xl w-full my-2'>
							<AiOutlineClose onClick={() => setToggleMenu(false)} />
						</li>
						{[
							{ path: 'Party', title: 'PARTY' },
							{ path: 'Create', title: 'CREATE' },
						].map((item, index) => (
							<Link
								href={`/${item}`}
								underline='none'
								className=' active:text-slate-400 hover:text-slate-300 text-slate-50 cursor-pointer'
							>
								{' '}
								<NavBarItem
									key={item + index}
									title={item}
									classprops='my-2 text-lg'
								/>
							</Link>
						))}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
