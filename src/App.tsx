import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.scss';
import FullPageScroll from './components/FullPageScroll';
import './firebase.js';
import { setUser } from './redux/slices/userSlice.js';

const SettingsPage = lazy(() => import('./Pages/SettingsPage.js'));
const Projects = lazy(() => import('./Pages/ProjectsPage/Projects.js'));
const FullCardFullPage = lazy(() => import('./Pages/ProjectsPage/FullCardFullPage.js'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const LoginPage = lazy(() => import('./Pages/LoginPage/LoginPage'));

const App: React.FC = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const isLoading = useSelector((state: any) => state.setting.isLoading)
    
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
          dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken
          }))
        } else{
          dispatch(setUser({
            email: '',
            id: '',
            token: ''
          }))
        }
    });

    return (
      <>
        <div className="wrapper">
            {isLoading && <h1 className='Loading'>Loading...</h1>}
            <Routes>
                <Route path='/' element={<FullPageScroll />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/projects/:id' element={<FullCardFullPage />}/>
                <Route path='/Login' element={<LoginPage />}/>
                <Route path='/Settings' element={<SettingsPage />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
      </>
    )
}

export default App
