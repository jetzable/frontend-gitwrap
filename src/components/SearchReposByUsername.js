import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { listRepos } from "../features/repos";
import { currentUsername } from "../features/username";
import { setSelectedRepo } from '../features/selectedRepo';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function SearchReposByUsername() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector((state) => state.repos.value)
  const selectedRepo = useSelector((state) => state.selectedRepo.value)

  async function searchRepos(e) {
      try {
        e.preventDefault()
        setLoading(true);
        const data = await axios({
          method: "get",
          url: `https://api.github.com/users/${username}/repos`,
          headers: {
            'Authorization': 'Bearer' + process.env.REACT_APP_PERSONAL_ACCESS_TOKEN
          }
        });
        dispatch(listRepos(data.data));
        dispatch(currentUsername(username));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  }

  function handleSelection(repo) {
    dispatch(setSelectedRepo({ name: repo.name, id: repo.id }));
  }

  document.addEventListener('click', (evt) => {
    if(evt.target.id !== 'repos-list') {
      dispatch(listRepos([]));
    }
  })

  useEffect(() => {
    navigate('/')
  }, [username])

  return (
    <div className="nav-bar">
      <div className="github-brand">
        <i className="fa-brands fa-github"></i>
        <span>Github Wrapper</span>
      </div>
      <form className="form" onSubmit={searchRepos}>
        <input
          className="input"
          value={username}
          placeholder="Github username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="button" type="submit">
          {loading ? "Searching..." : "Search"}
        </button>
        <ul id="repos-list" className="repos">
          {searchResults.map((repo) => (
            <li className="repo-item" key={repo.id} onClick={() => handleSelection(repo)}>
              <p>{repo.name}</p>
            </li>
          ))}
        </ul>
      </form>
      {selectedRepo.name && (
      <div className="pull-requests-list-container">
        <button className="pull-requests-button" onClick={() => navigate('/pull-requests')}>Pull requests</button>
      </div>)}
    </div>
  );
}
