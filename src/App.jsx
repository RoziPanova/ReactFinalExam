import Header from './components/header/Header'
import { Routes, Route } from 'react-router';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Details from './components/details/Details';
import LikedPosts from './components/likedPosts/LikedPosts';
import FollowersPosts from './components/followersPosts/FollowersPosts';
import Profile from './components/profile/Profile';

function App() {

    return (
        <> 
            <Header />

            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/details/:postId' element={<Details />}/>
                <Route path='/likedPosts' element={<LikedPosts />}/>
                <Route path='/followersPosts' element={<FollowersPosts />}/>
                <Route path='/profile/:userId' element={<Profile />}/>
            </Routes>
            
            <Footer />
        </>
    );
}

export default App;
