"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface Props extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbClassName?: string
  trackClassName?: string
  rangeClassName?: string
  showThumb?: boolean
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  Props
>(({ className, ...props }, ref) => {
  const { thumbClassName, trackClassName, rangeClassName, showThumb=true } = props
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className={cn(trackClassName, "relative h-1 w-full grow overflow-hidden rounded-full bg-secondary")}>
        <SliderPrimitive.Range className={cn(rangeClassName, "absolute h-full bg-primary")} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(
          thumbClassName, {
            "block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50": showThumb,
          }
        )} />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
