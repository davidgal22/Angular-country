import { Injectable } from '@angular/core';

export class ViewTableManager {
  isReady: boolean = false;
  gridOptions: any = {};

  constructor() {}

  async initialize(config: any) {
    this.isReady = true;
  }
  setSpinnerCallbacks(callbacks: any) {}
  onGridReady(event: any) {}
  refreshTableData() {}
}
