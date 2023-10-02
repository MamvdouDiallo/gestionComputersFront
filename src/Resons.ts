export interface Root {
    code: number
    message: string
    data: Data
    links: string
  }
  
  export interface Data {
    product: Product[]
    succursales: Succursale[]
  }
  
  export interface Product {
    id: number
    libelle: string
    code: string
    reduction: number
    photo: string
    details: Details
    caracteristiques?: Caracteristique[]
  }
  
  export interface Details {
    id: number
    prixDetail: number
    prixEnGros: number
    quantite: number
    succursale_id: number
  }
  
  export interface Caracteristique {
    id: number
    libelle: string
    pivot: Pivot
  }
  
  export interface Pivot {
    product_id: number
    caracteristique_id: number
    description: string
    valeur: string
  }
  
  export interface Succursale {
    id: number
    prixDetail: number
    prixEnGros: number
    quantite: number
    succursale_id: number
  }