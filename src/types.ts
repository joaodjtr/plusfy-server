// findTrack Controller

export interface File{
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
}

export interface FileCreated{
    file: File
    path: string | null
}

export interface Result{
    file: File
    track: {
        id: string;
        title: string;
        artists: Array<TrackArtist>;
        duration: number;
    } | null
}

export interface TrackArtist {
    id: string;
    name: string;
    joinphrase?: string;
}