import { type Type, type } from 'arktype'
import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios'

export type ApiResult<T> =
	| {
			status: 'success'
			requestID: string | null
			message: string
			data: T
	  }
	| {
			status: 'error'
			type: string | null
			requestID: string | null
			message: string
			data: unknown
	  }
	| {
			status: 'validation_error'
			requestID: string | null
			message: string
			data: unknown
	  }

export type ServerEnvelopeBase = {
	status: 'success' | 'error'
	type?: string
	requestID: string | null
	message: string
	data?: unknown
}

export const ServerEnvelopeBaseSchema: Type<ServerEnvelopeBase> = type({
	status: "'success' | 'error'",
	'type?': 'string',
	requestID: 'string.uuid.v4 | null',
	message: 'string',
	'data?': 'unknown',
})

export type CustomerServerEnvelope = {
	status: 'success' | 'error'
	message: string
	data?: unknown
}

export const CustomerServerEnvelopeSchema: Type<CustomerServerEnvelope> = type({
	status: "'success' | 'error'",
	message: 'string',
	'data?': 'unknown',
})

export interface ApiClientConfig {
	baseURL: string
	apiKey?: string
	timeout?: number
	retryConfig?: RetryConfig
	errorMessages?: Partial<ErrorMessages>
	interceptors?: {
		request?: (
			config: InternalAxiosRequestConfig,
		) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
		response?: (
			response: AxiosResponse,
		) => AxiosResponse | Promise<AxiosResponse>
		error?: (error: AxiosError) => Promise<AxiosError>
	}
}

export interface RetryConfig {
	maxRetries: number
	baseDelay: number
	maxDelay: number
	retryOn?: (error: AxiosError) => boolean
}

export interface ErrorMessages {
	unknownError: string
	invalidResponseEnvelope: string
	invalidResponsePayload: string
	invalidRequestSchema: string
	networkError: string
	timeoutError: string
}

export interface RequestConfig extends AxiosRequestConfig {
	timeout?: number
	skipRetry?: boolean
}

const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
	unknownError: 'Unknown error occurred',
	invalidResponseEnvelope: 'Invalid response envelope',
	invalidResponsePayload: 'Invalid response payload',
	invalidRequestSchema: 'Invalid request schema',
	networkError: 'Network error',
	timeoutError: 'Request timeout',
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
	maxRetries: 3,
	baseDelay: 1000,
	maxDelay: 10000,
	retryOn: (error: AxiosError) => {
		return (
			!error.response ||
			error.response.status >= 500 ||
			error.code === 'ECONNABORTED' ||
			error.code === 'ENOTFOUND' ||
			error.code === 'ECONNRESET'
		)
	},
}

const tryGetRequestID = (raw: unknown): string | null => {
	if (raw && typeof raw === 'object' && 'requestID' in raw) {
		const v = (raw as Record<string, unknown>).requestID
		return typeof v === 'string' ? v : null
	}
	return null
}

export class ApiClient {
	private client: AxiosInstance
	private retryConfig: RetryConfig
	private errorMessages: ErrorMessages

	constructor(
		config: string | ApiClientConfig,
		apiKey?: string,
		timeout = 5000,
	) {
		let clientConfig: ApiClientConfig

		if (typeof config === 'string') {
			clientConfig = { baseURL: config, apiKey, timeout }
		} else {
			clientConfig = config
		}

		this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...clientConfig.retryConfig }
		this.errorMessages = {
			...DEFAULT_ERROR_MESSAGES,
			...clientConfig.errorMessages,
		}

		this.client = axios.create({
			baseURL: clientConfig.baseURL,
			timeout: clientConfig.timeout ?? 5000,
			headers: {
				'Content-Type': 'application/json',
				...(clientConfig.apiKey
					? { 'X-Fire-Apikey': clientConfig.apiKey }
					: {}),
			},
		})

		if (clientConfig.interceptors?.request) {
			this.client.interceptors.request.use(clientConfig.interceptors.request)
		}

		if (clientConfig.interceptors?.response) {
			this.client.interceptors.response.use(clientConfig.interceptors.response)
		}

