"use client"

import { useAuthSession } from "@/hooks/useAuthSession"
import { useEffect } from "react"

export const SpotifyPlayer = () => {

    const { session } = useAuthSession()

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: (cb) => { cb(session?.accessToken || ""); },
                volume: 0.5
            });
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            })
        }
    }, [])

    return (
        <div>

        </div>
    )
}