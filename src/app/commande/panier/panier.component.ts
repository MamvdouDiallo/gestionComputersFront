import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import gsap from 'gsap';
import { Product } from 'src/Resons';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';


@Component({
    selector: 'app-panier',
    standalone: true,
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css'],
    imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule]
})
export class PanierComponent implements OnInit {

    ListeProductChoisi: Array<Product> = [];
    @Output() newItemEvent = new EventEmitter<any>();
    @ViewChild('myInput') myInput!: ElementRef;

    formeCommande!: FormGroup
    constructor(private builer: FormBuilder) {
        this.formeCommande = this.builer.group({
            remise: ["", [Validators.required]],
            totale: ["", [Validators.required]],
            montantRemise: ["", [Validators.required]],
            prodChoices: this.builer.array([
            ])
        });
        this.formeCommande.valueChanges.subscribe(() => {
            this.savePanierToLocalStorage();
        });
    }
    ngOnInit() {
        initFlowbite();
        const storedPanier = localStorage.getItem('panier');
        if (storedPanier) {
            const parsedPanier = JSON.parse(storedPanier);
            this.formeCommande.get('totale')?.setValue(parsedPanier.totale);
            this.formeCommande.get('remise')?.setValue(parsedPanier.remise);
            parsedPanier.prodChoices.forEach((item: any) => {
                this.prodChoices.push(this.builer.group({
                    id_succursale: item.id_succursale,
                    libelle: item.libelle,
                    prix: item.prix,
                    quantite: item.quantite,
                    totale: item.totale
                }));
            });
        }

        this.anime();

    }
    savePanierToLocalStorage() {
        localStorage.setItem('panier', JSON.stringify(this.formeCommande.value));
    }


    get remise() { return this.formeCommande.get('remise'); }
    get totale() { return this.formeCommande.get('totale'); }

    // get ref() { return this.formeVente.get('ref'); }

    get prodChoices() {
        return this.formeCommande.get('prodChoices') as FormArray;
    }

    get taille() {
        const itemsArray = this.formeCommande.get('prodChoices') as FormArray;
        return itemsArray.length;
    }

    //btnPanier: boolean = this.taille>0
    total!: number
    SetTotal() {
        const prodChoicesArray = this.formeCommande.get('prodChoices')!.getRawValue();
        const totalSum = prodChoicesArray.reduce((sum: number, item: any) => sum + item.totale, 0);
        this.total = totalSum;
        this.formeCommande.get('totale')?.setValue(totalSum)
        this.myInput.nativeElement.removeAttribute('readonly');
    }

    calculePrix() {
        const prodChoices = this.formeCommande.get('prodChoices') as FormArray;
        return prodChoices.controls.forEach((control, index) => {
            control.get('quantite')!.valueChanges.subscribe(newValue => {
                const prix = control.get('prix')!.value;
                const total = prix * newValue;
                control.get('totale')!.setValue(total);
            });
            this.SetTotal();
        });
    }

    removeProduct(index: number) {
        const prodChoicesArray = this.formeCommande.get('prodChoices')!.getRawValue();
        const removedProductTotal = prodChoicesArray[index].totale;
        let currentTotal = this.formeCommande.get('totale')!.value;
        currentTotal -= removedProductTotal;
        this.formeCommande.get('totale')!.setValue(currentTotal);
        this.prodChoices.removeAt(index);
        if (prodChoicesArray.length === 0) {
            this.myInput.nativeElement.setAttribute('readonly');
        }
        if (prodChoicesArray.length === 0) {
            this.formeCommande.get('totale')!.setValue(0);
        }
    }
    valFinal!: number

    setRemise(e: Event) {
        const event = e.target as HTMLInputElement;
        const val = this.formeCommande.get('totale')!.value as number;
        if (+event.value === 0) {
            this.formeCommande.get('totale')!.setValue(this.total);
        } else {
            const remise = +event.value;
            this.valFinal = val - (val * (remise / 100));
            this.formeCommande.get('totale')!.setValue(this.valFinal);
        }
    }

    rendu!: number
    res: boolean = false
    rend: boolean = false
    setTrendu(e: Event) {
        let a = e.target as HTMLInputElement
        this.rendu = +a.value - (+this.tote)
        if (this.rendu >= 0) {
            this.rend = true
            this.res = false
        } else {
            this.rend = false
            this.res = true
        }
    }
    tote!: number
    tot() {
        if (this.valFinal == null) {
            this.tote = this.formeCommande.get('totale')?.value;
        }
        else {
            this.tote = this.valFinal;
        }
        return this.tote;
    }




    AddCommande() {
        localStorage.removeItem('panier');
        this.newItemEvent.emit(this.formeCommande.value)
        //  console.log(this.formeCommande.value);
    }

    checkValue(event: Event) {
        let val = event.target as HTMLInputElement
        if (+val.value < 0) {
            val.value = "";
        }
    }

    anime() {
        const tl = gsap.timeline();
        tl.from('.panier', { duration: 1.4, width: 0, opacity: 0, x: -50 })
        tl.to('.panier', { duration: 1.4, opacity: 1, x: 0, ease: 'power2.out' });

        tl.from('.texte', { duration: 1, opacity: 0, y: 10, delay: -0.9 });
        tl.to('.texte', { duration: 1, opacity: 1, y: 10, ease: 'power2.out' });

    }
}
