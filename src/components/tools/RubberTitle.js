import PropTypes from 'prop-types';
import React from 'react'

const RubberTitle = ({ title, className, HTMLElement }) => {
    const titleRef = React.useRef([])

    const addClassOnHover = (key) => {
        titleRef.current[key].classList.add('animated');
        titleRef.current[key].addEventListener('animationend', () => {
            titleRef.current[key].classList.remove('animated');
        });
    }

    return (
        /* eslint-disable */
        <HTMLElement className={className} role="heading">
            {[...title].map((letter, i) => {
                return letter === ' ' ? (
                    <span key={i} className='rubberband'>&#32;</span>
                ) : (
                    <span
                        key={i}
                        className='rubberband'
                        ref={ref => titleRef.current[i] = ref}
                        onMouseEnter={() => addClassOnHover(i)}
                    >
                        {letter}
                    </span>
                )
            })}
        </HTMLElement>
        /* eslint-enable */
    )
}

export default React.memo(RubberTitle)

RubberTitle.propTypes = {
    HTMLElement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}