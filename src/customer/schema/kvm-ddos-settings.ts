import { type Type, type } from 'arktype'

export type KvmDdosSettings = Record<
	string,
	{
		layer4?: 'dynamic' | 'permanent' | 'off'
		layer7?: 'off' | 'on'
	}
>
export const KvmDdosSettingsSchema: Type<KvmDdosSettings> = type.Record(
	'string',
	{
		'layer4?': "'dynamic' | 'permanent' | 'off'",
		'layer7?': "'off' | 'on'",
	},
)
