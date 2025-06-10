import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from "./panier/panier.component";
import { ProductComponent } from "./product/product.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { CommandeService } from '../services/commande.service';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-commande',
    standalone: true,
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.css'],
    imports: [CommonModule, PanierComponent, ProductComponent, NavbarComponent]
})
export class CommandeComponent implements OnInit {
    ngOnInit() {
      //  localStorage.removeItem('tkn')
      initFlowbite();
    }
    @ViewChild(PanierComponent) child!: PanierComponent;
    @ViewChild(ProductComponent) child2!: ProductComponent;

    constructor(private builder: FormBuilder, private service: CommandeService) { }

    addItem(newItem: any) {
        const produit = this.builder.group({
            id_succursale: newItem.id_succursale,
            product_id: newItem.product_id,
            libelle: newItem.libelle,
            prix: newItem.prix,
            quantite: newItem.quantite,
            totale: newItem.prix * newItem.quantite
        });
        this.child.prodChoices.push(produit);
        this.child.SetTotal();

    }

    addI(newItem: any) {
        this.child.prodChoices.push(newItem);

    }

    addArticle(data: any) {
        console.log(data);
        return this.service.add<any>("commande", data).subscribe(
            (value) => {
                if (value.code === 200) {
                    this.child2.FormProductToPanier.reset();
                    this.child.formeCommande.reset();
                }
                console.log(value);
            })
    }
}





