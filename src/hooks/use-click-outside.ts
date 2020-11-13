// import { RefObj } from 'react'

// hook from https://usehooks.com/useOnClickOutside/
//


import { useEffect } from 'react'

// /type RefObj = ReturnType<createRef<HTMLElement>>
type handlerT = (event: MouseEvent) => void // / MouseEventHandler<HTMLElement>
type refT = { current?: HTMLElement | null }

function useOnClickOutside(ref: refT, handler:handlerT) {
    useEffect(
        () => {
            const listener = (event:MouseEvent) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target as any)) {
                    return
                }

                handler(event)
            }

            document.addEventListener('mousedown', listener)


            return () => {
                document.removeEventListener('mousedown', listener)
            }
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler],
    )
}

export default useOnClickOutside
