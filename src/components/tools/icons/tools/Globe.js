import React from 'react';

const Globe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
        <rect width="256" height="256" fill="none" />
        <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
        <line x1="37.5" y1="96" x2="218.5" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
        <line x1="37.5" y1="160" x2="218.5" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
        <ellipse cx="128" cy="128" rx="40" ry="93.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
    </svg>

)

export default Globe