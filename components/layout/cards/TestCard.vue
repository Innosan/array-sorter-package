<script setup lang="ts">
import type { TestResult } from "~/types/utility/TestResult";
import { CardSizes } from "~/types/ui/CardSizes";

const props = defineProps({
	test: {
		type: Object as PropType<TestResult>,
		required: true,
	},
});
</script>

<template>
	<UCard :ui="CardSizes.sm">
		<template #header>
			<p class="font-bold">{{ test.title }}</p>
		</template>
		<div class="flex flex-col">
			<div class="flex gap-2">
				<div v-if="test.isCompleted">
					<p>{{ test.latestCompletion }}</p>
					<p>{{ test.sortTime }}</p>
					<p>{{ test.totalTime }}</p>
				</div>
				<p v-else class="opacity-70 underline">Еще не выполнен</p>
			</div>
		</div>
		<template #footer>
			<slot />
		</template>
	</UCard>
</template>
