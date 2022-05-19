import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function PullRequest() {
  const branches = useSelector((state) => state.branches.value);
  const selectedRepo = useSelector((state) => state.selectedRepo.value);
  const username = useSelector((state) => state.username.value);

  const [ baseBranch, setBaseBranch] = useState(null);
  const [ compareBranch, setCompareBranch] = useState(null);
  const [ loading, setLoading] = useState(false);
  const [ pullRequest, setPullRequest] = useState(null);
  const [ creating, setCreating] = useState(false);
  const [ title, setTitle] = useState('');

  function handleBaseChange(evt) {
    setBaseBranch(evt.target.value);
  }

  function handleCompareChange(evt) {
    setCompareBranch(evt.target.value);
  }

  useEffect(() => {
    if (baseBranch && compareBranch) {
      compareBranches()
    }
  }, [baseBranch, compareBranch])

  async function compareBranches() {
    try {
      setLoading(true);
      const comparison =await  axios({
        method: 'get',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/compare/${baseBranch}...${compareBranch}`,
        headers: {
          'Authorization': 'Bearer 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'
        }
      })
      setPullRequest(comparison.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function renderFile(file) {
    return (
      <div className="file-container">
        <p style={{color: 'blue'}}>{file.filename}</p>
        <p style={{color: 'green'}}>
          <i className="fa-solid fa-plus"></i>
          <span>{file.additions}</span>
        </p>
        <p style={{color: 'red'}}>
          <i className="fa-solid fa-minus"></i>
          <span>{file.deletions}</span>
        </p>
      </div>
    )
  }

  async function createPr() {
    try {
      console.log('creating');
      setCreating(true);
      const mergeCompleted = await axios({
        method: 'post',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/pulls`,
        headers: {
          'Authorization': 'Bearer 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'
        },
        data: {
          owner: username,
          repo: selectedRepo.name,
          title: title,
          body: 'Please pull these awesome changes in!',
          head: compareBranch,
          base: baseBranch
        }
      })
      console.log(mergeCompleted);
      setCreating(false);
    } catch (error) {
      console.log(error);
      setCreating(false);
    }
  }

  return (
    <div className="pull-container">
      <h1>{selectedRepo.name}</h1>
      <section className="compare-branches">
        <div>
          <label htmlFor="base-branch">Base:</label>
          <select name="base-branch" id="base-branch" onChange={handleBaseChange} value={baseBranch}>
            {branches.map((branch) => (
              <option key={branch.commit.sha} value={branch.name}>{branch.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label for="compare-branch">Compare:</label>
          <select name="compare-branch" id="compare-branch" onChange={handleCompareChange} value={compareBranch}>
            {branches.map((branch) => (
              <option value={branch.name}>{branch.name}</option>
            ))}
          </select>
        </div>
      </section>
      {loading && (<p>loading...</p>)}
        {!loading && pullRequest && (
          <div>
            <section className="pull-resume">
              <p>
                <i className="fa-solid fa-code-commit"></i>
                <span style={{marginRight: '0.25rem'}}>{pullRequest.commits.length}</span>
                <span>Commits</span>
              </p>
              <p>
                <i className="fa-solid fa-file-code"></i>
                <span style={{marginRight: '0.25rem'}}>{pullRequest.files.length}</span>
                <span>Files</span>
              </p>
            </section>
            <section className="pull-files">
              {pullRequest.files.map(renderFile)}
            </section>
            <section className="merge-footer">
              <div>
                <label>Title:</label>
                <input
                  className="input"
                  value={title}
                  placeholder="Pull request title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <button className="merge-button" onClick={() => createPr()} type="button">
                {creating ? 'Creating' : 'Create'}
              </button>
            </section>
          </div>
        )}
    </div>
  );
}

export default PullRequest;
