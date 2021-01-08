import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import CampaignListComponent from "../components/campaign-list";
import CreateCampaignFormComponent from "../components/create-campaign-form";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

function AdminPage() {
    const [campaignData, setCampaignData] = useState([]);

    useEffect(() => fetchCampaignData(), []);

    async function fetchCampaignData() {
        const result = await axios.get('http://localhost:5000/api/v1/campaigns');
        setCampaignData(result.data.docs.map(d => ({ ...d, startAt: new Date(d.startAt), endAt: new Date(d.endAt) })));
    }

    return (
        <Layout>
            <h1>AdminPage</h1>
            <br></br>
            <section className="flex flex-row items-start">
                <div><CampaignListComponent data={campaignData} fetchData={fetchCampaignData} view="admin"></CampaignListComponent></div>
                <div><CreateCampaignFormComponent fetchData={fetchCampaignData}></CreateCampaignFormComponent></div>
            </section>
        </Layout>
    );
}

export default AdminPage;
