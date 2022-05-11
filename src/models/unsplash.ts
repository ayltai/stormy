type Urls = {
    raw : string,
};

type Links = {
    html : string,
};

type User = {
    name  : string,
    links : Links,
};

export type Photo = {
    urls  : Urls,
    links : Links,
    user  : User,
};
