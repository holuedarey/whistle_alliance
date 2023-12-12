import { Component, OnInit } from '@angular/core';
import { isMobile } from 'mobile-device-detect';
import { TableFilterComponent } from 'src/app/@tables/table-filter/table-filter.component';
import { TableTagComponent } from 'src/app/@tables/table-tag/table-tag.component';
import { TableService } from 'src/app/@tables/table.service';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit {

  isMobile = isMobile;
  selectedRow: any;
  data = [
    {
      name: 'Leanne Graham',
      username: 'Bret',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: '{"status": "success", "value":"Completed"}',
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
    },
    {
      name: 'Ervin Howell',
      username: '{"status": "danger", "value":"Completed"}',
    },
    {
      name: 'Ervin Howell',
      username: '{"status": "danger", "value":"Completed"}',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      name: 'Clementine Bauch',
      username: 'Samantha',
    },
    {
      name: 'Patricia Lebsack',
      username: 'Karianne',
    },
  ];

  columns = {
    name: {
      title: 'Assets',
    },
    username: {
      title: 'Status',
      type: 'custom',
      renderComponent: TableTagComponent,
    },
  }

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    console.log('');
  }

  selectedInput(data: any) {
    this.selectedRow = data.data;
  }

}
