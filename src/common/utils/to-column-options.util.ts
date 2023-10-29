import { TableColumn } from 'typeorm'
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions'

export const toColumnOptions = (tableColumn: TableColumn): ColumnCommonOptions => {
  return {
    ...tableColumn,
  }
}
