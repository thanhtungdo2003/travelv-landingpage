
type Tour = {
    id?: string;
    destination_id?: string;
    title?: string;
    vehicle?: string;
    tag?: string;
    price?: number;
    slots?: number;
    first_location?: string;
    start_location?: string;
    estimated_time: string;
    description: string;
    thumbnailURL?: string;
    imageURLs?: string;
    views?: number;
    created_at?: Date;
};

type Destinations = {
    id?: string;
    title: string;
    description: string;
    thumbnailURL?: string;
    lat?: number;
    lng?: number;
    created_at?: Date;
};

