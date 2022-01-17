import React, { useState, useEffect } from 'react';
import Navbar from './../Navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
	const router = useRouter();
	// useEffect(() => {
	// 	console.log('path : ', router.pathname);
	// }, [router.pathname]);
	if (router.pathname == '/' || router.pathname == '/register') {
		return <>{children}</>;
	} else {
		return (
			<>
				<Navbar />
				{children}
			</>
		);
	}
}
