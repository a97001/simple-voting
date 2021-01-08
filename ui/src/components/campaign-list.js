import React, { useState } from "react";
import DataTable from 'react-data-table-component';
import CandidateListComponent from "../components/candidate-list";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import axios from 'axios';
import VoteFormComponent from "./vote-form";

const CampaignListCompconent = ({ data, view, fetchData }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
    const [deleteCampaignId, setDeleteCampaignId] = useState(0);
    const [votingCampaign, setVotingCampaign] = useState({});
    const [selectedCandidateId, setSelectedCandidateId] = useState("");
    const [hkidVote, setHkidVote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function openDeleteItemModel(campaignId) {
        setDeleteCampaignId(campaignId);
        setIsDeleteModalOpen(true);
    }

    function openVoteModel(campaignId) {
        const campaign = data.find(c => c._id === campaignId);
        if (campaign) {
            setVotingCampaign(campaign);
            setIsVoteModalOpen(true);
        }

    }

    function closeModal() {
        setIsDeleteModalOpen(false)
        setIsVoteModalOpen(false)
    }

    async function deleteCampaign() {
        const campaign = data.find(c => c._id === deleteCampaignId);
        if (campaign) {
            try {
                await axios.delete(`http://localhost:5000/api/v1/campaigns/${campaign._id}`);
                await fetchData();
                setIsDeleteModalOpen(false);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function voteForCampaign() {
        if (selectedCandidateId && hkidVote) {
            setIsSubmitting(true);
            try {
                await axios.post('http://localhost:5000/api/v1/votes', {
                    campaignId: votingCampaign._id,
                    candidateId: selectedCandidateId,
                    hkid: hkidVote
                });
                await fetchData();
                setIsVoteModalOpen(false);
            } catch (err) {
                console.log(err);
            }
            setIsSubmitting(false);
        }
    }

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
            wrap: true,
            format: (row) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'medium' }).format(row.startAt)
        },
        {
            name: 'End Time',
            selector: 'endAt',
            maxWidth: "170px",
            sortable: false,
            wrap: true,
            format: (row) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'medium' }).format(row.endAt)
        },
        {
            name: 'Total Vote',
            selector: 'totalVoteCnt',
            maxWidth: "200px",
            omit: view === 'admin'
        },
        {
            name: view === 'user' ? 'Candidate Ranking' : 'Candidates',
            maxWidth: "270px",
            cell: function list(row) {
                return (
                    <CandidateListComponent candidates={row.candidates} view={view}></CandidateListComponent>
                );
            }
        },
        {
            name: '',
            width: "70px",
            cell: function vote(row) {
                const now = Date.now();
                if (view === 'user') {
                    if (row.startAt <= now && row.endAt > now) {
                        return (
                            <div className="animate-bounce">
                                <Button layout="link" size="small">
                                    <FontAwesomeIcon icon={faVoteYea} size="lg" onClick={() => openVoteModel(row._id)} />
                                </Button>
                            </div>
                        );
                    }
                } else {
                    return (
                        <div className="animate-bounce">
                            <Button layout="link" size="small">
                                <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => openDeleteItemModel(row._id)} />
                            </Button>
                        </div>
                    );
                }

            }
        }
    ];

    return (
        <div>
            <DataTable
                title="Campaign List"
                columns={columns}
                data={data}
                keyField="_id"
            />
            <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
                <ModalHeader>Delete Campaign</ModalHeader>
                <ModalBody>
                    <div>Are use sure to delete <b>{data.find(c => c._id === deleteCampaignId) ? data.find(c => c._id === deleteCampaignId).title : ""}</b> ?</div>
                    <div>This cannot be undone!</div>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>Cancel</Button>
                    <Button className="w-full sm:w-auto" onClick={deleteCampaign}>Confirm</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isVoteModalOpen} onClose={closeModal}>
                <ModalHeader>Vote for Campaign </ModalHeader>
                <ModalBody>
                    <VoteFormComponent
                        campaign={votingCampaign}
                        fetchData={fetchData}
                        cb={(id) => setSelectedCandidateId(id)}
                        hkidCb={(id) => setHkidVote(id)}
                    ></VoteFormComponent>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>Cancel</Button>
                    <Button className="w-full sm:w-auto" onClick={voteForCampaign} disabled={isSubmitting}>Vote</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
};

CampaignListCompconent.propTypes = {
    view: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired
};

export default CampaignListCompconent;