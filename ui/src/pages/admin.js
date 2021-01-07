import React from "react";

import Layout from "../components/layout";
import CampaignListComponent from "../components/campaign-list";
import CreateCampaignFormComponent from "../components/create-campaign-form";

function AdminPage() {
    return (
        <Layout>
            {/* <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      /> */}
            <h1>AdminPage</h1>
            <section className="flex flex-row items-start">
                <div><CampaignListComponent></CampaignListComponent></div>
                <div><CreateCampaignFormComponent></CreateCampaignFormComponent></div>
            </section>
        </Layout>
    );
}

export default AdminPage;
