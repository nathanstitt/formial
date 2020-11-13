import { Ref, useEffect, useCallback, useRef, useMemo } from "react";


interface Options {
  /**
   * target ref on which the events should be listened. If no target is specified,
   * events are listened to on the window
   */
  target?: Ref<HTMLElement>;
}

const EVENT_NAME = 'keydown'

const defaultOptions = {


};

/**
 * useKey hook
 *
 * Fires a callback on keyboard events like keyDown, keyPress and keyUp
 *
 * @param {[string|number]} keyList
 * @param {function} callback
 * @param {Options} options
 */

// hook from https://usehooks.com/useKeyPress/
export function useKeyPress(
    keys: string | Array<string>,
    callback: (e: KeyboardEvent) => any,
    opts?: Options
): void {
    const keyList: Array<string> = useMemo(() => {
        if (Array.isArray(keys)) {
            return keys;
        } else {
            return [keys];
        }
    }, [keys]);
    const options = (<any>Object).assign({}, defaultOptions, opts);

    const callbackRef = useRef<(e: KeyboardEvent) => any>(callback);
    let { target } = options;

    useEffect(() => {
        callbackRef.current = callback;
    });

    const handle = useCallback(
        (e: KeyboardEvent) => {
            if (keyList.some(identifier => e.key === identifier)) {
                callbackRef.current(e);
            }
        },
        [keyList]
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            const targetNode = target ? target.current : window;
            targetNode && targetNode.addEventListener(EVENT_NAME, handle);

            return () => {
                targetNode && targetNode.removeEventListener(EVENT_NAME, handle);
            };
        }
        return undefined
    }, [keyList, target, callback]);
}
