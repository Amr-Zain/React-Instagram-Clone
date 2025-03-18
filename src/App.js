import React from "react"
import './styles/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import * as PATHS from './constants/Routes'
import UserContext from "./contexts/UserContext";
import useAuthUserListener from "./hooks/useAthUserListener"
import useActiveUser from "./hooks/useActiveUser"
import ActiveUserDataContext from './contexts/ActiveUserDataContext'
import SharedLayout from './components/SharedLayout'
import AuthRoute from "./routes/authRoutes";
import ProtectedRoute from "./routes/protectedRoutes";

const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotAvailable = React.lazy(() => import('./pages/NotAvailable'));

function App() {
  const user = useAuthUserListener();
  const { activeUserData: userData } = useActiveUser(user?.uid);

  return (
    <div>
      <UserContext.Provider value={user}>
        <ActiveUserDataContext.Provider value={userData}>
          <Router>
            <React.Suspense fallback={<h3>Loading</h3>}>
              <Routes>
                <Route
                  path={PATHS.LOGIN}
                  element={
                    <AuthRoute user={user}>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route
                  path={PATHS.SIGN_UP}
                  element={
                    <AuthRoute user={user}>
                      <Signup />
                    </AuthRoute>
                  }
                />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute user={user}>
                      <SharedLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index path={PATHS.HOME} element={<Dashboard />} />
                  <Route path={`${PATHS.PROFILE}/:username`} element={<Profile />} />
                  <Route path="*" element={<NotAvailable />} />
                </Route>

                {/* <Route
                  path="/"
                  element={<Navigate to={user ? PATHS.HOME : PATHS.LOGIN} replace />}
                /> */}
              </Routes>
            </React.Suspense>
          </Router>
        </ActiveUserDataContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;