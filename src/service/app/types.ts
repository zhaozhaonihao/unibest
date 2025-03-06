export interface ApiResponse {
  code?: number
  type?: string
  message?: string
}

export interface Category {
  id?: number
  name?: string
}

export interface deleteOrderParams {
  /** ID of the order that needs to be deleted */
  orderId: number
}

export interface deletePetParams {
  /** Pet id to delete */
  petId: number
}

export interface deleteUserParams {
  /** The name that needs to be deleted */
  username: string
}

export interface findPetsByStatusParams {
  /** Status values that need to be considered for filter */
  status: ('available' | 'pending' | 'sold')[]
}

export interface findPetsByTagsParams {
  /** Tags to filter by */
  tags: string[]
}

export interface getOrderByIdParams {
  /** ID of pet that needs to be fetched */
  orderId: number
}

export interface getPetByIdParams {
  /** ID of pet to return */
  petId: number
}

export interface getUserByNameParams {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username: string
}

export interface loginUserParams {
  /** The user name for login */
  username: string
  /** The password for login in clear text */
  password: string
}

export interface Order {
  id?: number
  petId?: number
  quantity?: number
  shipDate?: string
  /** Order Status */
  status?: 'placed' | 'approved' | 'delivered'
  complete?: boolean
}

export interface Pet {
  id?: number
  category?: Category
  name: string
  photoUrls: string[]
  tags?: Tag[]
  /** pet status in the store */
  status?: 'available' | 'pending' | 'sold'
}

export enum StatusEnum {
  available = 'available',
  pending = 'pending',
  sold = 'sold',
}

export type IStatusEnum = keyof typeof StatusEnum

export enum StatusEnum2 {
  placed = 'placed',
  approved = 'approved',
  delivered = 'delivered',
}

export type IStatusEnum2 = keyof typeof StatusEnum2

export interface Tag {
  id?: number
  name?: string
}

export interface updatePetWithFormParams {
  /** ID of pet that needs to be updated */
  petId: number
}

export interface updateUserParams {
  /** name that need to be updated */
  username: string
}

export interface uploadFileParams {
  /** ID of pet to update */
  petId: number
}

export interface User {
  id?: number
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  phone?: string
  /** User Status */
  userStatus?: number
}
