var initialState = {
    player: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        
        case 'DISPLAY_PLAYER':

            var newState = Object.assign({}, state)
            newState.player = action.player;
            return newState;

        default:
            return state;
            
    }
}