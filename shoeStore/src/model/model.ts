export interface IProducts {
  id: number,
  category: number,
  images: string[],
  title: string,
  price: number
}

export interface ISize { 
  size: string, 
  available: boolean
}

export interface IProduct {
  id: number,
  title: string, 
  images: string[], 
  sizes: ISize[], 
  sku: string, 
  manufacturer: string, 
  color: string, 
  material: string,  
  season: string, 
  reason: string,
  price: number
}

export interface ICategories {
  id: number,
  title: string
}

export interface ICartItem {
  id: number,
  title: string,
  size: string,
  count: number,
  price: number
}

export interface ICategoryObj {
  categories: ICategories[],
  category: number,
  categoryEnd: boolean
}

export interface IOffsetObj {
  offsetSum: number, 
  offset: number
}

export interface IPostRequest {
  owner: {phone: string, address: string},
  items: ICartItem[]
}

// SLICES STATE

export interface IState {
  loading: boolean,
  error?: {type: string, status: string} | null
}

export interface IHitsState extends IState {
  products: IProducts[]
}

export interface ICatalogState extends IHitsState { 
  search: string ,
  searchValue: string,
  categoryObj: ICategoryObj,
  offsetObj: IOffsetObj
}

export interface IProductCardState extends IState {
  product: IProduct
}

export interface ICartState extends IState {
  items: ICartItem[],
  success: boolean
}