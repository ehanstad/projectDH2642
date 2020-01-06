import React, { Component } from "react";
import "./result.css";
import { connect } from 'react-redux';
import { addTeam } from '../../actions/authActions'
import { imageExists } from "../../images/image";
import noTeam from '../../images/noTeam.png'

class Result extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() { }

    componentWillUnmount() { }

    render() {
        let teamList = null;
        switch (this.props.isLoading) {
            case true:
                teamList = (
                    <div className={"loader-wrapper"}>
                        <div className={"loader"}></div>
                    </div>)
                break;
            case false:
                teamList = this.props.search.teams.map(team =>(
                    <div key={team.id}>
                        <img className={"result-img"} src={imageExists(team.crestUrl) ? team.crestUrl : noTeam}/>
                        {team.name}
                        <button value={JSON.stringify(team)} onClick={this.addClickedTeam}>Add to favorite</button>
                    </div>
                ));
                break;
            default:
                teamList = <b>Failed to load data, please try again</b>;
                break;
        }
        return  <div className={"Result"}>
                        {teamList}
                </div>;
    }

    addClickedTeam = e => {
        const team = JSON.parse(e.target.value);
        Object.assign(team, {league: this.props.search.league});
        this.props.dispatch(addTeam(team, this.props.user._id));
    };
}

export default connect(store => {
    return {
        isLoading: store.api.search.isLoading,
        user: store.auth.user,
        search: store.api.search.results
    };
})(Result)