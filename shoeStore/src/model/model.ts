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

export interface IOrder {
  owner: {phone: string, address: string},
  items: ICartItem[]
}

export interface IChanges {
  absent: ICartItem[]
  price: ICartItem[]
}

export interface IError {
  type: string | null, 
  status: string
}

export interface IOrderRTR { 
  changes: IChanges | null, 
  actual: ICartItem[], 
  success: boolean 
}

// SLICES STATE

export interface IState {
  loading: boolean,
  error?: IError | null
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
  changes: IChanges | null,
  success: boolean
}

export interface IOrderState extends IState {
  success: boolean
}

// COMPONENTS PROPS

export interface SearchProps {
  searchValue: string, 
  cls: string, 
  id?: string
}

export interface ModalProps {
  type?: 'CUSTOM' | 'INFO'
  content?: string | React.ReactNode
  children?: React.ReactNode
}

export interface CartTableProps {
  items: ICartItem[], 
  onRemove: (evt: React.MouseEvent) => void
}

export interface CartItemProps {
  item: ICartItem, 
  index: number,
  value: string
  onRemove: (evt: React.MouseEvent) => void
}

export interface CartTableLayoutProps {
  items: ICartItem[],
  children: React.ReactNode
}

export interface ProductCardSizesProps {
  sizes: ISize[], 
  onChange: (evt: React.FormEvent) => void
}

export interface CategoriesProps {
  categories: ICategories[], 
  category: number,
  onCategory: (evt: React.MouseEvent) => void
}

export interface ProductsProps {
  products: IProducts[], 
  children?: React.ReactNode
}

export interface UFCProps {
  category: number, 
  search: string, 
  offsetSum: number, 
  categories: ICategories[]
}

export interface ProductCardErrorProps {
  status: string, 
  id: string | undefined
}