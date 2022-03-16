export interface Post {
    content: string;
    title: string;
    id?: string;    // ?: tells it's a string but it's optional property to have(i.e id is optional)
}