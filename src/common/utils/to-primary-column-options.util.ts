import { ColumnType, PrimaryColumnOptions, TableColumn } from 'typeorm'

export const toPrimaryColumnOptions = (tableColumn: TableColumn): PrimaryColumnOptions => {
  return {
    ...tableColumn,
    type: tableColumn.type as ColumnType,
  }
}
