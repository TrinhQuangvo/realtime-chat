
export class CreatePostDto {
    title: string
    body: string
    slug: string
    thumbnail: string
    authorId: string
    tagId: string[]
}

export class UpdatePostDto {
    title?: string
    body?: string
    slug?: string
    thumbnail?: string 
    tagId?: string[]
}