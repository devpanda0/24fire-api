import { type Type, type } from 'arktype'

export type VmTrafficDir = 'IN' | 'OUT' | 'IO'
export const VmTrafficDirSchema: Type<VmTrafficDir> = type(
	'"IN" | "OUT" | "IO"',
)

export type VmTrafficSummary = 'NONE' | 'DAILY' | 'HOURLY'
export const VmTrafficSummarySchema: Type<VmTrafficSummary> = type(
	'"NONE" | "DAILY" | "HOURLY"',
)

export type VmTrafficChartOutput =
	| 'APEXCHARTS_CONFIG'
	| 'CHARTJS_CONFIG'
	| 'BASE64_IMAGE'
export const VmTrafficChartOutputSchema: Type<VmTrafficChartOutput> = type(
	'"APEXCHARTS_CONFIG" | "CHARTJS_CONFIG" | "BASE64_IMAGE"',
)

export type VmTrafficChartRequest = {
	type: VmTrafficDir
	summary: VmTrafficSummary
	output: VmTrafficChartOutput
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
export const VmTrafficChartRequestSchema: Type<VmTrafficChartRequest> = type({
	type: VmTrafficDirSchema,
	summary: VmTrafficSummarySchema,
	output: VmTrafficChartOutputSchema,
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

export type VmTrafficDataset = {
	label: string
	data: number[]
	borderColor: string
	backgroundColor: string
}
export const VmTrafficDataset: Type<VmTrafficDataset> = type({
	label: 'string',
	data: type('number >= 0').array(),
	borderColor: 'string',
	backgroundColor: 'string',
})

export type VmTrafficApexConfig = {
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
export const VmTrafficApexConfigSchema: Type<VmTrafficApexConfig> = type({
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

export type VmTrafficChartJsConfig = {
	type: string
	data: { labels: string[]; datasets: VmTrafficDataset[] }
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
export const VmTrafficChartJsConfigSchema: Type<VmTrafficChartJsConfig> = type({
	type: 'string',
	data: { labels: 'string[]', datasets: VmTrafficDataset.array() },
	'options?': {
		'title?': { 'text?': 'string' },
		'scales?': {
			'yAxes?': type({
				'ticks?': { 'beginAtZero?': 'boolean', 'unit?': 'string' },
				'scaleLabel?': {
					'display?': 'boolean',
					'labelString?': 'string',
					'padding?': { 'top?': 'number.integer', 'bottom?': 'number.integer' },
				},
			}).array(),
		},
	},
})

export type VmTrafficImagePayload = { chart: string }
export const VmTrafficImagePayloadSchema: Type<VmTrafficImagePayload> = type({
	chart: 'string',
})

export type VmTrafficChart =
	| { config: VmTrafficApexConfig }
	| { config: VmTrafficChartJsConfig }
	| VmTrafficImagePayload

export const VmTrafficChartSchema: Type<VmTrafficChart> = type({
	config: VmTrafficApexConfigSchema,
})
	.or({ config: VmTrafficChartJsConfigSchema })
	.or(VmTrafficImagePayloadSchema)
