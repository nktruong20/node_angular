import { FavoriteService } from './../../../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any;
  constructor(private proService: ProductService, private favorSer: FavoriteService) { }
  saleProduct:any;
  newProduct:any;
  acc_login:any;
  favorObject:any;
  ngOnInit(): void {
    this.acc_login = sessionStorage.getItem('acc_login');
    this.acc_login = JSON.parse(this.acc_login);
    if(this.acc_login){
      this.getAll(this.acc_login.id);
    }else{
      this.getAll();
    }
    this.getNew();
    this.getSale(); 
    this.favorSer.totalFavor.subscribe((data:any) => {
      if(this.acc_login){
        this.getAll(this.acc_login.id);
      }else{
        this.getAll();
      }
    })
  }
  getAll(favor:any = null): void {
    this.proService.getAll(favor).subscribe((products:any) => {
      this.products = products.result;
    })
  }
  getNew(): void {
    this.proService.getNew().subscribe((newproduct:any) => {
      this.newProduct = newproduct.result;     
    })
  }
  getSale(): void {
    this.proService.getSale().subscribe((saleProduct:any) => {
      this.saleProduct = saleProduct.result;
    })
  }

}
