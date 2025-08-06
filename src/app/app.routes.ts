import { Generic_table_demoComponent } from './features/generic_table_demo/generic_table_demo.component';
import { Routes } from '@angular/router';
import { Generic_buttons_demoComponent } from './features/generic_buttons_demo/generic_buttons_demo.component';
import { Generic_input_field_demoComponent } from './features/generic_input_field_demo/generic_input_field_demo.component';
import { Generic_modal_demoComponent } from './features/generic_modal_demo/generic_modal_demo.component';
import { Generic_snackbar_demoComponent } from './features/generic_snackbar_demo/generic_snackbar_demo.component';
import { Generic_card_demoComponent } from './features/generic_card_demo/generic_card_demo.component';

export const routes: Routes = [
  {path: '', redirectTo: '/button-demo', pathMatch: 'full'},
  {path: 'button-demo', component: Generic_buttons_demoComponent},
  {path: 'input-demo', component: Generic_input_field_demoComponent},
  {path: 'modal-demo', component: Generic_modal_demoComponent},
  {path: 'snackbar-demo', component: Generic_snackbar_demoComponent},
  {path: 'table-demo', component: Generic_table_demoComponent},
  {path: 'card-demo', component: Generic_card_demoComponent}
];
