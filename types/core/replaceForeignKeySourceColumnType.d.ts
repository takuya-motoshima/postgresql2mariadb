/**
 * Replace the type of the foreign key source column inside the `CREATE TABLE` statement with the type of the foreign key destination column.
 * @param {string} str String.
 * @return {string} A string in which the type of the foreign key source column is replaced by the type of the foreign key destination column.
 */
declare const _default: (str: string) => string;
export default _default;
