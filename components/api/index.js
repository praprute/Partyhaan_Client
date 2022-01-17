import { API } from './../../config';
import axios from 'axios';

export const registerUser = async (index) => {
	try {
		let response = await axios({
			url: `${API}/signup`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
			data: JSON.stringify(index),
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const SignIn = async (index) => {
	try {
		let response = await axios({
			url: `${API}/signin`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify(index),
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const getType = async () => {
	try {
		let response = await axios({
			url: `${API}/getType`,
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const getParty = async () => {
	try {
		let response = await axios({
			url: `${API}/getPartyRoom`,
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}
;
export const getPeople = async (idRoom) => {
	try {
		let response = await axios({
			url: `${API}/getPeopleJoin/${idRoom}`,
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const createParty = async (token, index) => {
	try {
		let response = await axios({
			url: `${API}/created`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify(index),
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const getImage = async (index) => {
	try {
		let dataImage = { type: index };
		let response = await axios({
			url: `${API}/getImage`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify(dataImage),
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};

export const JoinParty = async (token, index) => {
	try {
		let response = await axios({
			url: `${API}/JoinParty`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify(index),
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};
