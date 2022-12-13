export const LoadingReducer = (prevState = {
    isLoading: true
}, actions) => {
    const {type, payload} = actions;
    switch(type) {
        case 'change_loading':
            let newsState = {...prevState};
            newsState.isLoading = payload;
            return newsState;
        default:
            return prevState;
    }
};