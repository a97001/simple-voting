import React from "react";
import { Input, Label } from '@windmill/react-ui'
import PropTypes from 'prop-types';

const VoteFormComponent = ({ campaign, cb, hkidCb }) => {
    // const [hkid, setHkid] = useState("");
    // const [candidateName, setCandidateName] = useState("");
    // const [candidates, setCandidates] = useState([]);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    function onCandidateSelected(candidateId) {
        cb(candidateId)
    }
    // function addCandidate() {
    //     console.log(candidateName);
    //     if (candidateName && !candidates.find(c => c.name === candidateName)) {
    //         candidates.push({ name: candidateName });
    //         console.log('tttt');
    //         setCandidates(candidates);
    //         setCandidateName("");
    //         console.log(candidates);
    //     }
    // }

    // function removeCandidate(idx) {
    //     console.log('removeCandidate', idx)
    //     candidates.splice(idx, 1);
    //     console.log('dddd');
    //     setCandidates([...candidates]);
    //     console.log(candidates);

    // }

    // async function submit() {
    //     setIsSubmitting(true);
    //     console.log({
    //         hkid,
    //         startAt,
    //         endAt,
    //         candidates
    //     });
    //     try {
    //         await axios.post('http://localhost:5000/api/v1/votes', {
    //             hkid,
    //             startAt,
    //             endAt,
    //             candidates
    //         }, { withCredentials: true });
    //         setHkid('');
    //         setStartAt('');
    //         setEndAt('');
    //         setCandidates([]);
    //         fetchData();
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     setIsSubmitting(false);
    // }

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
                                // <CandidateInputItemComponent key={idx} idx={idx} value={c.name} cb={removeCandidate}></CandidateInputItemComponent>
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