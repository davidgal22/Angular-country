import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergyCounterViewService {
  private apiUrl = '/api/energy'; // Backend endpoint for energy data

  constructor(private http: HttpClient) { }

  getColumns(): any[] {
    return [
      { field: 'timestamp', headerName: 'Time', sortable: true },
      { field: 'value', headerName: 'Value', sortable: true },
       // Add more columns as needed
    ];
  }

  getDevicesByPlant(searchModel: any): Observable<any[]> {
    // Mock implementation - replace with actual API call
    // return this.http.post<any[]>(`${this.apiUrl}/devices`, searchModel);
    return of([{ id: 1, name: 'Device 1' }, { id: 2, name: 'Device 2' }]);
  }

  getChartData(searchModel: any): Observable<any> {
    // Mock implementation - replace with actual API call
    // return this.http.post<any>(`${this.apiUrl}/chart-data`, searchModel);
    return of({
       series: [
           { name: 'Series 1', data: [[1673654400000, 100], [1673740800000, 150]] }
       ]
    });
  }

  getTableData(request: any): Observable<any> {
      // Implementation for ViewTableManager
      // return this.http.post<any>(`${this.apiUrl}/table-data`, request);
      return of({
          rows: [],
          totalCount: 0
      });
  }
}
