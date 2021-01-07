import React from "react";
import PropTypes from 'prop-types';
import { Button } from '@windmill/react-ui'

const CandidateInputItemComponent = ({idx, value, cb }) => {
    return (
        <div>
            <div className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">{value}</p>
                <Button layout="outline" className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-red hover:bg-red" onClick={() => cb(idx)}>Remove</Button>
            </div>
        </div>

    )
    // return <o1>{candidates}</o1>;
};

CandidateInputItemComponent.propTypes = {
    idx: PropTypes.number,
    value: PropTypes.string,
    cb: PropTypes.func
};

export default CandidateInputItemComponent;