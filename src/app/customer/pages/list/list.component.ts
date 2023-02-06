import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { FavoriteService } from './../../../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allProduct:any;
  acc_login:any;
  favorObject:any;
  keyword:any;
  allCate:any;
  idHeader:any;
  constructor( private router: Router ,private proService:ProductService,private favorSer: FavoriteService, private cateSer: CategoryService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStart();
    this.favorSer.totalFavor.subscribe((data:any) => {
      this.getStart();
    })
  }
  getStart(){
    let id = this.actRoute.snapshot.params['id'];
    this.idHeader = id;
    this.acc_login = sessionStorage.getItem('acc_login');
    this.acc_login = JSON.parse(this.acc_login);
    
    if(id){
      if(this.acc_login){
        this.proService.getByCate(id, this.acc_login.id).subscribe((data:any)=>{
          this.allProduct = data.Products;
        })
      }else{
        this.proService.getByCate(id).subscribe((data:any)=>{
          this.allProduct = data.Products;
        })
      }
    }else{
      if(this.acc_login){
        this.proService.getAll(this.acc_login.id).subscribe((data:any)=>{
          this.allProduct = data.Products;
        })
      }else{
      
      }
    }
    this.getAllCate();
  }
  getAllCate(){
    this.cateSer.getAll().subscribe((data:any)=>{
      this.allCate = data.categories;
    })
  }
  getAllProduct(): void {
    this.proService.getAll().subscribe((item:any) => {
      this.allProduct = item.Products;
    })
  }
  getListTourByCategory(value:any){
    if(value == 'all'){
        this.router.navigate([`/list`])
    }else{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.proService.getAll().subscribe((data:any)=>{
          this.allProduct = data.Products;
        })
        this.router.navigate([`/list/${value}`])
      });
    }
  }
}
