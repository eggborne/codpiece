export const randomInt = (min, max) => Math.round(Math.random() * (max - min) + min);

export const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
