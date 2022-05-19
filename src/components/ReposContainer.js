import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import axios from "axios";
import { setCurrentRepo } from "../features/currentRepo";
import { setCommit } from "../features/commit";
import { setCurrentBranch } from "../features/branch";
import { setBranches } from "../features/branches";
import CommitItem from "./CommitItem";

export default function ReposContainer() {
  const [loading, setLoading] = useState(false);
  const selectedRepo = useSelector((state) => state.selectedRepo.value);
  const currentRepo = useSelector((state) => state.currentRepo.value);
  const username = useSelector((state) => state.username.value);
  const branches = useSelector((state) => state.branches.value);
  const currentBranch = useSelector((state) => state.branch.value);

  const dispatch = useDispatch();

  async function getRepoDetails() {
    try {
      setLoading(true);
      const resp = await axios({
        method: "get",
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}`,
        headers: {
          Authorization: 'Bearer' + process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
        },
      });
      dispatch(setCurrentRepo(resp.data));
      const listBranches = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/branches`,
        headers: {
          Authorization: 'Bearer' + process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
        },
      })
      dispatch(setBranches(listBranches.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCommits(branch) {
    try {
      dispatch(setCurrentBranch(branch));
      const commit = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/commits/${branch.name}`,
        headers: {
          Authorization: 'Bearer' + process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
        },
      });
      dispatch(setCommit(commit.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRepoDetails();
  }, [selectedRepo]);

  if (loading && !currentRepo) {
    return <div style={{marginTop: '5rem'}}>Loading...</div>;
  } if (currentRepo) {
    return (
      <div className="repo-container">
        {selectedRepo.name && (
          <button className="pr-button"><Link to="/pull-request" className="button">New Pull Request</Link></button>
        )}
        <h1 className="repo-name">{selectedRepo.name}</h1>
        <ul className="branches-list">
          {branches.map((branch) => (<li onClick={() => {
            getCommits(branch);
          }}>
            <h3>
              <i className="fa-solid fa-code-branch"></i>
              <span className="branches-title">{branch.name}</span>
            </h3>
            {currentBranch.name === branch.name
              ? <CommitItem />
              : <p key={branch.name}></p>
            }
          </li>))}
        </ul>
      </div>
    );
  }
}
