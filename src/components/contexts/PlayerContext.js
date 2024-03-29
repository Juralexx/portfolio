import React from 'react'
import { songs } from '__config'

export const PlayerContext = React.createContext()

const PlayerContextProvider = (props) => {
    const audio = React.useRef(new Audio(songs[0].url))

    const [track, setTrack] = React.useState({
        current: songs[0],
        isPlaying: false
    })
    const [timeRange, setTimeRange] = React.useState({
        currentTime: audio.current?.currentTime || 0,
        remainingTime: audio.current?.remainingTime || 0,
        duration: audio.current?.duration || 0
    })

    const [volume, setVolume] = React.useState({
        rate: audio.current?.volume || 1,
        muted: false
    })

    /**
     * 
     */

    const [card, setCard] = React.useState({
        active: false,
        minified: false,
    })

    React.useEffect(() => {
        audio.current?.addEventListener('loadeddata', () => {
            setTimeRange({
                currentTime: audio.current.currentTime,
                remainingTime: audio.current.duration,
                duration: audio.current.duration
            })
            if (track.isPlaying)
                audio.current.play()
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [track.isPlaying])

    React.useEffect(() => {
        audio.current?.addEventListener('timeupdate', () => {
            setTimeRange(prev => ({
                ...prev,
                currentTime: audio.current.currentTime,
                remainingTime: audio.current.duration - audio.current.currentTime
            }))
        })
        audio.current?.addEventListener('volumechange', () => {
            if (audio.current.volume === 0) {
                setVolume({ muted: true, rate: audio.current.volume })
            } else setVolume({ muted: false, rate: audio.current.volume })
        })
        audio.current?.addEventListener('ended', () => {
            const index = songs.findIndex(el => el._id === track.current._id)
            if (index < songs.length - 1) {
                setTrack(prev => ({ ...prev, current: songs[index + 1] }))
                audio.current.src = songs[index + 1].url
                audio.current.load()
            } else {
                setTrack(prev => ({ ...prev, current: songs[0] }))
                audio.current.src = songs[0].url
                audio.current.load()
            }
        })
        audio.current?.addEventListener('loadeddata', () => {
            if (track.isPlaying) {
                audio.current.play()
            }
        })
    }, [audio, track])

    const changeSong = (direction) => {
        const index = songs.findIndex(el => el._id === track.current._id)
        if (direction === 'forward') {
            if (index < songs.length - 1) {
                setTrack(prev => ({ ...prev, current: songs[index + 1] }))
                audio.current.src = songs[index + 1].url
                audio.current.load()
            } else {
                setTrack(prev => ({ ...prev, current: songs[0] }))
                audio.current.src = songs[0].url
                audio.current.load()
            }
        } else {
            if (index > 0) {
                setTrack(prev => ({ ...prev, current: songs[index - 1] }))
                audio.current.src = songs[index - 1].url
                audio.current.load()
            } else {
                setTrack(prev => ({ ...prev, current: songs[songs.length - 1] }))
                audio.current.src = songs[songs.length - 1].url
                audio.current.load()
            }
        }
    }

    const onPlay = () => {
        setTrack(prev => ({ ...prev, isPlaying: true }))
        audio.current.play()
        if (!card.active) {
            setCard(prev => ({ ...prev, active: true }))
        }
    }

    const onPause = () => {
        setTrack(prev => ({ ...prev, isPlaying: false }))
        audio.current.pause()
    }

    const onStop = () => {
        setCard(prev => ({ ...prev, active: false }))
        setTrack({ current: songs[0], isPlaying: false })
        audio.current.pause()
    }

    return (
        <PlayerContext.Provider value={{ track, timeRange, volume, changeSong, onPlay, onPause, onStop, card, setCard, player: audio.current }}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider