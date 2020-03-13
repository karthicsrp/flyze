import Store from "./Store";

export const get_user_data = id => {
	return fetch('http://localhost:4000/server?id='+id)
		.then(response => response.json())
		.then(response => { 
				let userDetail = response[0];
				Store.dispatch({
					type : "SET_DATA",
					payload : {
						isValidUser: true,
						username: userDetail.name,
						userData: response
					}
				})
			})
		.catch(err => console.log(err))
};