export function uniqueByField<T>(array: T[], field: keyof T): T[] {
    const uniqueItems = new Map<string | number, T>()

    array.forEach((item: T) => {
        const fieldValue = item[field]
        if (!uniqueItems.has(String(fieldValue))) {
            uniqueItems.set(String(fieldValue), item)
        }
    })

    return Array.from(uniqueItems.values())
}
