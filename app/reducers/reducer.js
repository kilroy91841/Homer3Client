var initialState = {
    player: {},
    teams: [],
    playerMap: {},
    metadata: {},
    progressBar: {
        percent: -1
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        
        case 'PUT_PLAYER_IN_MAP':
            var newState = Object.assign({}, state);
            newState.playerMap[action.player.id] = action.player;
            return newState;
        case 'DISPLAY_PLAYER':
            var newState = Object.assign({}, state);
            newState.player = state.playerMap[action.playerId];
            return newState;
        case 'GET_TEAMS':
        	var newState = Object.assign({}, state);
            newState.teams = action.teams;
            return newState;
        case 'PROGRESS_BAR':
            var newState = Object.assign({}, state);
            newState.progressBar = action.progressBar;
            return newState;
        case 'METADATA':
            var newState = Object.assign({}, state);
            newState.metadata = action.metadata;
            return newState;
        case 'GET_PLAYER_MAP':
            var newState = Object.assign({}, state);
            newState.playerMap = action.playerMap;
            return newState;
        default:
            return state;
            
    }
}