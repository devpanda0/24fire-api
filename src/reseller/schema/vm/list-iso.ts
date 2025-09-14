import { type Type, type } from 'arktype'

export type VmIso = {
	name: string
	displayname: string
	platform: 'linux' | 'windows'
	icon: string
	minDiskSize: number
}
export const VmIsoSchema: Type<VmIso> = type({
	name: 'string',
	displayname: 'string',
	platform: "'linux' | 'windows'",
	icon: 'string.url',
	minDiskSize: 'number.integer > 0',
})

export type VmListIso = VmIso[]
export const VmListIsoSchema: Type<VmListIso> = VmIsoSchema.array()
