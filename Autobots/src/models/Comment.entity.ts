import { Entity,PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "./Post.entity"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    commentid: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column("text")  // Changed to "text" to accommodate longer content
    body: string;

    @Column()
    postid: string;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;
}