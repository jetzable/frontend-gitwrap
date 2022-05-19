import React from "react";
import { useSelector } from "react-redux";

function CommitItem() {
  const commit = useSelector((state) => state.commit.value);
  function renderFiles(file) {
    return (
      <li key={file.sha} className="file-info">
        <p style={{color: 'blue'}}>{file.filename}</p>
        <p style={{textAlign: 'end', color: 'green'}}>
          <i className="fa-solid fa-plus"></i>
          <span>{file.additions}</span>
        </p>
        <p style={{textAlign: 'end', color: 'red'}}>
          <i className="fa-solid fa-minus"></i>
          <span>{file.deletions}</span>
        </p>
      </li>
    );
  }

  if (commit) {
    return (
      <div key={commit.commit.tree.sha} className="commit-container">
        <section className="commit-header">
          <p className="commit-header-info">
            <strong>Sha:</strong>
            <span style={{marginLeft: '0.5rem'}}>{commit.commit.tree.sha}</span>
          </p>
        </section>
        <section className="commit-body">
          <div className="commit-message">
            <p style={{fontStyle: 'italic'}}>{commit.commit.message}</p>
            <p className="commit-header-info">{new Date(commit.commit.author.date).toDateString()}</p>
          </div>
          {commit.author
            ? <div className="commit-author">
                <p>
                  <img
                    src={commit.author.avatar_url}
                    alt={commit.commit.author.name} 
                  />
                  <span>{commit.commit.author.name}</span>
                </p>
                <span>{commit.commit.author.email}</span>
              </div>
            : ''
          }
          <ul className="commit-files">
            {commit.files.map(renderFiles)}
          </ul>
        </section>
      </div>
    );
  }
}

export default CommitItem;
