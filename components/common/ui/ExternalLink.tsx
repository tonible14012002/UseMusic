import Link from "next/link";
import { ReactNode } from "react";
import { LinkProps } from "next/link";

interface ExternalLinkProps extends LinkProps {
    children: ReactNode
    className?: string
}

export const ExternalLink = ({children, className, ...props}: ExternalLinkProps) => {
    return (
        <Link
            {...props}
            className={className}
            target="_blank"
        >
            {children}
        </Link>
    )
}