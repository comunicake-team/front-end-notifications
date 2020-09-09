import { useState, useEffect } from 'react';

const useRequest = (request, dependencies = []) => {
	const [state, setState] = useState({
		loading: true,
		data: undefined,
		refetch: fetchData,
	});

	function fetchData() {
		setState({ ...state, loading: true });
		request()
			.then(data => {
				setState({
					...state,
					loading: false,
					data,
				});
			})
			.catch(error => setState({ ...state, loading: false }));
	}

	useEffect(() => {
		fetchData();

		// This is to disable the warning that appears when dependencies aren't defined
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return state;
};

export default useRequest;
