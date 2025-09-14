import { type Type, type } from 'arktype'
import { type VmSshKeyEntry, VmSshKeyEntrySchema } from './sshkey'

export type VmSshKeyList = {
	ssh_keys: VmSshKeyEntry[]
}
export const VmSshKeyListSchema: Type<VmSshKeyList> = type({
	ssh_keys: VmSshKeyEntrySchema.array(),
})
