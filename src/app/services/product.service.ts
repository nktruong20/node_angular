import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = "http://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAll(accountId:any = null){
    return this.http.get(`${API}/product`);
  }
  getByCate(cate_id:any, accountId:any = null){
    if(accountId){
      
      return this.http.get(`${API}/productByCategory/${cate_id}?favor=${accountId})`);
    }else{
      return this.http.get(`${API}/productByCategory/${cate_id}`);
    }
  }
  orderBy(column:string, orderBy:string){
    return this.http.get(`${API}/new-product`);
  }
  getNew(){
    return this.http.get(`${API}/new-product`);
  }
  getSale(){
    return this.http.get(`${API}/sale-product`);
  }
 
  create(data:any){
    return this.http.post(`${API}/product`,data)
  }
  upload(file: any) {
    const formData: FormData = new FormData();
    formData.append('image', file);
    return this.http.post(`${API}/upload`, formData);
  }
  update(data:any, id:number){
    return this.http.put(`${API}/product/${id}`,data)
  }
  delete(id:any){
    return this.http.delete(`${API}/product/${id}`)
  }
  getItem(id:number){
    return this.http.get(`${API}/product/${id}`);
  }
  
}
