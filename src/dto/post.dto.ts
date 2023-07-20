
export class CreatePostDto {
    title: string
    body: string
    slug: string
    thumbnail: string
    authorId: number
    tagId: number[]
}