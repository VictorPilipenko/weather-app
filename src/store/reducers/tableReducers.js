const dataReducerDefaultState = {
    dataPage: [],
    dataAll: []
};

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {
        case 'ARR_DATA_PAGE':
            return {
                ...state,
                dataPage: action.payload
            };
        case 'ARR_DATA_ALL':
            return {
                ...state,
                dataAll: action.payload
            };
        default:
            return state;
    }
}
