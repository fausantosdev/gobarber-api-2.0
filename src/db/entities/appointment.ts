import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  provider: string

  @Column('timestamp with time zone')
  date: Date
}
