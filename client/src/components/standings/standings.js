import React, { Component } from "react";
import "./standings.css";
import {connect} from "react-redux";
import {getStandings} from "../../actions/apiActions";


class Standings extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.dispatch(getStandings(this.props.focusedTeam.league, '2019'))
    }

    componentWillUnmount() { }

    render() {
        let standings = null;

        switch(this.props.standings.isLoading){
            case true:
                standings = (
                    <div className={"loader-wrapper"}>
                        <div className={"loader"}></div>
                    </div>
                );
                break;
            case false:
                standings = <div>
                    <h2>{this.props.focusedTeam.league}</h2>
                    <table><tbody>
                    <tr key={this.props.focusedTeam.league}>
                        <th>#</th>
                        <th>Club</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>PTS</th>
                    </tr>
                    {this.props.standings.results.table.map(team => (
                        <tr key={team.id}>
                            <td>{team.position}</td>
                            <td>{team.team.name}</td>
                            <td>{team.playedGames}</td>
                            <td>{team.won}</td>
                            <td>{team.draw}</td>
                            <td>{team.lost}</td>
                            <td>{team.goalsFor}</td>
                            <td>{team.goalsAgainst}</td>
                            <td>{team.goalDifference}</td>
                            <td>{team.points}</td>
                        </tr>
                ))}</tbody></table>
                </div>;
                break;
            default:
                standings = <b>Failed to load data, please try again</b>;
            break;
        }
        return (
            <div className={"Standings"}>
                {standings}
            </div>
        );
    }
}

export default connect(store => {
    return {
        standings: store.api.standings,
        focusedTeam: store.api.focusedTeam
    };
})(Standings);