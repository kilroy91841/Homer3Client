var initialState = {
    player: {},
    teams: [],
    progressBar: {
        percent: -1
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        
        case 'DISPLAY_PLAYER':
            var newState = Object.assign({}, state)
            newState.player = action.player;
            return newState;
        case 'GET_TEAMS':
        	var newState = Object.assign({}, state)
            newState.teams = action.teams;
            return newState;
        case 'PROGRESS_BAR':
            var newState = Object.assign({}, state)
            newState.progressBar = action.progressBar;
            return newState;
        default:
            return state;
            
    }
}