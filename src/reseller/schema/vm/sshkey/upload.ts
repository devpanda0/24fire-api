import { type Type, type } from 'arktype'

export type VmSshKeyUploadRequest = {
	displayname: string
	public_key: string
}
export const VmSshKeyUploadRequestSchema: Type<VmSshKeyUploadRequest> = type({
	displayname: 'string',
	public_key: 'string',
})

export type VmSshKeyUpload =
	| {
			key_id: string
			displayname: string
			ssh_key: {
				public: string
			}
	  }
	| {
			invalid_parameters: {
				public_key: string
			}
	  }
export const VmSshKeyUploadSchema: Type<VmSshKeyUpload> = type({
	key_id: 'string.uuid.v4',
	displayname: 'string',
	ssh_key: {
		public: 'string',
	},
}).or({
	invalid_parameters: {
		public_key: 'string',
	},
})
