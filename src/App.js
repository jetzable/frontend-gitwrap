import './App.css';
import SearchReposByUsername from './components/SearchReposByUsername';
import ReposContainer from './components/ReposContainer';
import PullRequest from './components/PullRequest';
import PullRequests from './components/PullRequests';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

function App() {
  const username = useSelector((state) => state.username.value);
  const selectedRepo = useSelector((state) => state.selectedRepo.value);
  return (
    <div className="container">
      <SearchReposByUsername />
      <Routes>
        <Route path="/" element={username !== '' && selectedRepo ? <ReposContainer /> : 'Search for a username'} />
        <Route path="/pull-request" element={<PullRequest />} />
        <Route path="/pull-requests" element={<PullRequests />} />
      </Routes>
    </div>
  );
}

export default App;
