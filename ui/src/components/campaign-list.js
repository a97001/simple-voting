import React from "react";
import DataTable from 'react-data-table-component';
// import CandidateListComponent from "../components/candidate-list";
// createTheme('solarized', {
//     text: {
//         primary: '#268bd2',
//         secondary: '#2aa198',
//     },
//     background: {
//         default: '#002b36',
//     },
//     context: {
//         background: '#cb4b16',
//         text: '#FFFFFF',
//     },
//     divider: {
//         default: '#073642',
//     },
//     action: {
//         button: 'rgba(0,0,0,.54)',
//         hover: 'rgba(0,0,0,.08)',
//         disabled: 'rgba(0,0,0,.12)',
//     },
// });

const data = [
    { _id: 1, title: 'Conan the Barbarian', startAt: new Date(), endAt: new Date(), totalVoteCnt: 0, candidates: [{ name: 'xxx', voteCnt: 0 }] },
    { _id: 2, title: 'Conan the Barbarianwewe we', startAt: new Date(), endAt: new Date(), totalVoteCnt: 0, candidates: [{ name: 'xxx', voteCnt: 0 }, { name: 'yyy', voteCnt: 1 }] }
];
const columns = [
    {
        name: 'Campaign Title',
        selector: 'title',
        sortable: false,
    },
    {
        name: 'Start Time',
        selector: 'startAt',
        sortable: false,
        format: (row) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'medium' }).format(row.startAt)
    },
    {
        name: 'End Time',
        selector: 'endAt',
        sortable: false,
        format: (row) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'medium' }).format(row.endAt)
    },
    {
        name: 'Total vote',
        selector: 'totalVoteCnt'
    },
    {
        name: 'Candidates',
        // cell: (row) => {<CandidateListComponent candidates={row.candidates}></CandidateListComponent>}
        format: (row) => {<h2>{row._id}</h2>}
    }
];

const CampaignListComponent = () => (
    <DataTable
        title="Campaign List"
        columns={columns}
        data={data}
    />
);

export default CampaignListComponent;