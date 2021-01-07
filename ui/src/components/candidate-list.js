import React from "react";
import PropTypes from 'prop-types';

const CandidateListComponent = ({ candidates }) => {
    const sortedCandidates = candidates.sort((a, b) => b.voteCnt - a.voteCnt);
    return (
        <ol>
            {
                sortedCandidates.map(function (c, idx) {
                    return (<li key={c._id}>{idx+1}. {c.name}, vote: {c.voteCnt}</li>);
                })
            }
        </ol>
        
    )
    // return <o1>{candidates}</o1>;
};

CandidateListComponent.propTypes = {
    candidates: PropTypes.array.isRequired
};

export default CandidateListComponent;