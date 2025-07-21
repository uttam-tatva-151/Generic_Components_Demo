export type TableColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'boolean'
  | 'icon'
  | 'badge'
  | 'avatar'
  | 'chip'
  | 'progress'
  | 'action'
  | 'custom';

export interface TableColumn {
  key: string;
  header: string;
  type?: TableColumnType;
  width?: string;
  align?: 'left'|'center'|'right';
  sortable?: boolean;
  filterable?: boolean;
  sticky?: boolean;
  hidden?: boolean;
  class?: string;
  style?: { [key: string]: any };
  cellTemplate?: any;
  headerTemplate?: any;
  group?: string;
  badgeColor?: (row:any) => string;
  customRender?: (row:any, col:TableColumn) => string;
}

export interface TableAction {
  icon?: string;
  label?: string;
  color?: string;
  class?: string;
  show?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
  handler: (row: any) => void;
  tooltip?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  actions?: TableAction[];
  data: any[];
  selection?: 'none'|'single'|'multiple';
  expandableRows?: boolean;
  expandedTemplate?: any;
  pagination?: boolean;
  pageSizeOptions?: number[];
  stickyHeader?: boolean;
  themeClass?: string;
  striped?: boolean;
  bordered?: boolean;
  dense?: boolean;
  responsive?: boolean;
  loading?: boolean;
  noDataText?: string;
  showIndex?: boolean;
}