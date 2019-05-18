import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

/*
* Entity Contact
* Class that maps to the database's contact table
* */

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 20
    })
    firstname: string

    @Column({
        length: 20
    })
    lastname: string

    @Column({
        length: 20
    })
    phonenumber: string
}