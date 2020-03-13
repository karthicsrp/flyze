const initialstore = {
    userData: [],
    isValidUser: false,
    username: ''
};

const reducer = function(state = initialstore, action) {
    switch(action.type) {
        case 'SET_DATA' :
            return {
                ...state,
                isValidUser: action.payload.isValidUser,
                username: action.payload.username,
                userData: action.payload.userData
            }
        default: {
            return {
                ...state
            }
        }
    }
	return state;
}

export default reducer;