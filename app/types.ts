// types.ts
export interface Logger {
    id: number;
    created: string;
    modified: string;
    title: string;
    inputs: any[];
    path: string;
}