import React from 'react';
import { MdOutlineCheckCircle, MdOutlineRadioButtonUnchecked } from 'react-icons/md';

function Badge({ state, children, ...props }) {
    let badgeColor = '';
    // Determine badge color and text based on state
    switch (state) {
        case 'new':
            badgeColor = 'bg-blue-500 text-white';
            break;
        case 'pending':
            badgeColor = 'bg-yellow-500 text-black';
            break;
        case true:
        case 'active':
        case 'available':
        case 'completed':
            badgeColor = 'bg-green-500 text-white';
            break;
        case false:
        case 'inactive':
        case 'deny':
        case 'unavailable':
        case 'uncompleted':
            badgeColor = 'bg-red-500 text-white';
            break;
        case 'hashTag':
            badgeColor = 'bg-orange-500 text-white';
            break;
        case 'unHashTag':
            badgeColor = 'bg-gray-200 text-white';
            break;
        default:
            break;
    }

    return (
        <div
            {...props}
            className={`flex cursor-pointer items-center gap-2 ${badgeColor} rounded-full px-3 py-1 mr-2 capitalize font-bold`}
        >
            <p>{children}</p>
            {state === 'hashTag' ? <MdOutlineCheckCircle className="text-white text-[20px]" /> : null}
            {state === 'unHashTag' ? <MdOutlineRadioButtonUnchecked className="text-white text-[20px]" /> : null}
        </div>
    );
}

export default Badge;
