import { type Type, type } from 'arktype'

type VmSshKeyRemoveRequest = {
	key_id: string
}
export const VmSshKeyRemoveRequestSchema: Type<VmSshKeyRemoveRequest> = type({
	key_id: 'string.uuid.v4',
})

export type VmSshKeyRemove = Record<string, unknown> | null
export const VmSshKeyRemoveSchema: Type<VmSshKeyRemove> = type
	.Record('string', 'unknown')
	.or(type.null)
