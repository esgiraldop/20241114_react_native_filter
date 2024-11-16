export interface IMaintenanceRecord {
  id: number;
  type: string; // e.g., "Cambio de llantas"
  date: string; // Date of maintenance, e.g., "2024-12-12"
  mileage: number; // Vehicle mileage at the time of maintenance
  notes: string; // Any additional notes about the maintenance
}

export interface IMaintenanceRecordsSucessfullResponse {
  code: 200;
  data: IMaintenanceRecord[];
  message: 'Success';
}

export interface ISingleMaintenanceRecordSucessfullResponse {
  code: 200;
  data: IMaintenanceRecord;
  message: 'Success';
}
