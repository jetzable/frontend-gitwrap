import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PullRequests() {
  const [loading, setLoading] = useState(true);
  const [prList, setPrList] = useState([])
  const selectedRepo = useSelector((state) => state.selectedRepo.value);
  const username = useSelector((state) => state.username.value);

  useEffect(() => {
    getPullRequests();
  }, []);

  async function getPullRequests() {
    try {
      const list = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/pulls`,
        headers: {
          Authorization: 'Bearer' + process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
        },
      })
      setPrList(list.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function mergePullRequest(pullrequest) {
    try {
      setLoading(true);
      const merge = await axios({
        method: 'put',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/pulls/${pullrequest.number}/merge`,
        headers: {
          Authorization: 'Bearer' + process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
        },
      })
      alert(merge.data.message);
      getPullRequests();
    } catch (error) {
      console.log(error);      
    }
  }
  {loading && <p>Loading...</p>}
  {prList.length === 0 && (<h1>No Pull requests for this repository</h1>)}
  return (
  <ul className="list-container">
    <h1>Pull requests</h1>
    <h2>{selectedRepo.name}</h2>
    {loading && <p>Loading...</p>}
    {!loading && prList.map(pullRequest => {
      return (
        <li key={pullRequest.id} className="pull-request-item">
          <h3 style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontWeight: '500', marginRight: '0.5rem'}}>Author:</span>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img
                style={{height: '1.5rem', width: '1.5rem', borderRadius: '50%', marginRight: '0.5rem'}}
                src={pullRequest.user.avatar_url} alt={pullRequest.user.login}
                />
              <p style={{fontWeight: '800'}}>{pullRequest.user.login}</p>
            </div>
          </h3>
          <p>
            <span style={{fontWeight: '500', marginRight: '0.5rem'}}>Title:</span>
            <span style={{fontWeight: '800'}}>{pullRequest.title}</span>
          </p>
          <p>
            <span style={{fontWeight: '500', marginRight: '0.5rem'}}>Comment:</span>
            <span style={{fontWeight: '800'}}>{pullRequest.body}</span>
          </p>
          <p>
            <span style={{fontWeight: '500', marginRight: '0.5rem'}}>Status:</span>
            <span style={{fontWeight: '800'}}>{pullRequest.state}</span>
          </p>
          {pullRequest.state === 'open' &&
            <button className="merge-button" onClick={() => mergePullRequest(pullRequest)}>
              Merge
            </button>}
        </li>
      )
    })}
  </ul>);
}

export default PullRequests;
