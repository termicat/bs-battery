import {
  IEventCbCtx,
  bitable,
  Selection,
  ITable,
  IField,
  IGetRecordsParams,
  IRecord,
  IFieldMeta,
  type IView,
  type IConfig,
  type IDataCondition,
} from "@lark-base-open/js-sdk";
import { format } from "date-fns";
import { Emitter } from "./Emitter";
import { transDisplayRecord } from "./shared";

export type SelectionChangeEmitter = (event: IEventCbCtx<Selection>) => any;
export type InitEmitter = (sdk: BsSdk) => any;

export interface BIField {
  id: string;
  name: string;
  type: IFieldMeta["type"];
  raw?: IFieldMeta;
}

export interface BITable {
  id: string;
  name: string;
  raw?: ITable;
}

export interface BIView {
  id: string;
  name: string;
  raw?: IView;
}

export class BsSdk {
  public readonly bitable = bitable;
  public readonly base = bitable.base;
  public activeTable: ITable | undefined;
  // public readonly initEmitter = new Emitter<InitEmitter>();
  public readonly emSelectionChange = new Emitter<SelectionChangeEmitter>();

  constructor({
    onSelectionChange = false,
    immediatelySelectionChange = true,
  } = {}) {
    if (onSelectionChange) {
      this.base.onSelectionChange(async (event) => {
        this.activeTable = undefined;
        this.emSelectionChange.emitLifeCycle(event);
      });
    }
    if (immediatelySelectionChange && onSelectionChange) {
      this.getSelection().then((selection) => {
        this.emSelectionChange.emitSync({ data: selection });
      });
    }
  }

  saveConfig(config: IConfig) {
    return this.bitable.dashboard.saveConfig(config);
  }

  getConfig() {
    return this.bitable.dashboard.getConfig();
  }

  getData() {
    return this.bitable.dashboard.getData();
  }

  getPreviewData(dataCondition: IDataCondition) {
    return this.bitable.dashboard.getPreviewData(dataCondition);
  }

  getDashState() {
    return this.bitable.dashboard.state;
  }

  async getRecordIds(table?: ITable) {
    if (!table) table = await this.getActiveTable();
    return await table.getRecordIdList();
  }

  async getRecordById(table: ITable, recordId: string) {
    return await table.getRecordById(recordId);
  }

  async getActiveTable() {
    if (this.activeTable) return this.activeTable;
    this.activeTable = await bitable.base.getActiveTable();
    return this.activeTable;
  }

  async getTableList() {
    return await Promise.all(
      (
        await bitable.base.getTableList()
      ).map(async (table) => {
        const name = await table.getName();
        const id = table.id;
        return { id, name, raw: table } as BITable;
      })
    );
  }

  async getViewList(tableId: string) {
    const table = await this.getTableById(tableId);
    const viewList = (await table.raw?.getViewList()) || [];
    return await Promise.all(
      viewList.map(async (view) => {
        const name = await view.getName();
        const id = view.id;
        return { id, name, raw: view } as BIView;
      })
    );
  }

  async getTableById(tableId: string) {
    const table = await bitable.base.getTableById(tableId);
    return {
      id: table.id,
      name: await table.getName(),
      raw: table,
    } as BITable;
  }

  // async getFieldList(table: ITable) {
  //   const fieldList: BIField[] = await table.getFieldList();
  //   for (let i = 0; i < fieldList.length; i++) {
  //     const field = fieldList[i];
  //     field.name = await field.getName();
  //   }
  //   return fieldList;
  // }

  async getFiledListByViewId(tableId: string, viewId: string) {
    const table = await this.getTableById(tableId);
    const view = await table.raw?.getViewById(viewId);
    const fieldList: BIField[] = ((await view?.getFieldMetaList()) ?? []).map(
      (field) => {
        return {
          name: field.name,
          id: field.id,
          type: field.type,
          raw: field,
        } as BIField;
      }
    );
    return fieldList;
  }

  async getSelection(): Promise<Selection> {
    return await bitable.base.getSelection();
  }

  async getSelectionQuery(selection: Partial<Selection>) {
    const table = selection.tableId
      ? await this.base.getTableById(selection.tableId)
      : undefined;
    const result = {
      table: table,
      view: selection.viewId
        ? await table?.getViewById(selection.viewId)
        : undefined,
      field: selection.fieldId
        ? await table?.getFieldById(selection.fieldId)
        : undefined,
      record: selection.recordId
        ? await table?.getRecordById(selection.recordId)
        : undefined,
    };
    return result;
  }

  async getSelection2({
    viewId = false,
    fieldId = false,
    recordId = false,
  } = {}) {
    const selection = await this.getSelection();
    return await this.getSelectionQuery({
      viewId: viewId ? selection.viewId : undefined,
      fieldId: fieldId ? selection.fieldId : undefined,
      recordId: recordId ? selection.recordId : undefined,
    });
  }

  async getRecordList(table: ITable, filter?: IGetRecordsParams) {
    let pageToken;
    const records: IRecord[] = [];

    while (true) {
      const res = await table.getRecords({
        pageSize: 5000,
        ...filter,
        pageToken,
      });
      records.push(...res.records);
      pageToken = res.pageToken;
      if (!res.hasMore) {
        break;
      }
    }

    return records;
  }

  async getDisplayRecordList(
    table: ITable,
    fields: IFieldMeta[],
    filter?: IGetRecordsParams
  ) {
    const list = await this.getRecordList(table, filter);
    console.log("fields:", fields);

    const data = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      data.push({
        _id: item.recordId,
        ...transDisplayRecord(fields, item),
      });
    }

    return data;
  }
}
