export function Iterator<T>(array: Array<T>, amount: number, currentIndex?: number) {

    let current = currentIndex ?? 0;
    length = array.length;

    return () => {
        let end = current + amount;
        let part = array.slice(current, end);
        if (end > length) {
            end = end % length;
            part = part.concat(array.slice(0, end));
        }
        current = end;
        return part;
    };
};