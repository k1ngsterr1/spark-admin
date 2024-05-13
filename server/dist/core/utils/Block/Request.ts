export type NewBlockRequest = {
    userId: number;
    name: string;
    title: string;
    content: string;
    css_link: string;
    image_url?: string;
    video_url?: string;
}