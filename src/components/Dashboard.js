/* -------------- Displays dashboard components layout and routes between components -------------- */
import React from 'react';
import Nav from "./Nav";
import HomePage from "./HomePage";
import StudentPage from "./StudentPage";
import AssignmentPage from './AssignmentPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const Dashboard = () => {

    return (
        <Router>
            <div className='dashboard-container'>
                <Nav />
                <div className='main-content'>
                    <Switch>

                        <Route path='/' exact component={HomePage} />
                        <Route path="/StudentPage/:name" component={StudentPage} />
                        <Route path="/AssignmentPage/:title" component={AssignmentPage} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

export default Dashboard;