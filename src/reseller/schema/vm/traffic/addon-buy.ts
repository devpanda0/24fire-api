import { type Type, type } from 'arktype'

type VmTrafficAddonBuyRequest = {
	addon: string
}
export const VmTrafficAddonBuyRequestSchema: Type<VmTrafficAddonBuyRequest> =
	type({
		addon: 'string',
	})

export type VmTrafficAddonBuy = null
export const VmTrafficAddonBuySchema: Type<VmTrafficAddonBuy> = type.null
