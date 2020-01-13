import React, { Component } from "react";
import "./sidebar.css";
import {connect} from "react-redux";
import {removeTeam} from '../../actions/authActions'
import noTeam from "../../images/noTeam.png";
import Image from "../image";
import {setFocusedTeam} from "../../actions/apiActions";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedTeam: null
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() { }
    render() {
        let teamList = null;
        switch(this.props.auth.user == null) {
            case true:
                if(!this.props.auth.isAuthorized && !this.props.isLoading){
                    teamList = (
                        <div>Sign in to access this feature</div>
                    )
                }else {
                    teamList = (
                        <div className={"loader-wrapper"}>
                            <div className={"loader"}></div>
                        </div>)
                }
                break;
            case false:
                if (this.props.auth.user.favTeams.length > 0) {
                    let focusedTeam = null;
                    if(this.props.api.focusedTeam){
                        focusedTeam = this.props.api.focusedTeam.id
                    }else{
                        this.props.dispatch(setFocusedTeam(this.props.auth.user.favTeams[0].id,this.props.auth.user.favTeams[0].name, this.props.auth.user.favTeams[0].league))
                        focusedTeam = this.props.auth.user.favTeams[0].id;
                    }
                    teamList = (
                        this.props.auth.user.favTeams.map(team => {
                            if(team.id == focusedTeam){
                                return (
                                    <div id={team.id} key={team.id} className={"sidebar-team active"}>
                                        <Image className={"result-img"} src={team.crestUrl} fallback={noTeam}/>
                                        {team.name}
                                        <button value={JSON.stringify(team)} onClick={this.removeClickedTeam}>Remove</button>
                                    </div>
                                )
                            }else{
                                return (
                                    <div id={JSON.stringify(team)} key={team.id} className={"sidebar-team"} onClick={this.changeFocusedTeam}>
                                        <Image className={"result-img"} src={team.crestUrl} fallback={noTeam}/>
                                        {team.name}
                                        <button value={JSON.stringify(team)} onClick={this.removeClickedTeam}>Remove</button>
                                    </div>
                                )
                            }
                        })
                    )
                } else {
                    teamList = <b>No teams added yet</b>;
                }

                break;
            default:
                teamList = <b>Failed to load data, please try again</b>;
                break;
        }
        return (
            <div className={"Sidebar"}>
                <h2>Favorite Teams</h2>
                {teamList}
            </div>)
    }
    removeClickedTeam = e =>{
        const team = JSON.parse(e.target.value);
        this.props.dispatch(removeTeam(team, this.props.auth.user._id));
    };

    changeFocusedTeam = e =>{
        const team = JSON.parse(e.target.id);
        this.props.dispatch(setFocusedTeam(team.id, team.name, team.league))
    };
}
const mapStateToProps = (state) =>({
    auth: state.auth,
    api: state.api
});
export default connect(
    mapStateToProps,
    null
)(Sidebar);
