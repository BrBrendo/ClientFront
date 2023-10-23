import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  value!: number;
  
  paymentOptions: any[] = [
      { name: 'Publicar', value: 1 },
      { name: 'Receber', value: 2 }
  ];

}
