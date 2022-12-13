export const CollApsedReducer = (prevState={
    isCollapsed: false
}, actions) => {
    // console.log(actions,'ac');
    const {type} = actions;
    switch(type) {
        case 'change_collapsed':
            let newsState = {...prevState};
            newsState.isCollapsed = !newsState.isCollapsed;
            return newsState;
        default:
            return prevState;
    }
}