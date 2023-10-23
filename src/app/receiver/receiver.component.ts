import { Component, OnInit } from '@angular/core';
import { ReceiverService } from './receiver.service';
import { Arquivo } from '../arquivo.model';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit{
  list!: Arquivo[];

    selectedFile!: Arquivo;
    productDialog: boolean = false;

    submitted: boolean = false;
    
    startByte!: number;

    chunkSize!: number;

    statuses!: any[];
    
    file!: Arquivo;

    constructor(private receiverService: ReceiverService) {}

    ngOnInit() {
      this.receiverService.listFiles().subscribe(
        (arquivos: Arquivo[]) => {
          this.list = arquivos;
        },
        (error: any) => {
          console.error('Erro ao obter a lista de arquivos: ', error);
        }
      );
      
    } 



  showDetails(file: Arquivo) {
    this.file = { ...file };
    this.productDialog = true;
};

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}



download() {
  this.submitted = true;

  if (this.file) {
    this.receiverService.downloadFile(this.file.fileName,this.file.ipAddress,this.file.port,this.startByte,this.chunkSize).subscribe(
      (res:any) => {
        console.log(`Arquivo ${this.file.fileName} baixado com sucesso.`);
      },
      (error: any) => {
        console.error('Erro ao obter a lista de arquivos: ', error);
      }
    );
      this.productDialog = false;
  }
}
}
