export interface Resp {
  code: number
  message: string
  data: Produit
  links: string
}

export interface Produit {
  id: number
  libelle: string
  code: string
  quantite: number
  categorie_id: number
  marque_id: number
  prixDetail: number
  prixEnGros: number
  succursale_id: number
  image: string
  caracteristiques: Caracteristique[]
}

export interface Caracteristique {
  caracteristique_id: number
  valeur: string
}

//////////


export interface Login {
  code: number
  message: string
  data: LoginData
  links: string
}

export interface LoginData {
  user: User
  token: string
}

export interface User {
  id: number
  nom: string
  prenom: string
  login: string
  telephone: string
  poste: string
  succursale_id: number
  image?: string
}