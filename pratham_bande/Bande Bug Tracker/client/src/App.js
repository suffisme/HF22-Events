import React, { useEffect, useState, Suspense, useCallback } from 'react';
import NavBar from './components/Layout/NavBar';
import { Redirect, Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import InitialCheck from './Wayauth/InitialCheck';
import Spinner from './components/UI/Spinner';
import Layout from './components/Layout/Layout';
import Addbug from './pages/Addbug';
import ReportedBug from './pages/ReportedBug';
import AssignUser from './pages/AssignUser';
import BugDetail from './components/Bugs/BugDetail';
import AssignTester from './pages/AssignTester';
import VerifyBug from './pages/VerifyBug';
import AssignDeveloper from './pages/AssignDeveloper';
import ImproveBug from './pages/ImproveBug';
import VerifyPatch from './pages/VerifyPatch';

const Landing = React.lazy(() => import("./pages/Landing"))
const Login = React.lazy(() => import("./pages/Login"))
const Signup = React.lazy(() => import("./pages/Signup"))

function App() {

  // const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  //const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    await InitialCheck().then((response) => {
      if (response.isLoggedIn) {
        dispatch(authActions.login(response.user));
        setIsLoggedIn(true);
      }
    })
    console.log("oyeeee");
  }, []);

  useEffect(() => {
    init().then(() => {
      setIsLoading(false);
      console.log("bruh" + isLoggedIn);
    });
  }, [init]);

  if (!isLoggedIn) {
    console.log("fff");
    return (
      <Layout>
      <Suspense fallback={<Spinner />}>
        {!isLoading &&
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <Landing />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Redirect to="/home" />
          </Switch>
        }
      </Suspense>
    </Layout>
    )
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        {!isLoading &&
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <Landing />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/addBug" exact>
              <Addbug />
            </Route>
            <Route path="/yourBugs" exact>
              <ReportedBug />
            </Route>
            <Route path="/assignRoles" exact>
              <AssignUser />
            </Route>
            <Route path="/assignTester" exact>
              <AssignTester />
            </Route>
            <Route path="/assignDev" exact>
              <AssignDeveloper />
            </Route>
            <Route path="/verifyBug" exact>
              <VerifyBug />
            </Route>
            <Route path="/improveBug" exact>
              <ImproveBug />
            </Route>
            <Route path="/verifyPatch" exact>
              <VerifyPatch />
            </Route>
            <Route path="/bugDetail/:bugId">
              <BugDetail />
            </Route>
          </Switch>
        }
      </Suspense>
    </Layout>
  );
}

export default App;

{/* {isLoading && <Spinner />}
{!isLoading && isLoggedIn && <Landing />}
{!isLoading && !isLoggedIn && <Signup />} */}