import {Column, Model, Table} from "sequelize-typescript";

@Table
export class Post extends Model{
    @Column
    postName: string

    @Column
    image_url: string;

    @Column
    postMiniText:string;

    @Column
    postText: string;
}