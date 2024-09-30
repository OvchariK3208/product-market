import axios from 'axios';

export default axios.create({
	baseURL: 'https://66df2b92de4426916ee3c37d.mockapi.io',
	headers: {
		'Content-type': 'application/json',
	},
});