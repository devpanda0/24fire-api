import { type Type, type } from 'arktype'

export type KvmDdosChangeRequest = {
	layer4?: 'dynamic' | 'permanent'
	layer7?: 'on' | 'off'
	ip_address?: string
}
export const KvmDdosChangeRequestSchema: Type<KvmDdosChangeRequest> = type({
	'layer4?': "'dynamic' | 'permanent'",
	'layer7?': "'on' | 'off'",
	'ip_address?': 'string',
})

export type KvmDdosChange = Record<
	string,
	{
		layer4: 'dynamic' | 'permanent'
		layer7: 'on' | 'off'
	}
>
export const KvmDdosChangeSchema: Type<KvmDdosChange> = type.Record('string', {
	layer4: "'dynamic' | 'permanent'",
	layer7: "'on' | 'off'",
})
