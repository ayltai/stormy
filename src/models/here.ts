type Address = {
    label : string,
};

type Position = {
    lat : number,
    lng : number,
};

export type Item = {
    address   : Address,
    position? : Position,
};

export type Here = {
    items : Item[],
};
