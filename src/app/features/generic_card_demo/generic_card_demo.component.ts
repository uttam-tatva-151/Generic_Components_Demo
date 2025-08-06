import { Component, OnInit } from '@angular/core';
import { GenericCardConfig, GenericCardComponent } from 'generic-components-angular';
import { genericCardDemoConfig } from './Config_models/generic-card-config';
import { PrimaryCardComponent } from "../../../../node_modules/generic-card";
import { primaryCardDemoConfig } from './Config_models/primary_card_config';

@Component({
  selector: 'app-generic_card_demo',
  templateUrl: './generic_card_demo.component.html',
  styleUrls: ['./generic_card_demo.component.css'],
  imports: [GenericCardComponent, PrimaryCardComponent]
})
export class Generic_card_demoComponent {

  cardConfig = genericCardDemoConfig as GenericCardConfig;
  primaryCardConfig: GenericCardConfig = primaryCardDemoConfig;
}
