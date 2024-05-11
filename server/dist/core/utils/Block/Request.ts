export type NewBlockRequest = {
    userId: number;
    name: string;
    title: string;
    content: string;
    image_url?: string;
    video_url?: string;
}