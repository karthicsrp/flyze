const initialstore = {
    userData: [],
    isValidUser: false,
    username: '',
    userType: '',
    orderData: '',
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
        case 'SET_ORDER_DATA' :
            return {
                ...state,
                orderData: action.payload.orderData
            }
        default: {
            return {
                ...state
            }
        }
    }
    
}

export default reducer;