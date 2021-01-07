import React from "react";
import DataTable from 'react-data-table-component';
import CandidateListComponent from "../components/candidate-list";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons'

const data = [
    { _id: "1", title: 'Conan the Barbarian', startAt: new Date(), endAt: new Date(), totalVoteCnt: 0, candidates: [{ _id: "x", name: 'xxx', voteCnt: 0 }] },
    { _id: "2", title: 'Conan the Barbarianwewe we', startAt: new Date(), endAt: new Date(2022, 1, 1), totalVoteCnt: 0, candidates: [{ _id: "x", name: 'xxx', voteCnt: 0 }, { _id: "y", name: 'yyy', voteCnt: 1 }] }
];

const columns = [
    {
        name: 'Campaign Title',
        selector: 'title',
        sortable: false,
        wrap: true
    },
    {
        name: 'Start Time',
        selector: 'startAt',
        maxWidth: "170px",
        sortable: false,
        format: (row) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'medium' }).format(row.startAt)
    },
    {
        name: 'End Time',
        selector: 'endAt',
        maxWidth: "170px",
        sortable: false,
        format: (row) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'medium' }).format(row.endAt)
    },
    {
        name: 'Total Vote',
        selector: 'totalVoteCnt',
        maxWidth: "200px",
    },
    {
        name: 'Candidate Ranking',
        maxWidth: "270px",
        cell: function list(row) {
            return (
                <CandidateListComponent candidates={row.candidates}></CandidateListComponent>
            );
        }
    },
    {
        name: '',
        width: "45px",
        cell: function vote(row) {
            const now = Date.now();
            if (row.startAt <= now && row.endAt > now) {
                return (<div className="animate-bounce"><FontAwesomeIcon icon={faVoteYea} size="lg" /></div>);
            }
        }
    }
];

const CampaignListComponent = () => (
    <DataTable
        title="Campaign List"
        columns={columns}
        data={data}
        keyField="_id"
    />
);

export default CampaignListComponent;