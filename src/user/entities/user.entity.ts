import { BeforeInsert, Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    username: string;

    @Column('text', {
        nullable: true,
    })
    password: string;

    @Column('text', {
        default: 'user', // Valor predeterminado 'user'
    })
    role: string;    
}
