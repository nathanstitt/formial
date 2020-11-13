import { Ref, useEffect, useCallback, useRef, useMemo } from 'react'


interface Options {
  /**
   * target ref on which the events should be listened. If no target is specified,
   * events are listened to on the window
   */
  target?: Ref<HTMLElement>;
}

const EVENT_NAME = 'keydown'

const defaultOptions = {


}

// hook from https://usehooks.com/useKeyPress/
export function useKeyPress(
    keys: string | Array<string>,
    callback: (e: KeyboardEvent) => any,
    opts?: Options,
): void {
    const keyList: Array<string> = useMemo(() => {
        if (Array.isArray(keys)) {
            return keys
        }
        return [keys]
    }, [keys])
    const options = Object.assign({}, defaultOptions, opts) as any

    const callbackRef = useRef<(e: KeyboardEvent) => any>(callback)
    const { target } = options

    useEffect(() => {
        callbackRef.current = callback
    })

    const handle = useCallback(
        (e: KeyboardEvent) => {
            if (keyList.some(identifier => e.key === identifier)) {
                callbackRef.current(e)
            }
        },
        [keyList],
    )

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const targetNode = target ? target.current : window
            if (targetNode) {
                targetNode.addEventListener(EVENT_NAME, handle)
            }

            return () => {
                if (targetNode) {
                    targetNode.removeEventListener(EVENT_NAME, handle)
                }
            }
        }
        return undefined
    }, [keyList, target, callback])
}
