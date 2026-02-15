export type ImageType = {
    id: string,
    file: File,
    previewUrl: string,
    caption: string,
    status: 'idle' | 'loading' | 'success' | 'error',
    error: string

}

