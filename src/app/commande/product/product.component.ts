import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product, Root, Succursale } from 'src/Resons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductI, Reponse, SuccursaleI } from 'src/dataInterface';
import { ActivatedRoute } from '@angular/router';
import gsap from 'gsap';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
ngOnInit() {
  //this.anime()
  initFlowbite();

}


  selectedProductId: number | any = null;
  dropdownMenus: ElementRef[] = [];
  succursales!: Array<SuccursaleI>
  loading: boolean = false;
  btnAdd = true
  prol: boolean = true
  carBydefaut: boolean = true;
  defaultProduct!: ProductI
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() itemProduct = new EventEmitter<any>();

  @ViewChild('succursale_id') item!: ElementRef;
  @ViewChild('btnCart') btnCart!: ElementRef;
  @ViewChild('inputPrix') inputPrix!: ElementRef;
  produitTrouve!: ProductI

  constructor(private productService: ProductService, private fb: FormBuilder,private router: ActivatedRoute) {
    this.succursales = []
    console.log(this.router.url);
    this.defaultProduct =
    {
      "id": 4,
      "libelle": "iphoneX",
      "code": "iphoneX",
      "reduction": 0,
      "quantite": 0,
      "categorie": "Téléphone",
      "marque": "Samsung",
      "prixDetail": 700000,
      "prixEnGros": 650000,
      "succursale_id": 1,
      "image": "http://127.0.0.1:8000/storage/images/https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/apple-iphone-14-iphone-14-plus-hero-220907-geo_full-bleed-image.jpg.large_-one_one.jpg?VersionId=_hJRppnBoX_Vs971ua8Oy4uzGrV5d0lR",
      "caracteristiques": [
        {
          "libelle": "RAM",
          "description": "10giga",
          "valeur": "10giga"
        },
        {
          "libelle": "RAM",
          "description": "10giga",
          "valeur": "10giga"
        },
        {
          "libelle": "RAM",
          "description": "10giga",
          "valeur": "10giga"
        }
      ]
    };
    this.produitTrouve = this.defaultProduct;
  }

  objetTrouve: any
  succ!: SuccursaleI
  displayModal(e: number) {
    console.log(this.item.nativeElement);
    this.item.nativeElement.classList.toggle('hidden')
    this.objetTrouve = this.succursales.find((element) => element.succursale_id === e);
    console.log(this.objetTrouve);
  }
  libelleCaracterisque: string = 'Disques';
  valeur: string = 'SSD';
  src: string = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png";
  productName: string = 'Product Name';
  productImage: string = '';
  id_succursale = 1
  FormProductToPanier: FormGroup = this.fb.group({
    id_succursale: [1, Validators.required],
    libelle: ['', Validators.required],
    quantite: ['', Validators.required],
    prix: ['', Validators.required],
    product_id: ['', Validators.required]
  });
  get product_id() {
    return this.FormProductToPanier.get('product_id')
  }
  borderColorClass: string = 'border-gray-300'
  search(text: Event) {
    let a = text.target as HTMLInputElement;
    if (a.value.length > 0) {
      this.loading = true
      this.btnAdd = false
      this.carBydefaut = false
      this.prol = false
    } else {
      this.loading = false
      this.btnAdd = true
      this.carBydefaut = true
      this.prol = true
      this.src = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
    }
    return this.productService.search<Reponse>({ "code": a.value }).subscribe(
      (val: Reponse) => {
        console.log(val);
        if (val.code == 200) {
          console.log(val);
          this.produitTrouve = val.data.product;
          this.succursales = val.data.succursales
          this.productName = a.value
          this.loading = false
          this.carBydefaut = true
          this.prol = true
          this.src = val.data.product.image
          this.produitTrouve = val.data.product
          this.FormProductToPanier.get('libelle')?.setValue(val.data.product.libelle)
          this.FormProductToPanier.get('product_id')?.setValue(val.data.product.id)
          this.src = val.data.product.image
        }
      },
      error => console.error(error)
    )
  }


  addProductToPanier() {
    console.log(this.FormProductToPanier.value);
    console.log(this.FormProductToPanier.value);
    this.newItemEvent.emit(this.FormProductToPanier.value);
    this.FormProductToPanier.reset();
    ;
  }

  add() {
    this.itemProduct.emit(this.FormProductToPanier.value);
  }
  checkPrix(event: Event) {
    
    let prixSaisi = event.target as HTMLInputElement;
    if (+prixSaisi.value < this.produitTrouve.prixDetail) {
      this.inputPrix.nativeElement.classList.remove('bg-green-600');
      this.inputPrix.nativeElement.classList.add('bg-red-600');
    } else if (+prixSaisi.value > this.produitTrouve.prixDetail) {
      this.inputPrix.nativeElement.classList.remove('bg-red-600');
      this.inputPrix.nativeElement.classList.add('bg-green-600');
    }
    if(!prixSaisi.value){
      this.inputPrix.nativeElement.classList.remove('bg-red-600');
      this.inputPrix.nativeElement.classList.remove('bg-green-600');
    }
  }


  controleQuantite(e: Event) {
    let item = e.target as HTMLInputElement;
    if (+item.value > this.produitTrouve.quantite) {
      item.value = "";
    }
  }

  controlePrix(e: Event) {
    let item = e.target as HTMLInputElement;
    // if (+item.value > this.ProduitTrouve[0].details.prixDetail) {
    //   console.log("error 404");
    //   item.value = "";
    // }
  }

  valChange(e: Event, a: number) {
    let val = e.target as HTMLInputElement;
    console.log(val.checked, a);
    val.checked ? this.FormProductToPanier.get('id_succursale')?.setValue(a) : this.FormProductToPanier.get('id_succursale')?.setValue(this.defaultProduct.succursale_id)
    val.checked ? this.btnCart.nativeElement.removeAttribute('disabled') : this.btnCart.nativeElement.setAttribute('disabled', 'true');
    let quantite = this.succursales.find((element) => element.succursale_id === a)?.quantite;
    let prixDetail = this.succursales.find((element) => element.succursale_id === a)?.prixDetail;
    if (quantite) {
      this.produitTrouve.quantite = quantite
    }
    if (prixDetail) {
      this.produitTrouve.prixDetail = prixDetail
    }
  }


  checkValue(event: Event) {
    let val = event.target as HTMLInputElement
    if (+val.value < 0) {
      val.value = "";
    }
  }






  anime() {
    const tl = gsap.timeline();
    tl.from('.pro', { duration: 1.4, height: 0, opacity: 0, y: -50 })
    tl.to('.pro', { duration: 1.4, opacity: 1, y: 0, ease: 'power2.out' });

    tl.from('.texte',{ duration:1,opacity:0,y:10,delay:-0.9});
    tl.to('.texte',{ duration:1,opacity:1,y:10,ease:'power2.out' });

}
}


