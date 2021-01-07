import React, { useState } from "react";
import { Button, Input, Label } from '@windmill/react-ui'
import CandidateInputItemComponent from "./candidate-input-item"
// import PropTypes from 'prop-types';

const CreateCampaignFormComponent = () => {
    const [title, setTitle] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    function addCandidate() {
        console.log(candidateName);
        if (candidateName && !candidates.find(c => c.name === candidateName)) {
            candidates.push({ name: candidateName });
            console.log('tttt');
            setCandidates(candidates);
            setCandidateName("");
            console.log(candidates);
        }
    }

    function removeCandidate(idx) {
        console.log('removeCandidate', idx)
        candidates.splice(idx, 1);
        console.log('dddd');
        setCandidates([...candidates]);
        console.log(candidates);

    }

    // useEffect(removeCandidate, [candidates])

    // eslint-disable-next-line no-unused-vars
    function submit() {
        setSubmitButtonDisabled(true);
        console.log({
            title,
            startAt,
            endAt
        });
    }

    return (
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <h1>Create Campaign</h1>
            <br></br>
            <Label>
                <span>Title:</span>
                <Input className="mt-1 rounded-md" onChange={(e) => setTitle(e.target.value)} />
            </Label>
            <br></br>
            <Label>
                <span>Start at:</span>
                <Input type="datetime-local" className="mt-1 rounded-md" onChange={(e) => setStartAt(e.target.value)} />
            </Label>
            <br></br>
            <Label>
                <span>End at:</span>
                <Input type="datetime-local" className="mt-1 rounded-md" onChange={(e) => setEndAt(e.target.value)} />
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
            <Button block className="" onClick={(e) => submit(e)} disabled={submitButtonDisabled}>Submit</Button>
        </div>
    )
};

CreateCampaignFormComponent.propTypes = {
    // candidates: PropTypes.array.isRequired
};

export default CreateCampaignFormComponent;