export interface ContentBlock {
    _id: string
    _type: string
    _children: ContentBlock[]
}

export type PartialContentBlock = Omit<ContentBlock, "_id">

export interface TextBlock extends ContentBlock {
    content: TextModel[]
}

export interface TasksBlock extends ContentBlock {
    tasks: TaskItem[]
}

export interface TaskItem {
    name: string
    completed: boolean
}

export interface TextModel {
    element: string
    style: string
    text: string
}