import React, { useState } from "react";
import { Button, Input, Label } from '@windmill/react-ui'
import CandidateInputItemComponent from "./candidate-input-item"
import axios from 'axios';
import PropTypes from 'prop-types';

const CreateCampaignFormComponent = ({ fetchData }) => {
    const [title, setTitle] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function addCandidate() {
        if (candidateName && !candidates.find(c => c.name === candidateName)) {
            candidates.push({ name: candidateName });
            setCandidates(candidates);
            setCandidateName("");
        }
    }

    function removeCandidate(idx) {
        candidates.splice(idx, 1);
        setCandidates([...candidates]);
    }

    async function submit() {
        setIsSubmitting(true);
        console.log({
            title,
            startAt: new Date(startAt.replace(/-/g, '/').replace('T', ' ')),
            endAt: new Date(endAt.replace(/-/g, '/').replace('T', ' ')),
            candidates
        });
        try {
            await axios.post('http://localhost:5000/api/v1/campaigns', {
                title,
                startAt: new Date(startAt.replace(/-/g, '/').replace('T', ' ')),
                endAt: new Date(endAt.replace(/-/g, '/').replace('T', ' ')),
                candidates
            }, { withCredentials: true });
            setTitle('');
            setStartAt('');
            setEndAt('');
            setCandidates([]);
            fetchData();
        } catch (err) {
            console.log(err);
        }
        setIsSubmitting(false);
    }

    return (
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <form onSubmit={submit}>
                <h1>Create Campaign</h1>
                <br></br>
                <Label>
                    <span>Title:</span>
                    <Input className="mt-1 rounded-md" onChange={(e) => setTitle(e.target.value)} value={title} />
                </Label>
                <br></br>
                <Label>
                    <span>Start at:</span>
                    <Input type="datetime-local" className="mt-1 rounded-md" onChange={(e) => setStartAt(e.target.value)} value={startAt} />
                </Label>
                <br></br>
                <Label>
                    <span>End at:</span>
                    <Input type="datetime-local" className="mt-1 rounded-md" onChange={(e) => setEndAt(e.target.value)} value={endAt} />
                </Label>
                <br></br>
                <Label>
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Candidates</h1>
                        <div className="flex mt-4">
                            <Input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Candidate" onChange={(e) => setCandidateName(e.target.value)} value={candidateName} />
                            <Button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-green hover:bg-teal" onClick={(e) => addCandidate(e)}>Add</Button>
                        </div>
                    </div>
                    <div>
                        {
                            candidates.map(function candidate(c, idx) {
                                return (<CandidateInputItemComponent key={idx} idx={idx} value={c.name} cb={removeCandidate}></CandidateInputItemComponent>);
                            })
                        }
                    </div>
                </Label>
                <br></br>
                <Button block type="submit" onClick={(e) => submit(e)} disabled={isSubmitting}>Submit</Button>
            </form>
        </div>
    )
};

CreateCampaignFormComponent.propTypes = {
    fetchData: PropTypes.func.isRequired
};

export default CreateCampaignFormComponent;