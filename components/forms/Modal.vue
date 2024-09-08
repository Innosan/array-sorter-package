<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";
import { type ButtonOptions, createButtonOptions } from "~/types/ui/ButtonOptions";

const isOpened = ref(false);

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	buttonOptions: {
		type: Object as PropType<ButtonOptions>,
		default: createButtonOptions({ label: "Open modal" }),
	},
});
</script>

<template>
	<UButton
		:label="buttonOptions.label"
		:icon="buttonOptions.icon"
		:variant="buttonOptions.variant"
		:color="buttonOptions.color"
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

			<!-- Used for action buttons like save, etc., if they're existing -->
			<template v-if="$slots.footer" #footer>
				<div class="flex gap-4 items-center">
					<slot name="footer" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
