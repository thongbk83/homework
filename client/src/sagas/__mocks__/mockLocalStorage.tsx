let localStorage = {};

export default {
    setItem(key: string, value: any) {
        return Object.assign(localStorage, { [key]: value });
    }
};
