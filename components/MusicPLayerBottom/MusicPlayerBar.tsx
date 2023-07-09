"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../ui/button"
import { faBackwardStep, faForwardStep, faHeart, faMicrophone, faPause, faPlay, faRepeat, faReply, faShuffle, faTabletScreenButton } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { RowItem } from "../common/ui/RowItem"
import { AvatarWithFallback } from "../common/ui/AvatarWithFallback"
import { Slider } from "../ui/slider"

export const MusicPlayerBottom = () => {

    return (
        <div className="relative flex h-full w-full border-t bg-background p-4 shadow-lg">
            <div className="absolute top-0 w-full -translate-y-1/2">
                <Slider
                    trackClassName="!bg-transparent"
                    thumbClassName="!border-none transition cursor-pointer hover:!bg-foreground !hover:border !bg-transparent "
                />
            </div>
            <RowItem 
                className="-m-4 !w-[400px]"
                leftWidgetClassName="w-12 h-12"
                leftWidget={
                    <AvatarWithFallback
                        className="h-full w-full rounded-md"
                        src="/imgs/default-playlist.png"
                        alt="preview"
                    />
                }
                title="Playing Song"
                subTitle="ajoaijsdojo"
                rightWidget={
                    <FontAwesomeIcon icon={faHeart}/>
                }
            />
            <PlayerControllerGroup />
            <div className="grow"/>
            <div className="flex items-center gap-1">
                <Button variant="ghost"> 
                    <FontAwesomeIcon icon={faMicrophone}/>
                </Button>
                <Button variant="ghost"> 
                    <FontAwesomeIcon icon={faTabletScreenButton}/>
                </Button>
                <div className="flex h-full w-[200px] items-center px-2">
                    <Slider
                        // thumbClassName="!bg-transparent !border-none !focus:border-none"
                        showThumb={false}
                    />
                </div>
            </div>
        </div>
    )
}

export const PlayerControllerGroup = () => {

    const [ isPlaying, setIsPlaying ] = useState<boolean>(false)

    const handleTogglePLay = () => {
        setIsPlaying(prev=>!prev)
    }

    return (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[calc(50%-2px)] gap-4">
            <Button variant="ghost">
                <FontAwesomeIcon icon={faShuffle} />
            </Button>

            <Button variant="ghost">
                <FontAwesomeIcon icon={faBackwardStep} />
            </Button>

            <Button variant="default" className="h-12 w-12 rounded-full transition active:scale-90"
                onClick={handleTogglePLay}
            >
                <FontAwesomeIcon
                    icon={isPlaying ? faPause : faPlay }
                />
            </Button>
            <Button variant="ghost">
                <FontAwesomeIcon icon={faForwardStep} />
            </Button>
            <Button variant="ghost">
                <FontAwesomeIcon icon={faRepeat} />
            </Button>
        </div>
    )
}