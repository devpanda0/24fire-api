import { type Type, type } from 'arktype'

type VmSettingsRequest = {
	ROOT_PASSWORD_LOGIN?: boolean
}
export const VmSettingsRequestSchema: Type<VmSettingsRequest> = type({
	'ROOT_PASSWORD_LOGIN?': 'boolean',
})

export type VmSettings = {
	changes: {
		ROOT_PASSWORD_LOGIN: boolean
	}
}
export const VmSettingsSchema: Type<VmSettings> = type({
	changes: {
		ROOT_PASSWORD_LOGIN: 'boolean',
	},
})
