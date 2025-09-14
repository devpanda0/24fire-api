import { type Type, type } from 'arktype'

export type VmTrafficAddon = {
	volume: number
	price: {
		net: number
		gross: number
	}
}
export const VmTrafficAddonSchema: Type<VmTrafficAddon> = type({
	volume: 'number',
	price: {
		net: 'number',
		gross: 'number',
	},
})

export type VmTrafficAddons = {
	addons: Record<string, VmTrafficAddon>
}
export const VmTrafficAddonsSchema: Type<VmTrafficAddons> = type({
	addons: type.Record('string', VmTrafficAddonSchema),
})
