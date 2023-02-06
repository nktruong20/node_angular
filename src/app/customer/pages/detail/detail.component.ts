import { FavoriteService } from './../../../services/favorite.service';
import { TourService } from './../../../services/tour.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product:any;
  acc_login:any;
  favorObject:any;
  checkFavor:any = false;
  listProduct:any;
  constructor(private actRoute: ActivatedRoute, private proService: ProductService, private favorSer: FavoriteService) { }

  ngOnInit(): void {
      this.getItem();
  }
  getItem(){
    let id = this.actRoute.snapshot.params['id'];
    this.proService.getItem(id).subscribe((item:any)=>{     
      console.log(item);
      this.listProduct = item.Products[0];     
      console.log(this.listProduct);
    })
  }

 
}
