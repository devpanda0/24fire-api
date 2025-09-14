import { Customer } from './customer'
import { Reseller } from './reseller'

export const FireApi: {
	CustomerApi: typeof Customer
	ResellerApi: typeof Reseller
} = {
	CustomerApi: Customer,
	ResellerApi: Reseller,
}
