import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder } from '@angular/forms';
import { ProductI, Reponse } from 'src/dataInterface';
import { Categorie, Marque, Repons, Repons2 } from 'src/dataInterface2';
import { AddProductComponent } from './add-product/add-product.component';
import { Produit } from '../Interface';
import { Router } from '@angular/router';
import gsap from 'gsap';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
  // imports: [ViewChild]
})
export class ListeComponent implements OnInit {


  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];
  selectedFilterField: string = 'libelle';

  productToEdit!: Array<ProductI>
  products!: Array<ProductI>
  @ViewChild(AddProductComponent) child!: AddProductComponent;
  marques!: Array<Marque>
  categories!: Array<Categorie>
  searchTerm: string = ''
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) {
  }
  ngOnInit() {
    this.all();
    this.categorie();
    this.marque();

    if (this.categories) {
      this.child.categories = this.categories;
    }
    if (this.marques) {
      this.child.marques = this.marques;
    }
    this.anime();
  }
  itemsParge(event: Event) {

    let e = event.target as HTMLInputElement;
    this.tableSize = +e.value;
  }
  categorie() {
    return this.productService.all<Repons2>("categories").subscribe(
      {
        next: (x: Repons2) => {
          console.log(x.data);
          this.categories = x.data
        },
        error: err => console.error('An error occurred', err),
        complete: () => console.log('There are no more vowels.')
      }
    )
  }



  marque() {
    return this.productService.all<Repons2>("marques").subscribe(
      {
        next: (x: Repons2) => {
          console.log(x.data)
          this.marques = x.data
        },
        error: err => console.error('An error occurred', err),
        complete: () => console.log('There are no more vowels.')
      }
    )
  }



  getRowById(id: number) {
    this.productToEdit = this.products.filter(p => p.id === id)
    console.log(this.productToEdit[0]);
    //  console.log(this.child.formProduct);

    // this.router.navigate(['/accueil/add'])
  }

  getRowDetail(id: number) {
    this.productToEdit = this.products.filter(p => p.id === id)
    console.log(this.productToEdit[0]);
    //  console.log(this.child.formProduct);

    // this.router.navigate(['/accueil/add'])
  }


  all() {
    return this.productService.all<Repons>("products").subscribe(
      {
        next: (x: Repons) => {
          console.log(x.data.product)
          this.products = x.data.product
        },
        error: err => console.error('An error occurred', err),
        complete: () => console.log('There are no more vowels.')
      }
    )
  }



  onTableDataChange(event: any) {
    this.page = event;
    this.all();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.all();
  }


  anime() {
    const tl = gsap.timeline();
    tl.from('.listProd', { duration: 1.5, width: 0, opacity: 0, y: -50 })
    tl.to('.listProd', { duration: 1.4, opacity: 1, x: 0, ease: 'power2.out' });

    tl.from('.list', { duration: 1, opacity: 0, y: 10, delay: -0.9 });
    tl.to('.list', { duration: 1, opacity: 1, y: 10, ease: 'power2.out' });

  }
}
