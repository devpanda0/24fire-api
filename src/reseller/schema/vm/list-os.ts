import { type Type, type } from 'arktype'

export type VmOs = {
	name: string
	displayname: string
	platform: 'linux' | 'windows'
	icon: string
	minDiskSize: number
}
export const VmOsSchema: Type<VmOs> = type({
	name: 'string',
	displayname: 'string',
	platform: "'linux' | 'windows'",
	icon: 'string.url',
	minDiskSize: 'number.integer > 0',
})

export type VmListOs = VmOs[]
export const VmListOsSchema: Type<VmListOs> = VmOsSchema.array()
