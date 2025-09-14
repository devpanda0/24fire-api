import { type Type, type } from 'arktype'

export type VmDDoSSettingsRequest = {
	layer4?: 'dynamic' | 'permanent' | 'off'
	layer7?: 'on' | 'off'
	ip_address?: string
}
export const VmDDoSSettingsRequestSchema: Type<VmDDoSSettingsRequest> = type({
	'layer4?': "'dynamic' | 'permanent' | 'off'",
	'layer7?': "'on' | 'off'",
	'ip_address?': 'string.ip',
})

export type VmDDoSSettings = Record<
	string,
	{
		layer4: 'dynamic' | 'permanent' | 'off'
		layer7: 'off' | 'on'
	}
>
export const VmDDoSSettingsSchema: Type<VmDDoSSettings> = type.Record(
	'string',
	{
		layer4: "'dynamic' | 'permanent' | 'off'",
		layer7: "'off' | 'on'",
	},
)
