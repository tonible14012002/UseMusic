"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage, AvatarProps } from "@radix-ui/react-avatar"
import cx from "classnames"

interface AvatarWithFallbackProps extends AvatarProps {
    imgClassName?: string
    className?: string
    fallBackSrc?: string
    src: string
    alt: string
    size: "sm"| "md" | "lg"
}

export const AvatarWithFallback = ({
    imgClassName,
    className,
    fallBackSrc,
    src,
    alt,
    size = "md",
    ...props
}: AvatarWithFallbackProps) => {

    return (
        <Avatar className={className}
            {...props}
        >
            <AvatarImage
                className={imgClassName}
                src={src}
                alt={alt}
                sizes={size}
            />
            <AvatarFallback>
                {fallBackSrc ? (
                    <Avatar className={className} 
                        {...props}
                    >
                        <AvatarImage
                            className={imgClassName}
                            src={fallBackSrc}
                        />
                            
                    </Avatar>
                )
                : (
                    <div className={cx(
                        "animate-pulse bg-secondary",
                        className
                    )}/>
                )}
            </AvatarFallback>
        </Avatar>
    )
}