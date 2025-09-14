import { type Type, type } from 'arktype'

//
// VM SSH Key Entry
//
export type VmSshKeyEntry = {
	id: number
	name: string
	fingerprint: string
	public_key: string
	created_at: string
}
export const VmSshKeyEntrySchema: Type<VmSshKeyEntry> = type({
	id: 'number.integer',
	name: 'string',
	fingerprint: 'string',
	public_key: 'string',
	created_at: 'string',
})
