import React, { Component } from "react";
import "./standings.css";
import {connect} from "react-redux";
import {getStandings} from "../../actions/apiActions";
import Image from "../image";
import noTeam from "../../images/noTeam.png";


class Standings extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() { }

    checkFocus(teamName) {
      return (this.props.focusedTeam.name === teamName) ? "focusedResult" : "unfocusedResult";
    }

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
                    <h2></h2>
                    <table><tbody>
                    <tr>
                        <th>#</th>
                        <th> </th>
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
                            <td className={this.checkFocus(team.team.name)}>{team.position}</td>
                            <td ><Image className={"standings-img"} src={team.team.crestUrl} fallback={noTeam}/></td>
                            <td className={this.checkFocus(team.team.name)}>{team.team.name}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.playedGames}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.won}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.draw}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.lost}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.goalsFor}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.goalsAgainst}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.goalDifference}</td>
                            <td className={this.checkFocus(team.team.name)}>{team.points}</td>
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
