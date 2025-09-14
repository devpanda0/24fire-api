import { type Type, type } from 'arktype'

type IpDeleteRequest = {
	netID: string
}
export const IpDeleteRequestSchema: Type<IpDeleteRequest> = type({
	netID: 'string.uuid.v4',
})

export type IpDelete = null
export const IpDeleteSchema: Type<IpDelete> = type.null
