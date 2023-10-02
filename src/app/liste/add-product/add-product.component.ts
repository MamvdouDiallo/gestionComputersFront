import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Caracteristique, Resp } from 'src/app/Interface';
import { ProductService } from 'src/app/services/product.service';
import { Reponse } from 'src/dataInterface';
import { Categorie, Marque, Repons2 } from 'src/dataInterface2';

@Component({
  standalone: true,
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  i: number = 0
  selectBool!: boolean;

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];




  success: boolean = false;
  photo!: File;
  error: boolean = false;
  categories!: Array<Categorie>;
  marques!: Array<Marque>;
  ristiques!: Array<Marque>;
  ristiques2!: Array<Marque>;
  constructor(private productService: ProductService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.categorie();
    this.marquee();
    this.ristique();
  }



  search(text: Event) {
    let a = text.target as HTMLInputElement;
    return this.productService.search2<Resp>({ "libelle": a.value }).subscribe((data: Resp) => {
      if (data.code === 200) {
        this.addCara(data.data.caracteristiques)
        this.formProduct.patchValue(data.data)
      }
    })
  }

  addCara(data: Caracteristique[]) {
    for (const element of data) {
      this.caracteristiques.push(this.fb.group({
        caracteristique_id: ['', Validators.required],
        valeur: ['', Validators.required]
      }))
    }
  }

  formProduct: FormGroup = this.fb.group({
    libelle: ["", [Validators.required, Validators.minLength(2)]],
    prixDetail: ["", [Validators.required, Validators.minLength(2)]],
    quantite: ["", [Validators.required]],
    unite_id: ["1"],
    succursale_id: ["1"],
    marque_id: ["", [Validators.required]],
    categorie_id: ["", [Validators.required]],
    image: ["", [Validators.required]],
    code: ["", [Validators.required]],
    caracteristiques: this.fb.array([
    ])
  })


  get libelle() { return this.formProduct.get('libelle'); }
  get prixDetail() { return this.formProduct.get('prixDetail'); }
  get quantite() { return this.formProduct.get('quantite'); }
  get marque_id() { return this.formProduct.get('marque_id'); }
  get categorie_id() { return this.formProduct.get('categorie_id'); }
  get code() { return this.formProduct.get('code'); }
  get image() { return this.formProduct.get('image'); }
  //get caracteristiques() { return this.formProduct.get('caracteristiques'); }
  get caracteristiques() { return this.formProduct.get('caracteristiques') as FormArray; }

  public file!: File;
  handleFileInput(event: any) {
    this.photo = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.photo);
    fileReader.addEventListener('load', () => {
      const defaultPhoto = fileReader.result as string;
      console.log(defaultPhoto);
      this.formProduct.get('image')?.setValue(defaultPhoto);
    });
  }



  getsai(e: Event) {
    let a = e.target as HTMLInputElement
    console.log(a.value);

  }















  removeRistique(event: Event) {
    let a = event.target as HTMLInputElement;
    this.ristiques = this.ristiques.filter(i => i.id !== +a.value)
    //return this.ristiques;
  }





  categorie() {
    return this.productService.all<Repons2>("categories").subscribe(
      {
        next: (x: Repons2) => {
          console.log(x.data);
          // this.child.categories = x.data;
          this.categories = x.data
        },
        error: err => console.error('An error occurred', err),
        complete: () => console.log('There are no more vowels.')
      }
    )
  }

  marquee() {
    return this.productService.all<Repons2>("marques").subscribe(
      {
        next: (x: Repons2) => {
          console.log(x.data)
          //    this.child.marques = x.data;
          this.marques = x.data
        },
        error: err => console.error('An error occurred', err),
        complete: () => console.log('There are no more vowels.')
      }
    )
  }
  ristique() {
    return this.productService.all<Repons2>("ristiques").subscribe(
      {
        next: (x: Repons2) => {
          console.log(x.data)
          this.ristiques = x.data
        },
        error: err => console.error('An error occurred', err),
        complete: () => console.log('There are no more vowels.')
      }
    )
  }


  tableau: any

  getRowById(id: Event) {
    let i = id.target as HTMLInputElement;
    let objetRecherche = this.ristiques.find(function (objet) {
      return objet.id === +i.value;
    });

    this.selectBool = objetRecherche?.valeur == null;
    // console.log(objetRecherche);
    console.log(this.selectBool);

    if (!this.selectBool) {
      if (objetRecherche?.valeur) {
        this.tableau = objetRecherche?.valeur.split(',');
      }
      console.log(this.tableau);
    }
  }
  AddCarc() {
    const carac = this.fb.group({
      caracteristique_id: ['', Validators.required],
      valeur: ['', Validators.required]
    });
    this.caracteristiques.push(carac);
  }
  delete(Index: number) {
    this.caracteristiques.removeAt(Index);
  }


  AddProduct() {
    console.log(this.formProduct.value);
    return this.productService.add<Repons2>("products", this.formProduct.value).subscribe(
      (value: Repons2) => {
        if (value.code === 200) {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 5000);
          this.formProduct.reset();
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
        console.log(value);
      }
    )

  }


  onSelectChange(event: Event) {
    let val = event.target as HTMLInputElement;
    const selectedValue = +val.value;
    this.ristiques = this.ristiques.filter(item => item.id !== selectedValue);
    //  this.ristiques2 = this.ristiques

  }

  utilisateurAEffectueSelection: boolean = false;
  valeurGetLibelle(cart: Event) {
    this.utilisateurAEffectueSelection = true
    const libelleControl = this.caracteristiques.get('caracteristique_id');
    const idControl = this.caracteristiques.get('caracteristique_id');

    if (libelleControl && idControl) {
      const selectedLibelle = libelleControl.value;
      idControl.setValue(selectedLibelle);
    }

  }

  getValeursForLibelle(libelleValue: number) {
    const carateristique = this.ristiques.find((item: any) => item.id == libelleValue);
    return carateristique ? carateristique.valeur!.split(',') : [];
  }

  isInputField(libelleValue: number): boolean {
    const caracteristique = this.ristiques.find((item: any) => item.id == libelleValue);
    return caracteristique ? caracteristique.valeur === null : false;
  }
}
