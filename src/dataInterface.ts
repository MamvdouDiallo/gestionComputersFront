export interface Reponse {
  code: number
  message: string
  data: DataI
  links: string
}

export interface DataI {
  product: ProductI
  succursales: SuccursaleI[]
}

export interface ProductI {
  id: number
  libelle: string
  code: string
  reduction: number
  quantite: number
  categorie: string,
  categorie_id?: number,
  marque: string,
  marque_id?: number,
  prixDetail: number
  prixEnGros: number
  succursale_id: number
  image: string
  caracteristiques: CaracteristiqueI[]
}

export interface ProductII {
  id: number
  libelle: string
  code: string
  reduction: number
  quantite: number
  prixDetail: number
  prixEnGros: number
  succursale_id: number
  image: string
  caracteristiques: CaracteristiqueI[]
}

export interface CaracteristiqueI {
  libelle: string
  description: string
  valeur: string
}

export interface SuccursaleI {
  succursale_id: number
  nom: string
  addresse: string
  telephone: string
  quantite: number
  prixDetail: number
  prixEnGros: number
}








