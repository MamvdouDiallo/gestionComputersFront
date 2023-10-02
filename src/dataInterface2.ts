export interface Repons {
    code: number
    message: string
    data: DataI
    links: string
}

export interface Repons2 {
    code: number
    message: string
    data: Marque[] | Categorie[]
    links: string
}


export interface DataI {
    product: ProductI[]
    succursales: SuccursaleI[]
}

export interface ProductI {
    id: number
    libelle: string
    code: string
    reduction: number
    quantite: number
    categorie: string,
    marque: string,
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
    categorie: string,
    marque: string,
    prixDetail: number
    prixEnGros: number
    succursale_id: number
    image: string
    caracteristiques: CaracteristiqueI[]
}

export interface CaracteristiqueI {
    libelle: string
    caracteristique_id: number
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




export interface Marque {
    id: number
    libelle: string
    valeur?: string
}
export interface Categorie {
    id: number
    libelle: string
    valeur?: string
}



