var initialState = {
    player: {},
    draftDollar: {},
    teams: [],
    teamMap: {},
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
            if (action.playerId)
            {
                newState.player = state.playerMap[action.playerId];
            }
            else
            {
                newState.player = {};
            }

            newState.draftDollar = {};
            return newState;
        case 'DISPLAY_DRAFT_DOLLAR':
            var newState = Object.assign({}, state);
            newState.draftDollar = action.draftDollar;

            newState.player = {};
            return newState;
        case 'DISPLAY_DRAFT_HISTORY':
            var newState = Object.assign({}, state);
            newState.picks = action.picks;

            return newState;
        case 'GET_TEAMS':
        	var newState = Object.assign({}, state);
            newState.teams = action.teams;
            newState.teamMap = {};
            action.teams.map(function(team) {
                newState.teamMap[team.id] = team;
            });
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