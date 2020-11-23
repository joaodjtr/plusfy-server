// findTrack Controller

export interface MulterFile {
    buffer: Buffer, 
    encoding: string, 
    fieldname: string, 
    mimetype: string, 
    originalname: string, 
    size: number;
}

export interface FileCreated{
    file: MulterFile
    path: string | null
}

export interface Result{
    file: MulterFile
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