import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/logIn/logIn";
import Registration from "./components/signUp/signUp";
import SelectTeams from "./components/selectTeams/selectTeams";
import Table from "./components/table/table";
import modelInstance from "./data/model";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "BỌỌLU",
        };
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/search" render={() => <SelectTeams model={modelInstance} />}/>
                <Route exact path="/table" render={() => <Table model={modelInstance} />}/>
            </div>
        );
    }
}

export default App;