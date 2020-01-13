import {BASE_URL, httpOptions} from "../apiConfig/apiConfig";
import {
    TEAMS_LOADED,
    STANDINGS_LOADED,
    SCORERS_LOADED,
    SCHEDULE_LOADED,
    TEAMS_LOADING,
    STANDINGS_LOADING,
    SCORERS_LOADING,
    SCHEDULE_LOADING,
    FOCUS_CHANGED
} from "../actions/types";

export const getTeams = (league, query) =>{
    return function(dispatch){
        dispatch({
            type: TEAMS_LOADING
        });
        const url = `${BASE_URL}/competitions/${league}/teams`;
        fetch(url, httpOptions)
            .then(response => response.json())
            .then(response =>{
            dispatch({
                type: TEAMS_LOADED,
                payload: {
                    league: league,
                    query: query,
                    teams: response.teams.filter(teams => teams.name.toUpperCase().includes(query.toUpperCase())),
                    isLoading: false
                    }
                });
            })
            .catch(err => {
                console.log('ERROR', err);
            });
    }
};

export const getStandings = (league, season='2019') =>{
    return function(dispatch){
        dispatch({
            type: STANDINGS_LOADING
        });
        const url = `${BASE_URL}/competitions/${league}/standings?season=${season}`
        fetch(url, httpOptions)
            .then(response => response.json())
            .then(response =>{
                dispatch({
                    type: STANDINGS_LOADED,
                    payload: {
                        table: response.standings[0].table,
                        homeTable: response.standings[1].table,
                        awayTable: response.standings[2].table
                    }
                })
            })
            .catch(err => {
                console.log('ERROR', err);
            });
    }
};

export const getTopScorers = (league, season='2019') =>{
    return function(dispatch){
        dispatch({
            type: SCORERS_LOADING
        });
        const url = `${BASE_URL}/competitions/${league}/scorers?season=${season}`
        fetch(url, httpOptions)
            .then(response => response.json())
            .then(response =>{
                dispatch({
                    type: SCORERS_LOADED,
                    payload: response.scorers
                })
            })
            .catch(err => {
                console.log('ERROR', err);
            });

    }
};

export const getSchedule = (teamId, league, season='2019') =>{
    return function(dispatch){
        dispatch({
            type: SCHEDULE_LOADING
        });
        const url = `${BASE_URL}/competitions/${league}/matches?season=${season}`;
        fetch(url, httpOptions)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: SCHEDULE_LOADED,
                    payload: response.matches.filter(matches =>
                        (matches.homeTeam.id == teamId) || (matches.awayTeam.id == teamId)
                      )
                })
            })
            .catch(err => {
                console.log('ERROR', err);
            });
    }
};

export const setFocusedTeam = (teamId,teamName, league) => {
    return function(dispatch) {
        dispatch(getSchedule(teamId, league));
        dispatch(getStandings(league));
        dispatch(getTopScorers(league));
        dispatch({
            type: FOCUS_CHANGED,
            payload: {
                id: teamId,
                name: teamName,
                league: league
            }
        })
    }
};
