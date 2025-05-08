export type ReportColumnHeaders = {
  name: string;
  columnType: string;
  dataType: string;
}
export type ReportRow = (ReportColumnHeaders['name'] | string)[]
export type ReportKind = "youtubeAnalytics#resultTable" | "youtubeAnalytics#resultRow"
export interface ReportsData {
  rows: ReportRow[];
  columnHeaders: ReportColumnHeaders[];
  kind: ReportKind;
}