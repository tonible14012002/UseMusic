"use client"

import { useState } from "react"
import Image from "next/image"

import { ImageProps } from "next/image"

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc: string
}

export const ImageWithFallback = (props: ImageWithFallbackProps) => {

    const { alt, src, fallbackSrc, ...rest } = props
    const [ imageSrc, setImageSrc ]= useState(src)

    return (
        <Image
            {...rest}
            src={imageSrc}
            onError={() => {setImageSrc(fallbackSrc)}}
            alt={alt}
        />
    )
}