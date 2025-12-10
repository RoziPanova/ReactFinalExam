import Header from './components/header/Header'
import { Routes, Route } from 'react-router';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Details from './components/details/Details';
import LikedPosts from './components/likedPosts/LikedPosts';
import FollowersPosts from './components/followersPosts/FollowersPosts';
import Profile from './components/profile/Profile';
import EditProfile from './components/edit-profile/EditProfile';
import { useUserContext } from './contexts/UserContext';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
    
    const { user } = useUserContext();

    return (
        <> 
            <Header />

            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/details/:postId' element={<Details user={user} />}/>
                <Route path='/likedPosts' element={<LikedPosts />}/>
                <Route path='/followersPosts' element={<FollowersPosts />}/>
                <Route path='/profile/:userId' element={<Profile />}/>
                <Route path='/profile/:userId/edit' element={<EditProfile />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/> 
            </Routes>
            
            {/* <Footer /> */}
        </>
    );
}

export default App;
