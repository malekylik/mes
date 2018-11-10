function setFactory(o: object): any {
    const structure: object = {};

    Object.getOwnPropertyNames(o).forEach((prop) => {
        structure[prop] = o[prop]; 
    });

    return structure;
}

export {
    setFactory
};
