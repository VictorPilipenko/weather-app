const dataReducerDefaultState = {
    data: []
};

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {
        case 'ARR_DATA':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
