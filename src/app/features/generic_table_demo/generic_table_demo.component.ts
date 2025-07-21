import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableConfig } from '../../core/modals/table-modal';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../shared/components/table/table.component";

@Component({
  selector: 'app-generic_table_demo',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './generic_table_demo.component.html',
  styleUrls: ['./generic_table_demo.component.css'],
})
export class Generic_table_demoComponent implements OnInit {
  users = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@ex.com',
      age: 32,
      status: 'active',
      progress: 80,
      avatar: 'https://i.pravatar.cc/40?img=1',
      admin: true,
      date: new Date('2022-06-03'),
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@ex.com',
      age: 28,
      status: 'pending',
      progress: 56,
      avatar: 'https://i.pravatar.cc/40?img=2',
      admin: false,
      date: new Date('2023-01-14'),
    },
    {
      id: 3,
      name: 'Carol',
      email: 'carol@ex.com',
      age: 45,
      status: 'inactive',
      progress: 22,
      avatar: 'https://i.pravatar.cc/40?img=3',
      admin: false,
      date: new Date('2021-08-19'),
    },
  ];
  projects = [
    {
      id: 1,
      project: 'Apollo',
      owner: 'Alice',
      budget: 120000,
      done: 90,
      active: true,
      created: new Date('2024-01-05'),
    },
    {
      id: 2,
      project: 'Hermes',
      owner: 'Bob',
      budget: 95000,
      done: 30,
      active: false,
      created: new Date('2023-07-19'),
    },
  ];
  sales = [
    { region: 'EMEA', month: 'June', value: 34000 },
    { region: 'Americas', month: 'June', value: 28500 },
    { region: 'APAC', month: 'June', value: 26100 },
  ];

  // For expandable row template
  @ViewChild('expandedRow', { static: true }) expandedRowTemplate!: TemplateRef<any>;

  // Demo configs
  tableDemos: { label: string; config: TableConfig }[] = [
    {
      label: 'Basic Table',
      config: {
        columns: [
          { key: 'name', header: 'Name', type: 'text', sortable: true },
          { key: 'email', header: 'Email', type: 'text' },
          {
            key: 'age',
            header: 'Age',
            type: 'number',
            align: 'right',
            sortable: true,
          },
        ],
        data: [],
        striped: true,
        bordered: true,
        pagination: false,
        showIndex: true,
        noDataText: 'No users',
        themeClass: '',
      },
    },
    {
      label: 'Table with Avatars, Badges, Progress',
      config: {
        columns: [
          { key: 'avatar', header: '', type: 'avatar', width: '48px' },
          { key: 'name', header: 'Name', type: 'text', sortable: true },
          {
            key: 'status',
            header: 'Status',
            type: 'badge',
            badgeColor: (row: any) =>
              row.status === 'active'
                ? '#1db97e'
                : row.status === 'pending'
                ? '#f9a825'
                : '#e53935',
            width: '90px',
          },
          {
            key: 'progress',
            header: 'Progress',
            type: 'progress',
            width: '130px',
          },
        ],
        data: [],
        striped: true,
        pagination: false,
      },
    },
    {
      label: 'Table with Actions & Selection',
      config: {
        columns: [
          { key: 'name', header: 'Name', type: 'text' },
          { key: 'admin', header: 'Admin', type: 'boolean', width: '80px' },
        ],
        actions: [
          {
            icon: 'fa-solid fa-user-edit',
            label: 'Edit',
            handler: (row: any) => alert('Edit: ' + row.name),
          },
          {
            icon: 'fa-solid fa-trash',
            label: 'Delete',
            color: '#ffe1e6',
            handler: (row: any) => alert('Delete: ' + row.name),
          },
        ],
        data: [],
        selection: 'multiple',
        striped: true,
        bordered: true,
      },
    },
    {
      label: 'Table with Pagination & Sticky Header',
      config: {
        columns: [
          { key: 'project', header: 'Project', type: 'text' },
          { key: 'owner', header: 'Owner', type: 'text' },
          { key: 'budget', header: 'Budget', type: 'number', align: 'right' },
          {
            key: 'done',
            header: 'Complete %',
            type: 'progress',
            width: '120px',
          },
        ],
        data: [],
        pagination: true,
        pageSizeOptions: [1, 2, 5],
        stickyHeader: true,
        striped: true,
        bordered: true,
        showIndex: true,
      },
    },
    {
      label: 'Table with Expandable Rows',
      config: {
        columns: [
          { key: 'name', header: 'Name', type: 'text' },
          { key: 'email', header: 'Email', type: 'text' },
          { key: 'date', header: 'Joined', type: 'date' },
        ],
        data: [],
        expandableRows: true,
        expandedTemplate: null, // set in ngOnInit
        striped: true,
        bordered: true,
      },
    },
    {
      label: 'Dense Table with Custom Chips',
      config: {
        columns: [
          {
            key: 'region',
            header: 'Region',
            type: 'chip',
            badgeColor: (_row: any) => '#1976d2',
          },
          { key: 'month', header: 'Month', type: 'text' },
          { key: 'value', header: 'Sales', type: 'number', align: 'right' },
        ],
        data: [],
        dense: true,
        striped: false,
        bordered: false,
      },
    },
  ];

  activeConfig: TableConfig;
  Math = Math; // for template use

  constructor() {
    // Assign demo data to each config
    this.tableDemos[0].config.data = this.users;
    this.tableDemos[1].config.data = this.users;
    this.tableDemos[2].config.data = this.users;
    this.tableDemos[3].config.data = this.projects;
    this.tableDemos[4].config.data = this.users;
    this.tableDemos[5].config.data = this.sales;

    this.activeConfig = this.tableDemos[0].config;
  }

  ngOnInit() {
    // For expandable row demo, set a template if present
    if (this.expandedRowTemplate) {
      this.tableDemos[4].config.expandedTemplate = this.expandedRowTemplate;
    }
  }

  showTable(index: number) {
    this.activeConfig = this.tableDemos[index].config;
  }
}