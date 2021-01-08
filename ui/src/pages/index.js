import React, { useState, useEffect } from "react";
import CampaignListComponent from "../components/campaign-list";

import Layout from "../components/layout";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

function IndexPage() {
  const [campaignData, setCampaignData] = useState([]);
  let autoUpdate;
  useEffect(() => {
    fetchCampaignData();
    autoUpdate = setInterval(fetchCampaignData, 1000);
    return () => {
      clearInterval(autoUpdate);
    }
  }, []);

  // useEffect(() => fetchCampaignData(), []);

  async function fetchCampaignData() {
    const result = await axios.get('http://localhost:5000/api/v1/campaigns');
    console.log(result);
    setCampaignData(result.data.docs.map(d => ({ ...d, startAt: new Date(d.startAt), endAt: new Date(d.endAt) })));
  }

  return (
    <Layout>
      <section className="text-left">
        <CampaignListComponent data={campaignData} fetchData={fetchCampaignData} view="user"></CampaignListComponent>
      </section>
    </Layout>
  );
}

export default IndexPage;
