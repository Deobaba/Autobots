import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Autobot } from "./Autobot.entity"
import { Comment } from "./Comment.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    postid: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    userId: string;

    @ManyToOne(() => Autobot, (autobot: { posts: any; }) => autobot.posts)
    autobot: Autobot;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}