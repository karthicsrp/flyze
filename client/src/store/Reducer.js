const initialstore = {
    userData: [],
    isValidUser: false,
    username: '',
    userType: '',
};

const reducer = function(state = initialstore, action) {
    switch(action.type) {
        case 'SET_DATA' :
            return {
                ...state,
                isValidUser: action.payload.isValidUser,
                username: action.payload.username,
                userData: action.payload.userData,
                userType: action.payload.userType
            }
        case 'REMOVE_USER': {
            return {
                ...initialstore
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
    
}

export default reducer;