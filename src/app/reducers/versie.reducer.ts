export const VERSIE = 'VERSIE';

export const versieTaal = (state, {type, payload}) => {
    switch (type) {
        case VERSIE:
            return [payload];
        default:
            return state;
    }
};
