import { useCallback, useEffect, useRef, useState } from "react"

const noop  = () => {}

interface SpotifySDKProps {
    name: string
    getOAuthToken: () => Promise<string>
    accountError?: (e: any) => void
    onReady?: () => void
    onPlayerStateChanged?: Spotify.PlaybackStateListener
}

export const  useSpotifyPlayback = (props: SpotifySDKProps) => {

    const {
        name,
        getOAuthToken,
        onReady = noop,
        accountError = noop,
        onPlayerStateChanged = noop,
    } = props

    const [ isReady, setIsReady ] = useState<boolean>(false)
    const [ deviceId, setDeviceId ] = useState<string>()
    const playerRef = useRef<Spotify.Player>()

    useEffect(() => {
        if (window.Spotify) {
            playerRef.current = new Spotify.Player({
                name,
                getOAuthToken: async cb => {
                    const token = await getOAuthToken()
                    cb(token)
                }
            })
            setIsReady(true)
        }
        (window as any).onSpotifyWebPlaybackSDKReady = () => {
            playerRef.current = new Spotify.Player({
                name,
                getOAuthToken: async cb => {
                    const token = await getOAuthToken()
                    cb(token)
                }
            })
            setIsReady(true)
        }

        if (!window.Spotify) {
            const scriptTag = document.createElement('script');
            scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
            document.head!.appendChild(scriptTag);
        }

    }, [getOAuthToken, name])

    const handleReady = useCallback(({device_id: readyDeviceId}: {device_id: string}) => {
        setDeviceId(readyDeviceId)
        onReady && onReady()

    }, [onReady])

    useEffect(() => {
        const player = playerRef.current
        if (isReady) {
            player?.addListener("account_error", accountError)
            player?.addListener("ready", handleReady)
            player?.addListener("initialization_error", accountError)
            player?.addListener("authentication_error", accountError)
            player?.addListener("not_ready", accountError)
            player?.addListener("player_state_changed", onPlayerStateChanged)
            return () => {
                player?.removeListener('account_error', accountError);
                player?.removeListener('ready', handleReady);
                player?.removeListener('player_state_changed', onPlayerStateChanged);
            }
        }
        return
    }, [isReady, accountError, handleReady, onPlayerStateChanged])


    return ({
        player: playerRef.current,
        deviceId, 
        isReady
    })
}