const rootReducer = (state = true, action) => {

    switch (action.type) {

        case 'TOGGLE_FORM':
            //return opposite of state
            return !state;

        default:
            return state;
    }

}

export default rootReducer;