import { type Type, type } from 'arktype'

type VmIsoInsertRequest = {
	iso: string
}
export const VmIsoInsertRequestSchema: Type<VmIsoInsertRequest> = type({
	iso: 'string',
})

export type VmIsoInsert = null
export const VmIsoInsertSchema: Type<VmIsoInsert> = type.null
