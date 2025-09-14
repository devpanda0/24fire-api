import { type Type, type } from 'arktype'

export type KvmTrafficDir = 'IN' | 'OUT' | 'IO'
export const KvmTrafficDirSchema: Type<KvmTrafficDir> = type(
	'"IN" | "OUT" | "IO"',
)

export type KvmTrafficSummary = 'NONE' | 'DAILY' | 'HOURLY'
export const KvmTrafficSummarySchema: Type<KvmTrafficSummary> = type(
	'"NONE" | "DAILY" | "HOURLY"',
)

export type KvmTrafficChartOutput =
	| 'APEXCHARTS_CONFIG'
	| 'CHARTJS_CONFIG'
	| 'BASE64_IMAGE'
export const KvmTrafficChartOutputSchema: Type<KvmTrafficChartOutput> = type(
	'"APEXCHARTS_CONFIG" | "CHARTJS_CONFIG" | "BASE64_IMAGE"',
)

export type KvmTrafficChartRequest = {
	type: KvmTrafficDir
	summary: KvmTrafficSummary
	output: KvmTrafficChartOutput
	dataset_in_label?: string
	dataset_out_label?: string
	dataset_in_color?: string
	dataset_out_color?: string
	axes_y_label?: string
	datapoints?: number
	size?: string
	range?: 'day' | 'week' | 'month' | 'year'
	start?: string
	end?: string
}
export const KvmTrafficChartRequestSchema: Type<KvmTrafficChartRequest> = type({
	type: KvmTrafficDirSchema,
	summary: KvmTrafficSummarySchema,
	output: KvmTrafficChartOutputSchema,
	'dataset_in_label?': 'string',
	'dataset_out_label?': 'string',
	'dataset_in_color?': 'string',
	'dataset_out_color?': 'string',
	'axes_y_label?': 'string',
	'datapoints?': 'number.integer > 1',
	'size?': 'string',
	'range?': "'day' | 'week' | 'month' | 'year'",
	'start?': 'string',
	'end?': 'string',
})

export type KvmTrafficDataset = {
	label: string
	data: number[]
	borderColor: string
	backgroundColor: string
}
export const KvmTrafficDataset: Type<KvmTrafficDataset> = type({
	label: 'string',
	data: type('number >= 0').array(),
	borderColor: 'string',
	backgroundColor: 'string',
})

export type KvmTrafficApexConfig = {
	chart: {
		type: string
		height: number
		toolbar: { show: boolean }
		zoom: { enabled: boolean }
	}
	dataLabels: { enabled: boolean }
	series: { name: string; data: number[] }[]
	colors: string[]
	xaxis: { categories: string[] }
	yaxis: { title: { text: string; align?: string; margin?: number } }
}
export const KvmTrafficApexConfigSchema: Type<KvmTrafficApexConfig> = type({
	chart: {
		type: 'string',
		height: 'number.integer',
		toolbar: { show: 'boolean' },
		zoom: { enabled: 'boolean' },
	},
	dataLabels: { enabled: 'boolean' },
	series: type({ name: 'string', data: 'number[]' }).array(),
	colors: 'string[]',
	xaxis: { categories: 'string[]' },
	yaxis: {
		title: {
			text: 'string',
			'align?': 'string',
			'margin?': 'number.integer',
		},
	},
})

export type KvmTrafficChartJsConfig = {
	type: string
	data: { labels: string[]; datasets: KvmTrafficDataset[] }
	options?: {
		title?: { text?: string }
		scales?: {
			yAxes?: {
				ticks?: { beginAtZero?: boolean; unit?: string }
				scaleLabel?: {
					display?: boolean
					labelString?: string
					padding?: { top?: number; bottom?: number }
				}
			}[]
		}
	}
}
export const KvmTrafficChartJsConfigSchema: Type<KvmTrafficChartJsConfig> =
	type({
		type: 'string',
		data: { labels: 'string[]', datasets: KvmTrafficDataset.array() },
		'options?': {
			'title?': { 'text?': 'string' },
			'scales?': {
				'yAxes?': type({
					'ticks?': { 'beginAtZero?': 'boolean', 'unit?': 'string' },
					'scaleLabel?': {
						'display?': 'boolean',
						'labelString?': 'string',
						'padding?': {
							'top?': 'number.integer',
							'bottom?': 'number.integer',
						},
					},
				}).array(),
			},
		},
	})

export type KvmTrafficImagePayload = { chart: string }
export const KvmTrafficImagePayloadSchema: Type<KvmTrafficImagePayload> = type({
	chart: 'string',
})

export type KvmTrafficChart =
	| { config: KvmTrafficApexConfig }
	| { config: KvmTrafficChartJsConfig }
	| KvmTrafficImagePayload

export const KvmTrafficChartSchema: Type<KvmTrafficChart> = type({
	config: KvmTrafficApexConfigSchema,
})
	.or({ config: KvmTrafficChartJsConfigSchema })
	.or(KvmTrafficImagePayloadSchema)
