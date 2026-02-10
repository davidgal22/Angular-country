import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, Injector, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Added CommonModule for *ngIf

import { ControlFullFilterService } from '../../shared/services/control-full-filter.service'; // Adjust path as needed
import { EnergyCounterViewService } from './energy-counter-view.service';
import { ViewTableManager } from '../../shared/utils/view-table-manager'; // Adjust path as needed

// Stub for PplusTableComponent to fix template error
@Component({
  selector: 'pplus-table',
  template: '<div class="p-4 border rounded bg-gray-50">AG Grid Placeholder</div>',
  standalone: true,
  imports: [CommonModule]
})
export class PplusTableComponent {
  @Input() gridOptions: any;
}


@Component({
  selector: 'app-energy-counter-view',
  templateUrl: './energy-counter-view.component.html',
  standalone: true,
  imports: [CommonModule, PplusTableComponent]
})
export class EnergyCounterViewComponent implements OnInit, OnDestroy, AfterViewInit {
  // Subscription management
  private subscriptions: Subscription[] = [];

  // Table Manager
  tableManager: ViewTableManager;

  // Chart Options
  chartOptions: any;
  chartInstance: any;
  legendState: any = {};

  constructor(
    private filterService: ControlFullFilterService,
    private cd: ChangeDetectorRef,
    private service: EnergyCounterViewService,
    private injector: Injector
  ) {
    // Inyección de dependencias similar a @Autowired en Spring Boot
    // filterService: Para escuchar cambios en los filtros globales (equivalente a un EventBus o servicio compartido).
    // cd: Para forzar la detección de cambios si es necesario (manejo manual de la vista).

    this.tableManager = new ViewTableManager();
  }

  ngOnInit(): void {
    // Suscripción a cambios de filtro global
    const filterSub = this.filterService.currentFilter$.subscribe((filter: any) => {
      this.search(filter);
    });
    this.subscriptions.push(filterSub);
  }

  ngAfterViewInit(): void {
    // Inicialización de componentes visuales que dependen del DOM
    // Aquí se inicializarían los gráficos si no se usara una directiva.
    this.initChart();
  }

  ngOnDestroy(): void {
    // Limpieza de recursos para evitar memory leaks (similar a close() en Java IO)
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // GUÍA 2: Gestión de Tablas
  async initializeTable() {
    // Configuración de columnas y datos
     const columns = this.service.getColumns();
     await this.tableManager.initialize({
       columnDefs: columns,
       getTableData: (req: any) => this.getTableData(req)
     });

     this.tableManager.setSpinnerCallbacks({
       show: () => { /* show spinner */ },
       hide: () => { /* hide spinner */ }
     });
  }

  getTableData(request: any): Observable<any> {
      return this.service.getTableData(request);
  }


  // GUÍA 4: Lógica de Negocio
  search(filter: any) {
    const searchModel = this.parseFilterData(filter);

    // 1. Llamar a dispositivos
    this.service.getDevicesByPlant(searchModel).subscribe({
      next: (devices: any) => {
        // Procesar dispositivos
      },
      error: (err: any) => {
        console.error('Error fetching devices', err);
      }
    });


    // 2. Cargar gráficos
    this.loadChartData(searchModel);

    // 3. Refrescar tabla
    if (this.tableManager.isReady) {
      this.tableManager.refreshTableData();
    } else {
      this.initializeTable();
    }
  }

  parseFilterData(filter: any): any {
    // Transformar el filtro del servicio al modelo interno de búsqueda
    return {
      // mapping properties
      ...filter
    };
  }

  loadChartData(searchModel: any) {
    this.service.getChartData(searchModel).subscribe({
        next: (data: any) => {
            // Actualizar opciones del gráfico
            this.updateChart(data);
        },
        error: (err: any) => {
             console.error('Error fetching chart data', err);
        }
    });
  }

  // GUÍA 3: Gráficos Reactivos
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  // GUÍA 3: Gráficos Reactivos
  updateChart(data: any) {
      this.chartOptions = {
          xAxis: { type: 'time' },
          tooltip: {
              formatter: (params: any) => {
                  // Custom HTML generator
                  return `<div>${params.value}</div>`;
              }
          },
          legend: {
              selected: this.legendState // Restore legend state
          },
          series: [
              // data series
              {
                name: 'Energy',
                type: 'line',
                data: data.series[0].data
              }
          ]
      };

      // Manual ECharts update
      if (this.chartInstance) {
          this.chartInstance.clear();
          this.chartInstance.setOption(this.chartOptions);
      }
  }

  initChart() {
    // This would be where you initialize ECharts manually
    // import * as echarts from 'echarts';
    // this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    console.log('Mock ECharts Init');
    this.chartInstance = {
      clear: () => console.log('Chart Clear'),
      setOption: (opt: any) => console.log('Chart SetOption', opt),
      on: (event: string, handler: Function) => {}
    };
  }

  onLegendChanged(event: any) {
      this.legendState = event.selected;
  }
}
