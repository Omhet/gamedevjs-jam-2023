interface Dictionary<T> {
    [key: string]: T[]
}

export function groupBy<T>(array: T[], field: keyof T): Dictionary<T> {
    return array.reduce((accumulator: Dictionary<T>, currentItem: T) => {
        const key = String(currentItem[field])
        if (!accumulator[key]) {
            accumulator[key] = []
        }
        accumulator[key].push(currentItem)
        return accumulator
    }, {})
}
