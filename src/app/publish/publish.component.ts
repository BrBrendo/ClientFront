import { Component, OnInit } from '@angular/core';
import { PublishService } from './publish.service';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit{

  maxFileSize: number = 1000000;
  
    productDialog: boolean = true;

    submitted: boolean = false;
    
    startByte!: number;

    chunkSize!: number;

    statuses!: any[];
    
    fileNames: string[] = [];

    uploadedFiles: any[] = [];

    constructor(private publishService : PublishService) {}

    ngOnInit() {
      this.productDialog = true;
    } 

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}


onUpload(event: any) {
  for (let file of event.files) {
    this.fileNames.push(file.name);
  }

  // Chame o método para enviar a lista de nomes de arquivos para o servidor
  this.publishService.uploadFileName(this.fileNames)
    .subscribe(
      (response: any) => {
        console.log('Nomes de arquivo enviados com sucesso para o servidor.');
      },
      (error: any) => {
        console.error('Erro ao enviar nomes de arquivo para o servidor: ', error);
      }
    );
}


}
