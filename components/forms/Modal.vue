<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";
import { type ButtonOptions, createButtonOptions } from "~/types/ui/ButtonOptions";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	buttonOptions: {
		type: Object as PropType<ButtonOptions>,
		default: createButtonOptions({ label: "Open modal" }),
	},
	submitButtonOptions: {
		type: Object as PropType<ButtonOptions>,
		default: createButtonOptions({ label: "Save", variant: "solid", color: "green" }),
	},
	onSubmit: {
		type: Function,
		required: true,
	},
	isSubmitDisabled: {
		type: Boolean,
		default: false,
	},
});

const isOpened = ref(false);
</script>

<template>
	<UButton
		:label="buttonOptions.label !== ' ' ? buttonOptions.label : ''"
		:icon="buttonOptions.icon"
		:variant="buttonOptions.variant"
		:color="buttonOptions.color"
		class="justify-center"
		:size="buttonOptions.size"
		@click="isOpened = true"
	/>

	<UModal v-model="isOpened">
		<UCard :ui="CardSizes.sm">
			<template #header>
				<div class="flex justify-between items-center">
					<p class="font-bold text-xl">{{ title }}</p>
					<UButton icon="i-heroicons-x-mark" variant="ghost" color="gray" @click="isOpened = false" />
				</div>
			</template>

			<slot />
			<slot name="body" />

			<template #footer>
				<div class="flex gap-4 items-center">
					<UButton
						:label="submitButtonOptions.label"
						:disabled="isSubmitDisabled"
						:icon="submitButtonOptions.icon"
						:variant="submitButtonOptions.variant"
						:color="submitButtonOptions.color"
						:size="submitButtonOptions.size"
						@click="
							() => {
								onSubmit();
								isOpened = false;
							}
						"
					/>
					<slot name="footer" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
