import { type Type, type } from 'arktype'

//
// OTP Generate
//
export type OtpGenerate = {
	note: string
	otp_code: string
}
export const OtpGenerateSchema: Type<OtpGenerate> = type({
	note: 'string',
	otp_code: 'string',
})
