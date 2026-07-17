export const VTYPES = {
    movies: { type: 'movie', label: 'Movies', singular: 'Movie' },
    tvshows: { type: 'tvshow', label: 'TV Shows', singular: 'TV Show' },
} as const;

export type VTypeParam = keyof typeof VTYPES;
export type VType = (typeof VTYPES)[VTypeParam];
export type VideoType = VType['type'];

export const resolveVType = (vtype?: string): VType =>
    VTYPES[vtype as VTypeParam] ?? VTYPES.movies;
