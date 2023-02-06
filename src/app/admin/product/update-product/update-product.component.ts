import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  formUpdate =  new FormGroup({
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
  categories:any = [];
  imageCreate:any;
  constructor(private cateSer: CategoryService, private proService: ProductService  ,private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getCategories();
    var id = this.actRoute.snapshot.params['id'];
    this.proService.getItem(id).subscribe((item:any)=>{
      console.log(item);
      
      this.formUpdate.patchValue(item.Products[0])
      this.formUpdate.patchValue({status:this.form.status.value});
    })
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
      this.form.image.value = file.name;
      this.imageCreate = reader.result;
    }
  }
  update(){
    var id = this.actRoute.snapshot.params['id'];
    this.proService.update(this.formUpdate.value, id).subscribe((data:any) => {
      console.log(data);
      
      this.router.navigate(['/admin/product']);
    });
  }
  get form():any{
    return this.formUpdate.controls;
  }
}
