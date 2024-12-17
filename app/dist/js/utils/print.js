export function Print(...objects) {
    for (const object of objects) {
        console.log(object.convertToText());
    }
}
