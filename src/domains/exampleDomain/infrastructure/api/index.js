export const getServiceExample = () => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch('endpoint', requestOptions).then((res) => res.json());
};

export default { getServiceExample };
