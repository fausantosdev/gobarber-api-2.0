import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  provider: string

  @Column('timestamp with time zone')
  date: Date

  @Column('timestamp')
  created_at: Date

  @Column('timestamp')
  updated_at: Date
}
