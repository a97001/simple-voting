import React from "react";
import { Input, Label } from '@windmill/react-ui'
import PropTypes from 'prop-types';

const VoteFormComponent = ({ campaign, cb, hkidCb }) => {
    function onCandidateSelected(candidateId) {
        cb(candidateId)
    }

    return (
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <form>
                <Label>
                    <span>HKID:</span>
                    <Input className="mt-1 rounded-md" onChange={(e) => hkidCb(e.target.value)} />
                </Label>
                <br></br>
                <Label>
                    <span>Candidates:</span>
                    {
                        campaign.candidates.map(function candidate(c, idx) {
                            return (
                                <div key={idx}>
                                    <Input type="radio" name="selectedCandidate" onChange={() => onCandidateSelected(c._id)} />
                                    <span className="ml-2">{c.name}</span>
                                </div>
                            );
                        })
                    }
                </Label>
            </form>
        </div>
    )
};

VoteFormComponent.propTypes = {
    campaign: PropTypes.object.isRequired,
    cb: PropTypes.func,
    hkidCb: PropTypes.func
};

export default VoteFormComponent;