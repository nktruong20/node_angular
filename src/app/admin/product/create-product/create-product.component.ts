import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  currentFile:any;
  cateId:any;
  formCreate =  new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    status: new FormControl(0,[
      Validators.pattern('[0,1]{1}'),
      Validators.required
    ]),
    price: new FormControl('',[
      Validators.required,
    ]),
    sale_price: new FormControl('',[
      Validators.required,
    ]),
    description: new FormControl('',[
      Validators.required,
    ]),
    category_id: new FormControl('',[
      Validators.required,
    ]),
    image: new FormControl('',[
      Validators.required,
    ])
  })
  imageCreate:any;
  categories:any = []

  constructor(private proService:ProductService,private cateSer:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.form.status.setValue('0');
  }
  getCategories(){
    this.cateSer.getAll().subscribe((categories:any)=>{
      this.categories = categories.categories;
    })
  }
  changeImage(event:any){
    const reader = new FileReader();
    const file = event.target.files;
    reader.readAsDataURL(file[0]);
    reader.onload = ()=>{
      this.form.image.value = file[0].name;
      this.imageCreate = reader.result;
    }
    this.currentFile = event.target.files[0];
    
  }
  getCategory(value:any){
    this.cateId = parseInt(value);
  }
  create(){
    let data = this.formCreate.value;
    this.proService.upload(this.currentFile).subscribe((res: any) => {
      let file_name: any = res.result;
      data.image = file_name;
      data.category_id = this.cateId;
      this.proService.create(data).subscribe((data) => {
          this.router.navigate(['/admin/product'])
      })
    })
  }
  get form():any{
    return this.formCreate.controls;
  }

}
