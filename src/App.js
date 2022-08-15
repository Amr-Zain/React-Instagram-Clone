import React from "react"
import './styles/App.css';
import {BrowserRouter as Router , Routes,Route,Navigate} from "react-router-dom"
//import Login from "./pages/Login"
import * as PATHS from './constants/Routes'
import UserContext from "./contexts/UserContext";
import useAuthUserListener from "./hooks/useAthUserListener"
import useActiveUser from "./hooks/useActiveUser"
import ActiveUserDataContext from './contexts/ActiveUserDataContext'
import SharedLayout from './components/SharedLayout'
//import FirebaseContext from './contexts/firebase'

const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotAvailable = React.lazy(() => import('./pages/NotAvailable'));

function App() {
  const user = useAuthUserListener();
  //const {auth} = React.useContext(FirebaseContext);
  //const currUser = auth.currentUser;
  const { activeUserData:userData } = useActiveUser(user?.uid)
  
  return (<div>
          <UserContext.Provider value={user}>
          <ActiveUserDataContext.Provider value={userData}>
            <Router>
              <React.Suspense fallback={<h3>Loading</h3>} >
                <Routes>
                  {
                  user?
                  <>
                    <Route path="/" element={<SharedLayout />}>
                      <Route path = {PATHS.HOME} element ={<Dashboard />}/> 
                      <Route path = {`${PATHS.PROFILE}/:username`} element={<Profile />}/>
                      <Route path="*" element ={<NotAvailable/>}/>
                    </Route>
                    
                    <Route path={PATHS.SIGN_UP} element={<Navigate replace to={PATHS.HOME} />} />
                    <Route path={PATHS.LOGIN} element={<Navigate replace to={PATHS.HOME} />} />
                  </>
                  : 
                  <>
                    <Route path={PATHS.LOGIN} element={<Login/>} />
                    <Route path={PATHS.HOME} element={<Navigate replace to={PATHS.LOGIN} />} />
                    <Route path={PATHS.SIGN_UP} element={<Signup />} />
                    <Route path="/" element={<SharedLayout />}>
                      <Route path = {`${PATHS.PROFILE}/:username`} element={<Profile />}/>
                      <Route path="*" element ={<NotAvailable/>}/>
                    </Route>
                  </>
                  }

                </Routes>
              </React.Suspense>
            </Router>
          </ActiveUserDataContext.Provider>
            
          </UserContext.Provider>
          </div>
    
  );
}

export default App;
