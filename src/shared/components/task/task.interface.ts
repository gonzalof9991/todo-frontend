

export interface ITask {
    categories:     ICategory[];
    completed:      boolean;
    completed_time: number | null;
    created_at:     Date | string | null;
    description:    string;
    estimated_time: number;
    id:             number;
    title:          string;
    priority:       string;
    type:           string;
    updated_at:     Date | string | null;
}

export interface ICategory {
    created_at:  Date | string | null;
    description: string | null;
    id:          number;
    name:        string;
    updated_at:  null;
}

