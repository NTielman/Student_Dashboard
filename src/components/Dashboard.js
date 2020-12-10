import React from 'react';
import HomePage from "./HomePage";
import Nav from "./Nav";
import SortMenu from "./SortMenu";
import StudentPage from "./StudentPage";
import OpdrachtPage from './OpdrachtPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const Dashboard = () => {

    return (
        <Router>
            <div>
                <Nav />
                <SortMenu />
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path="/StudentPage/:name">
                        <StudentPage />
                    </Route>
                    <Route path="/OpdrachtPage/:title">
                        <OpdrachtPage />
                    </Route>
                </Switch>

            </div>
        </Router>
    )
};

export default Dashboard;