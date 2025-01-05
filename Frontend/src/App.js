import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login/Login';
import ErrorPage from './components/error/ErrorPage';

import MenuManager from './components/menu/MenuManager';

import ApplicationMenu from './components/menu/application-menu/ApplicationMenu';
import ViewAllApplicationDetails from './components/menu/application-menu/ViewAllApplicationDetails';
import CreateApplication from './components/menu/application-menu/CreateApplication';
import UpdateApplication from './components/menu/application-menu/UpdateApplication';
import DeleteApplication from './components/menu/application-menu/DeleteApplication';
import ViewApplicationById from './components/menu/application-menu/ViewApplicationById';
import ViewApplicationByName from './components/menu/application-menu/ViewApplicationByName';

import BugMenu from './components/menu/bug-menu/BugMenu';
import ViewAllBugDetails from './components/menu/bug-menu/ViewAllBugDetails';
import CreateBug from './components/menu/bug-menu/CreateBug';
import UpdateBug from './components/menu/bug-menu/UpdateBug';
import DeleteBug from './components/menu/bug-menu/DeleteBug';
import ViewBugById from './components/menu/bug-menu/ViewBugById';
import ViewBugByStatus from './components/menu/bug-menu/ViewBugByStatus';

import ReleaseMenu from './components/menu/release-menu/ReleaseMenu';
import ViewAllReleaseDetails from './components/menu/release-menu/ViewAllReleaseDetails';
import CreateRelease from './components/menu/release-menu/CreateRelease';
import UpdateRelease from './components/menu/release-menu/UpdateRelease';
import DeleteRelease from './components/menu/release-menu/DeleteRelease';
import ViewReleaseById from './components/menu/release-menu/ViewReleaseById';
import ViewReleaseByName from './components/menu/release-menu/ViewReleaseByName';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if(storedUser){
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('loggedInUser', JSON.stringify(username));
    setLoggedInUser(username);
  };

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/menu-manager" element={loggedInUser ? <MenuManager /> : <ErrorPage />} />

          {/* Application Menu */}
          <Route path="/application-management" element={<ApplicationMenu />} />
          <Route path="/applications-view-all" element={<ViewAllApplicationDetails />} />
          <Route path="/applications-create" element={<CreateApplication />} />
          <Route path="/applications-update" element={<UpdateApplication />} />
          <Route path="/applications-delete" element={<DeleteApplication />} />
          <Route path="/applications-view-by-id" element={<ViewApplicationById />} />
          <Route path="/applications-view-by-name" element={<ViewApplicationByName />} />

          {/* Bug Menu */}
          <Route path="/bug-management" element={<BugMenu />} />
          <Route path="/bugs-view-all" element={<ViewAllBugDetails />} />
          <Route path="/bugs-create" element={<CreateBug />} />
          <Route path="/bugs-update" element={<UpdateBug />} />
          <Route path="/bugs-delete" element={<DeleteBug />} />
          <Route path="/bugs-view-by-id" element={<ViewBugById />} />
          <Route path="/bugs-view-by-status" element={<ViewBugByStatus />} />

          {/* Release Menu */}
          <Route path="/release-management" element={<ReleaseMenu />} />
          <Route path="/releases-view-all" element={<ViewAllReleaseDetails />} />
          <Route path="/releases-create" element={<CreateRelease />} />
          <Route path="/releases-update" element={<UpdateRelease />} />
          <Route path="/releases-delete" element={<DeleteRelease />} />
          <Route path="/releases-view-by-id" element={<ViewReleaseById />} />
          <Route path="/releases-view-by-name" element={<ViewReleaseByName />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
