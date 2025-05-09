export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type DebouncedFunction = (...args: unknown[]) => void;
type DebouncedAsyncFunction =
  | ((...args: unknown[]) => Promise<unknown>)
  | ((...args: unknown[]) => Promise<void>);

export const debounce = <T extends DebouncedFunction>(fn: T, ms: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
export const debounceAsync = <T extends DebouncedAsyncFunction>(
  fn: T,
  ms: number
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const resolvedResult = (await fn(...args)) as ReturnType<T>;
        resolve(resolvedResult);
      }, ms);
    });
  };
};
export const classNamesBuilder = (
  ...classNames: (string | Record<string, boolean>)[]
) => {
  const classNamesArray: string[] = [];

  classNames.reduce((acc, className) => {
    if (typeof className === "string") {
      acc.push(className);
    } else if (typeof className === "object") {
      Object.entries(className).forEach(([className, condition]) => {
        if (condition) acc.push(className);
      });
    }
    return acc;
  }, classNamesArray);

  return classNamesArray.join(" ");
};
export const formatStringNumber = (num: string) => {
  if (!num) return "0";

  const commaFormatted = new Intl.NumberFormat("en-US");
  return commaFormatted.format(parseInt(num));
};

export const shortNumber = (num: number) => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${Math.floor(num / 1000)}K`;
  return `${Math.floor(num / 1000000)}M`;
};

export const formatIso8601Duration = (duration: string) => {
  const isoDurationRegex = /^P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;

  const match = duration.match(isoDurationRegex);

  if (!match) return { hours: "00", minutes: "00", seconds: "00" };

  const [_, hours = "00", minutes = "00", seconds = "00"] = match;
  
  return { hours, minutes, seconds };
};

export const buildErrorMessage = (message: string, error?: Error | unknown) => {
  if (error && error instanceof Error) {
    return `${message}: ${error.message}`;
  }
  return message;
};

export const calculateTrend = (currentValue: number, previousValue: number) => {
  const trend = ((currentValue - previousValue) / previousValue) * 100;
  return Number(trend.toFixed(2));
};
