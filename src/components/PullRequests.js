import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PullRequests() {
  const [loading, setLoading] = useState(false);
  const selectedRepo = useSelector((state) => state.selectedRepo.value);
  const username = useSelector((state) => state.username.value);

  useEffect(() => {
    getPullRequests();
  }, [])

  async function getPullRequests() {
    try {
      setLoading(true);
      const list = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/pulls`,
        headers: {
          Authorization: "Bearer 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",
        },
      })
      console.log(list.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }


  if(loading) {
    return (
      <h1>Loading List...</h1>
    )
  }

  return <div className="list-container">lksdncsdncjndcldsnclkdnscl</div>;
}

export default PullRequests;
