import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cadadstroproduto',
  templateUrl: './cadadstroproduto.component.html',
  styleUrls: ['./cadadstroproduto.component.css'],
})
export class CadadstroprodutoComponent implements OnInit {

  inputFile: any;
  pictureImage: any;
  pictureImageTxt = "Escolha uma imagem";
   url:string='';
  constructor() {}

  ngOnInit() {

  }


  upLoad() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {


      let arquivo: any = Array.from(input.files as any);
      const formadata = new FormData();
      formadata.append('arquivo', arquivo[0]);

      var reader = new FileReader();
      reader.readAsDataURL(arquivo[0]);
      reader.onload = (event: any) => {
        console.log(event);
        this.url = event.target.result;
      };

    };
    input.click();
  }
}
