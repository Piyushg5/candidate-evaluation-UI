import './App.css';
import { Route, Switch } from "react-router-dom";
import Candidate from './view/user/candidate';
import React, { Component } from 'react';
import UserLayout from './view/layout/userlayout'
import Requirements from './view/user/requirements';
import feedback from './view/user/feedback';
import skills from './view/user/skills';
import Login from './view/auth/login';
import addCandidate from './view/user/addCandidate';
import addRequirement from './view/user/addRequirement';
import AddSkills from './view/user/AddSkills';
import editSkills from './view/user/editSkills';
import updateCandidate from './view/user/updateCandidate';
import editRequirement from './view/user/editRequirement';
import addFeedback from './view/user/addFeedback';
import { AuthenticatedTemplate } from "@azure/msal-react";
import EnhancedTable from './view/user/dummy';
import User from './view/user/user';


class App extends Component {
  render() {

      let routes = (
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/dummy" exact component={EnhancedTable}/>
        <Route path="/user" exact component={User} />

    <AuthenticatedTemplate>
     <UserLayout>
          <Route path="/" exact component={Candidate} />
          <Route path="/candidates/add" exact component={addCandidate}/>
          <Route path="/candidate/update" exact component={updateCandidate}/>
          <Route path="/requirements" exact component={Requirements} />
          <Route path="/requirements/add" exact component={addRequirement}/>
          <Route path="/requirement/update" exact component={editRequirement}/>
          <Route path="/feedback" exact component={feedback} />
          <Route path="/feedback/add" exact component={addFeedback} />
          <Route path="/skills" exact component={skills} />
          <Route path="/skills/addSkills" exact component={AddSkills} />
          <Route path="/skills/editSkills" exact component={editSkills} />
      </UserLayout>
    </AuthenticatedTemplate>
      </Switch>
    );
    return (
      <div className="App">
          {routes}
      </div>
    );
  }
}

export default App;
