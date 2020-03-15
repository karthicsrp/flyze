import Store from "./Store";

export const get_user_data = id => {
	return fetch(`http://localhost:4000/server?id=${id}`)
		.then(response => response.json())
		.then(response => { 
				if(response.length > 0) {
					let userDetail = response[0];
					Store.dispatch({
						type : "SET_DATA",
						payload : {
							isValidUser: true,
							userType: 'P',
							username: userDetail.name ? `hi ${userDetail.name}` : ``,
							userData: response
						}
					});
				}
				
			})
		.catch(err => console.log(err))
};

export const get_flight_data = (flightId, password) => { 
	return fetch(`http://localhost:4000/server/airHostessLogin?id=${flightId}&pass=${password}`)
		.then(response => response.json())
		.then(response => { 
				if(response.length > 0) {
					let userDetail = response[0];
					Store.dispatch({
						type : "SET_DATA",
						payload : {
							isValidUser: true,
							userType: 'A',
							username: userDetail.flight_id,
							userData: response
						}
					});
				}
				
			})
		.catch(err => console.log(err))
};
