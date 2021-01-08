import React from "react";
import PropTypes from 'prop-types';

const CandidateListComponent = ({ candidates, view }) => {
    const sortedCandidates = candidates.sort((a, b) => b.voteCnt - a.voteCnt);
    return (
        <ol>
            {
                sortedCandidates.map(function (c, idx) {
                    if (view === 'user') {
                        return (<li key={c._id}>{idx+1}. {c.name}, vote: {c.voteCnt}</li>);
                    }
                    return (<li key={c._id}>{idx+1}. {c.name}</li>);
                })
            }
        </ol>
        
    )
    // return <o1>{candidates}</o1>;
};

CandidateListComponent.propTypes = {
    candidates: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired
};

export default CandidateListComponent;