import { type Type, type } from 'arktype'

type VmSshKeyGenerateRequest = {
	displayname: string
}
export const VmSshKeyGenerateRequestSchema: Type<VmSshKeyGenerateRequest> =
	type({
		displayname: 'string',
	})

export type VmSshKeyGenerate = {
	key_id: string
	displayname: string
	ssh_key: {
		password: string | null
		public: string
		private: string
	}
}
export const VmSshKeyGenerateSchema: Type<VmSshKeyGenerate> = type({
	key_id: 'string.uuid.v4',
	displayname: 'string',
	ssh_key: {
		password: 'string | null',
		public: 'string',
		private: 'string',
	},
})
