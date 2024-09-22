export const ComponentTypes = {
    PRODUCT:'Product',
    DONATION:'donation',
    GIFT:'gift',
    EVENT:'event',
    PARTICIPATE: 'participate',
    REGISTER: 'register',
    HISTORY:'history'
} as const;

export type ComponentTypes = typeof ComponentTypes[keyof typeof ComponentTypes];

