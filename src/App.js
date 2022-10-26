import React, { useEffect} from 'react';
import {
  Switch,
  useHistory,
} from 'react-router-dom';

import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import SignUpCyberBugs from "./pages/CyberBugs/SignUpCyberBugs/SignUpCyberBugs";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberBugs from "./pages/CyberBugs/ProjectDetail/indexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import UserAdmin from "./pages/CyberBugs/UserAdmin/UserAdmin";
import DrawerCyberBugs from "./HOC/CyberbugsHOC/DrawerCyberBugs";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history });
  }, []);

  return (
    <>
      {/* <Modal /> */}
      <LoadingComponent />

      <DrawerCyberBugs />

      <Switch>
        {/* <HomeTemplate path="/home" exact Component={Home} /> */}

        {/* <HomeTemplate exact path="/contact" Component={Contact} /> */}
        {/* <HomeTemplate exact path="/about" Component={About} /> */}
        {/* <HomeTemplate exact path="/dragdrop" Component={DemoDragDrop} /> */}

        {/* <HomeTemplate exact path="/detail/:id" Component={Detail} /> */}
        {/* <HomeTemplate exact path="/profile" Component={Profile} /> */}
        {/* <HomeTemplate
          exact
          path="/demodragdropdnd"
          Component={DragAndDropDnD}
        /> */}
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <UserLoginTemplate exact path="/signup" Component={SignUpCyberBugs} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={indexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate exact path="/usermanagement" Component={UserAdmin} />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={indexCyberBugs}
        />

        <UserLoginTemplate exact path="/" Component={LoginCyberBugs} />
        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
