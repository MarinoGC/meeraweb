export interface ItemType {
    name:string;
    id:number;
    data:{};
}

export const NavItems = [
    { name: 'home',    id: 0, data: {
        name: 'HOME',
        nav: 'nav0',
        veldA: 'veld0A',
        veldB: 'veld0B',
        vis: [true, false, false, false, false, false]}
    },
    { name: 'paintings',    id: 1, data: {
        name: 'PAINTINGS',
        nav: 'nav1',
        veldA: 'veld1A',
        veldB: 'veld1B',
        vis: [false, true, false, false, false, false]}
    },
    { name: 'sculptures',    id: 2, data: {
        name: 'SCULPTURES',
        nav: 'nav2',
        veldA: 'veld2A',
        veldB: 'veld2B',
        vis: [false, false, true, false, false, false]}
    },
    { name: 'teachings',    id: 3, data: {
        name: 'TEACHINGS',
        nav: 'nav3',
        veldA: 'veld3A',
        veldB: 'veld3B',
        vis: [false, false, false, true, false, false]}
    },
    { name: 'biography',    id: 4, data: {
        name: 'BIOGRAPHY',
        nav: 'nav4',
        veldA: 'veld4A',
        veldB: 'veld4B',
        vis: [false, false, false, false, true, false]}
    },
    { name: 'contact',    id: 5, data: {
        name: 'CONTACT',
        nav: 'nav5',
        veldA: 'veld5A',
        veldB: 'veld5B',
        vis: [false, false, false, false, false, true]}
    },
];


