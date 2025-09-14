import { type DefineConfigItem, defineConfig } from 'bunup'

export default defineConfig({
	clean: true,
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: {
		splitting: true,
	},
}) as DefineConfigItem
