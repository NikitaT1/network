
export const requiredField = (value) => {
    if (value) return undefined;
    return "Filed is required"
};

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length <= maxLength) return undefined;
    return `Max length is ${maxLength} symbols`
};