		if (clientConfig.interceptors?.error) {
			this.client.interceptors.response.use(
				undefined,
				clientConfig.interceptors.error,
			)
		}
	}

	private async sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	private calculateRetryDelay(attempt: number): number {
		const delay = this.retryConfig.baseDelay * 2 ** attempt
		return Math.min(delay, this.retryConfig.maxDelay)
	}

	private handleError(error: unknown): ApiResult<never> {
		if (axios.isAxiosError(error)) {
			const e = error as AxiosError
			const rid = tryGetRequestID(e.response?.data)

			let message = this.errorMessages.unknownError
			if (e.code === 'ECONNABORTED') {
				message = this.errorMessages.timeoutError
			} else if (e.code === 'ENOTFOUND' || e.code === 'ECONNRESET') {
				message = this.errorMessages.networkError
			} else if (e.message) {
				message = e.message
			}

			return {
				status: 'error',
				// @ts-expect-error
				type: e.response?.data?.type ?? null,
				requestID: rid,
				// @ts-expect-error
				message: e.response?.data?.message ?? message,
				// @ts-expect-error
				data: e.response?.data.data ?? null,
			}
		}
		return {
			status: 'error',
			type: null,
			requestID: null,
			message: this.errorMessages.unknownError,
			data: null,
		}
	}

	private parseResponse<Payload>(
		response: AxiosResponse<unknown>,
		payloadValidator: Type<Payload>,
	): ApiResult<Payload> {
		const envRes = ServerEnvelopeBaseSchema(response.data)
		if (envRes instanceof type.errors) {
			return {
				status: 'validation_error',
				requestID: tryGetRequestID(response.data),
				message: `${this.errorMessages.invalidResponseEnvelope}: ${envRes.summary}`,
				data: response.data,
			}
		}
		const env = envRes as ServerEnvelopeBase

		if (env.status === 'error') {
			return {
				status: 'error',
				type: env.type ?? null,
				requestID: env.requestID,
				message: env.message,
				data: env.data ?? null,
			}
		}

		const payloadRes = payloadValidator(env.data)
		if (payloadRes instanceof type.errors) {
			return {
				status: 'validation_error',
				requestID: env.requestID,
				message: `${this.errorMessages.invalidResponsePayload}: ${payloadRes.summary}`,
				data: env.data,
			}
		}

		return {
			status: 'success',
			requestID: env.requestID,
			message: env.message,
			data: payloadRes as Payload,
		}
	}

	private async executeWithRetry<T>(
		operation: () => Promise<T>,
		config?: RequestConfig,
	): Promise<T> {
		const skipRetry = config?.skipRetry ?? false
		if (skipRetry) {
			return operation()
		}

		let lastError: unknown
		for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
			try {
				return await operation()
			} catch (error) {
				lastError = error

				if (attempt === this.retryConfig.maxRetries) {
					break
				}

				if (axios.isAxiosError(error) && !this.retryConfig.retryOn?.(error)) {
					break
				}

				const delay = this.calculateRetryDelay(attempt)
				await this.sleep(delay)
			}
		}

		throw lastError
	}

	async get<Payload>(
		url: string,
		payloadValidator: Type<Payload>,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const response = await this.executeWithRetry(
				() =>
					this.client.get(url, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)
			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async post<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.post(url, parsedReq, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async put<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.put(url, parsedReq, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async patch<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.patch(url, parsedReq, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async delete<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.delete(url, {
						...config,
						timeout: config?.timeout,
						data: parsedReq,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}
}

export class CustomerApiClient {
	private client: AxiosInstance
	private retryConfig: RetryConfig
	private errorMessages: ErrorMessages

	constructor(
		config: string | ApiClientConfig,
		apiKey?: string,
		timeout = 5000,
	) {
		let clientConfig: ApiClientConfig

		if (typeof config === 'string') {
			clientConfig = { baseURL: config, apiKey, timeout }
		} else {
			clientConfig = config
		}

		this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...clientConfig.retryConfig }
		this.errorMessages = {
			...DEFAULT_ERROR_MESSAGES,
			...clientConfig.errorMessages,
		}

		this.client = axios.create({
			baseURL: clientConfig.baseURL,
			timeout: clientConfig.timeout ?? 5000,
			headers: {
				'Content-Type': 'application/json',
				...(clientConfig.apiKey
					? { 'X-Fire-Apikey': clientConfig.apiKey }
					: {}),
			},
		})

		if (clientConfig.interceptors?.request) {
			this.client.interceptors.request.use(clientConfig.interceptors.request)
		}

		if (clientConfig.interceptors?.response) {
			this.client.interceptors.response.use(clientConfig.interceptors.response)
		}

		if (clientConfig.interceptors?.error) {
			this.client.interceptors.response.use(
				undefined,
				clientConfig.interceptors.error,
			)
		}
	}

	private async sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	private calculateRetryDelay(attempt: number): number {
		const delay = this.retryConfig.baseDelay * 2 ** attempt
		return Math.min(delay, this.retryConfig.maxDelay)
	}

	private handleError(error: unknown): ApiResult<never> {
		if (axios.isAxiosError(error)) {
			const e = error as AxiosError

			let message = this.errorMessages.unknownError
			if (e.code === 'ECONNABORTED') {
				message = this.errorMessages.timeoutError
			} else if (e.code === 'ENOTFOUND' || e.code === 'ECONNRESET') {
				message = this.errorMessages.networkError
			} else if (e.message) {
				message = e.message
			}

			return {
				status: 'error',
				// @ts-expect-error
				type: e.response?.data?.type ?? null,
				requestID: null,
				// @ts-expect-error
				message: e.response?.data?.message ?? message,
				// @ts-expect-error
				data: e.response?.data.data ?? null,
			}
		}
		return {
			status: 'error',
			type: null,
			requestID: null,
			message: this.errorMessages.unknownError,
			data: null,
		}
	}

	private parseResponse<Payload>(
		response: AxiosResponse<unknown>,
		payloadValidator: Type<Payload>,
	): ApiResult<Payload> {
		const envRes = CustomerServerEnvelopeSchema(response.data)
		if (envRes instanceof type.errors) {
			return {
				status: 'validation_error',
				requestID: null,
				message: `${this.errorMessages.invalidResponseEnvelope}: ${envRes.summary}`,
				data: response.data,
			}
		}
		const env = envRes as CustomerServerEnvelope

		if (env.status === 'error') {
			return {
				status: 'error',
				type: null,
				requestID: null,
				message: env.message,
				data: env.data ?? null,
			}
		}

		const payloadRes = payloadValidator(env.data)
		if (payloadRes instanceof type.errors) {
			return {
				status: 'validation_error',
				requestID: null,
				message: `${this.errorMessages.invalidResponsePayload}: ${payloadRes.summary}`,
				data: env.data,
			}
		}

		return {
			status: 'success',
			requestID: null,
			message: env.message,
			data: payloadRes as Payload,
		}
	}

	private async executeWithRetry<T>(
		operation: () => Promise<T>,
		config?: RequestConfig,
	): Promise<T> {
		const skipRetry = config?.skipRetry ?? false
		if (skipRetry) {
			return operation()
		}

		let lastError: unknown
		for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
			try {
				return await operation()
			} catch (error) {
				lastError = error

				if (attempt === this.retryConfig.maxRetries) {
					break
				}

				if (axios.isAxiosError(error) && !this.retryConfig.retryOn?.(error)) {
					break
				}

				const delay = this.calculateRetryDelay(attempt)
				await this.sleep(delay)
			}
		}

		throw lastError
	}

	async get<Payload>(
		url: string,
		payloadValidator: Type<Payload>,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const response = await this.executeWithRetry(
				() =>
					this.client.get(url, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async post<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.post(url, parsedReq, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async put<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.put(url, parsedReq, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async patch<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.patch(url, parsedReq, {
						...config,
						timeout: config?.timeout,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async delete<Req, Payload>(
		url: string,
		requestValidator: Type<Req>,
		payloadValidator: Type<Payload>,
		body: unknown,
		config?: RequestConfig,
	): Promise<ApiResult<Payload>> {
		try {
			const maybeReq = requestValidator(body)
			if (maybeReq instanceof type.errors) {
				return {
					status: 'validation_error',
					requestID: null,
					message: `${this.errorMessages.invalidRequestSchema}: ${maybeReq.summary}`,
					data: body,
				}
			}
			const parsedReq = maybeReq as Req

			const response = await this.executeWithRetry(
				() =>
					this.client.delete(url, {
						...config,
						timeout: config?.timeout,
						data: parsedReq,
					}),
				config,
			)

			return this.parseResponse(response, payloadValidator)
		} catch (error) {
			return this.handleError(error)
		}
	}
}
