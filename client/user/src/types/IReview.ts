export interface Ireview {
    id: number;
    content: string;
    stars: number;
    createdDate: string;
    user: {
        username: string;
        avatarUrl: string;
    };
}
