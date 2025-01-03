// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: string;

//   @Column()
//   name: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'viewer' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
