export interface IRowByList extends IChangeRow {
  child: IRowByList[];
}

interface defRow {
  equipmentCosts: number,
  estimatedProfit: number,
  machineOperatorSalary: number,
  mainCosts: number,
  materials: number,
  mimExploitation: number,
  overheads: number,
  rowName: string,
  salary: number,
  supportCosts: number,
}

export type TUpdateOneRow = defRow

export interface IPostRow extends defRow{
  parentId: number | null,
}

export interface IChangeRow extends defRow {
  id: number;
  total: number;
}

export interface IResonceByCreateRow {
  changed: IChangeRow[];
  current: IChangeRow;
}