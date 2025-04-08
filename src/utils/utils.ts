export const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type DebouncedFunction = (...args: any[]) => void
type DebouncedAsyncFunction = (...args: any[]) => Promise<any>
export const debounce = <T extends DebouncedFunction>(fn: T, ms: number) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms)
    }
}
export const debounceAsync = <T extends DebouncedAsyncFunction>(fn: T, ms: number) => {
    let timer: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>): Promise<T> => {
        console.log('debouncing to new promise')
        return new Promise((resolve) => {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                const resolvedResult = await fn(...args)
                resolve(resolvedResult)
            }, ms)
        })
    }
}
export const classNamesBuilder = (...classNames: (string | Record<string, boolean>)[]) => {
    const classNamesArray: string[] = [];

    classNames.reduce((acc, className) => {
        if (typeof className === "string") {
            acc.push(className);
        } else if (typeof className === "object") {
            Object.entries(className).forEach(([className, condition]) => {
                if (condition) acc.push(className);
            })
        }
        return acc;
    }, classNamesArray)

    return classNamesArray.join(" ");
}