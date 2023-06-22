"use client"

import { useEffect } from "react"

export const SpotifyPlayer = () => {

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQB2FzJxf5kTtm1KeV6m7mN9XERkKJnuoj-5eZYZWVhQYY-xDu2-2gdX8ISe0GO0mg3Ta55f7EPfgsLdEEpldxtM0DdGhTwSowSRi6AhZGDDjmwbM9JoyBougTPD-llOGszXIKLm7wlH0h9Yq-rPddRanW-wcU6pRqtVaj9dF_D2Xq-Ouh3RXE-w1MAWhzeMhFpDDhKItQz9gN3Nx2OTMGUMXWxZJ-1B';
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: (cb: (token: string) => void) => { cb(token); },
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