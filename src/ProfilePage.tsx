import InternshipHeader from './Internships/InternshipHeader';
import Profile from './Profile/Profile';
import Footer from '../src/HomePage/Footer';
import MarginBelowHeader from './Internships/MarginBelowHeader';

const ProfilePage = () => {
  return (
    <div>
      <InternshipHeader />
      <MarginBelowHeader />
      <Profile />
      <Footer />
    </div>
  )
}

export default ProfilePage;