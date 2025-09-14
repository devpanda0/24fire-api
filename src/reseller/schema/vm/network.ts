import { type Type, type } from 'arktype'

//
// VM Network
//
export type VmNetwork = {
	network_devices: Record<
		string,
		{
			model: string
			mac_address: string
			rate_limit: number
			ipv4: {
				ip_address: string
				cidr: number
				gateway: string
			}
			ipv6: {
				ip_address: string
				cidr: number
				gateway: string
			}
		}
	>
}
export const VmNetworkSchema: Type<VmNetwork> = type({
	network_devices: {
		'[string]': {
			model: 'string',
			mac_address: 'string',
			rate_limit: 'number.integer',
			ipv4: {
				ip_address: 'string.ip.v4',
				cidr: 'number.integer',
				gateway: 'string.ip.v4',
			},
			ipv6: {
				ip_address: 'string.ip.v6',
				cidr: 'number.integer',
				gateway: 'string.ip.v6',
			},
		},
	},
})
