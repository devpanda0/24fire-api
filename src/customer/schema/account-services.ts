import { type Type, type } from 'arktype'

export type ServiceAccounting = {
	buy_date: string
	buy_price: number
	renew_date: string
	renew_price: number
	renew_interval: number
	auto_renew: boolean
}
export const ServiceAccountingSchema: Type<ServiceAccounting> = type({
	buy_date: 'string.date.iso',
	buy_price: 'number',
	renew_date: 'string.date.iso',
	renew_price: 'number',
	renew_interval: 'number.integer',
	auto_renew: 'boolean',
})

export type BaseService = {
	internal_id: string
	name: string
	accounting: ServiceAccounting
}
export const BaseServiceSchema: Type<BaseService> = type({
	internal_id: 'string',
	name: 'string',
	accounting: ServiceAccountingSchema,
})

export type WebspaceService = BaseService & {
	username: string
	email: string
}
export const WebspaceServiceSchema: Type<WebspaceService> =
	BaseServiceSchema.merge({
		username: 'string',
		email: 'string.email',
	})

export type KvmService = BaseService
export const KvmServiceSchema: Type<KvmService> = BaseServiceSchema

export type DomainService = BaseService & {
	target: string
}
export const DomainServiceSchema: Type<DomainService> = BaseServiceSchema.merge(
	{
		target: 'string',
	},
)

export type AccountServices = {
	services: {
		WEBSPACE?: WebspaceService[]
		KVM?: KvmService[]
		DOMAIN?: DomainService[]
	}
}
export const AccountServicesSchema: Type<AccountServices> = type({
	services: {
		WEBSPACE: WebspaceServiceSchema.array().optional(),
		KVM: KvmServiceSchema.array().optional(),
		DOMAIN: DomainServiceSchema.array().optional(),
	},
})
