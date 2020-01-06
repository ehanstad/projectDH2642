import React, { Component } from "react";
import Result from "../result/result";
import NavBar from "../navBar/navBar";
import "./search.css";
import Sidebar from "../sidebar/sidebar";
import {connect} from "react-redux";
import {getTeams} from "../../actions/apiActions";

class Search extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    componentWillUnmount() { }

    render() {
        return (
            <div className={"Search"}>
                <NavBar/>
                <div>
                    <Sidebar model={this.props.model}/>
                    <div>
                        <div id={"search-bar"}>
                            <input type={"text"} placeholder={"Enter a key word"} id={"search-query"}/>
                            <select id={"search-select"} onChange={this.onLeagueSelect}>
                                <option value="PL">Premier League</option>
                                <option value="ELC">Championship</option>
                                <option value="PD">La Liga</option>
                                <option value="SA">Serie A</option>
                                <option value="BL1">1. Bundesliga</option>
                                <option value="FL1">Ligue 1</option>
                                <option value="DED">Eredivisie</option>
                                <option value="PPL">Primeira Liga</option>
                            </select>
                            <button value={this.props.search.query}
                                    onClick={this.onSearch}>search</button>
                        </div>
                        <Result/>
                    </div>
                </div>
            </div>)
    }
    onSearch = e =>{
        this.props.dispatch(getTeams(this.props.search.league, e.target.parentElement.firstElementChild.value))
    };
    onLeagueSelect = e => {
        this.props.dispatch(getTeams(e.target.value, this.props.search.query))
    };
}

export default connect(store => {
    return {
        search: store.api.search.results
    };
})(Search)