import { IToolbar } from "../../../ts-toolbar";
import { DataPage } from "../../../muon";
import { ICellMeta, IFormats, ISpreadsheetConfig } from "../types";
export declare function getColorpickerTemplate(color: string, icon: string): string;
export declare function updateToolbar(toolbar: IToolbar, cellInfo: ICellMeta): void;
export declare function getToggledValue(page: DataPage, cell: string, name: string, value: any): string;
export declare function getFormatItem(format: IFormats, example?: string): string;
export declare function getFormatsDropdown(config: ISpreadsheetConfig): {
    id: string;
    css: string;
    html: string;
}[];
