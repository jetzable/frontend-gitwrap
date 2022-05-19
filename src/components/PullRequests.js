import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PullRequests() {
  const [loading, setLoading] = useState(false);
  const selectedRepo = useSelector((state) => state.selectedRepo.value);
  const username = useSelector((state) => state.username.value);

  useEffect(() => {
    try {
      setLoading(true);
      const list = axios({
        method: 'get',
        url: `https://api.github.com/repos/${username}/${selectedRepo.name}/pulls`,
        headers: {
          Authorization: "Bearer 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",
        },
      })
      console.log(list);
      setLoading(false);
      console.log("hola");
    } catch (error) {
      console.log(error);
    }
  })

  return <div className="list-container">lksdncsdncjndcldsnclkdnscl</div>;
}

export default PullRequests;
