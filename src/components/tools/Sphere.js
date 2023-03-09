import React from 'react'
import Icon from './icons/Icon'
import { languages } from 'components/data/languages'
import TagSphere from './TagSphere'

const Sphere = () => {
    const tags = React.useMemo(() => {
        return languages.map((language, i) => {
            return (
                <div className='sphere__icon'>
                    <Icon
                        key={i}
                        name={language.data_icon}
                        className={`${language.class}`}
                        data-name={language.data_title}
                    />
                    <div className='sphere__icon-name'>
                        {language.data_title}
                    </div>
                </div>
            )
        })
    }, [])

    return (
        <TagSphere
            tags={tags}
            blur={false}
            grayscale={false}
            radius={languages.length * 13}
            initialSpeed={20}
        />
    )
}

export default React.memo(Sphere)