import { type Type, type } from 'arktype'

export type Undelete = {
	identifier: string
	renew_date: string
}
export const DedicatedUndeleteSchema: Type<Undelete> = type({
	identifier: 'string.uuid.v4',
	renew_date: 'string.date.iso',
})
