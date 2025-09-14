import { type Type, type } from 'arktype'

//
// Request List Options (for method parameters)
//
export type RequestListOptions = {
	offset?: number
	parseResBodies?: boolean
}

//
// Account Request Log Entry
//
export type AccountRequestLogEntry = {
	requestID: string
	requestDate: string
	success: 0 | 1
	endpoint: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
	request_body: string
	error_type: string | null
	response_body: string
}
export const AccountRequestLogEntrySchema: Type<AccountRequestLogEntry> = type({
	requestID: 'string.uuid.v4',
	requestDate: 'string.date.iso',
	success: '0 | 1',
	endpoint: 'string',
	method: "'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'",
	request_body: 'string',
	error_type: 'string | null',
	response_body: 'string',
})

//
// Account Requests List
//
export type AccountRequestsListRequest = {
	offset?: number
}
export const AccountRequestsListRequestSchema: Type<AccountRequestsListRequest> =
	type({
		'offset?': 'number.integer > 0',
	})

export type RequestsList = AccountRequestLogEntry[]
export const AccountRequestsListSchema: Type<RequestsList> =
	AccountRequestLogEntrySchema.array()
