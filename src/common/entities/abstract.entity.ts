import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @CreateDateColumn()
  @Exclude()
  createdAt: Date

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date
}
