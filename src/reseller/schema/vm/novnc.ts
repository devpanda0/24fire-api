import { type Type, type } from 'arktype'

//
// VM NoVNC
//
export type VmNoVnc = {
	link: string
}
export const VmNoVncSchema: Type<VmNoVnc> = type({
	link: 'string.url',
})
