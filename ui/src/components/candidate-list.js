import React from "react";
import PropTypes from 'prop-types';

const CandidateListComponent = ({ candidates }) => {
    console.log(candidates);
    // return candidates.sort((a, b) => a.voteCnt > b.voteCnt).map(c => {<ol >{c.name}, vote: {c.voteCnt}</ol>})
    return <o1>{candidates}</o1>;
};

CandidateListComponent.propTypes = {
    candidates: PropTypes.array.isRequired
};

export default CandidateListComponent;