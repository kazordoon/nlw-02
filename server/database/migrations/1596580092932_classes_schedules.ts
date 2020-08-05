import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassesSchedules extends BaseSchema {
  protected tableName = 'classes_schedules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('week_day').notNullable()
      table.integer('from').notNullable()
      table.integer('to').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
