import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post.entity";


class Geo {
    @Column()
    lat: string;

    @Column()
    lng: string;
}

class Address {
    @Column()
    street: string;

    @Column()
    suite: string;

    @Column()
    city: string;

    @Column()
    zipcode: string;

    @Column(type => Geo)
    geo: Geo;
}


class Company {
    @Column()
    name: string;

    @Column()
    catchPhrase: string;

    @Column()
    bs: string;
}

@Entity()
export class Autobot {
    @PrimaryGeneratedColumn('uuid')
    userid: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    website: string;

    @Column(type => Address)
    address: Address;

    @Column(type => Company)
    company: Company;

    @OneToMany(() => Post, post => post.autobot)
    posts: Post[];
}


