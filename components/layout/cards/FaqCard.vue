<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";
import { SectionSizes } from "~/types/ui/SectionSizes";
import type { FaqItem } from "~/types/data/FaqItem";

const props = defineProps({
	item: {
		type: Object as PropType<FaqItem>,
		required: true,
	},
});
</script>

<template>
	<UCard :ui="CardSizes.sm">
		<template #header>
			<SectionTitle :title="item.title" :size="SectionSizes.sm" :icon="item.icon" />
		</template>

		<p class="text-sm">{{ item.content }}</p>

		<template #footer>
			<TitledBlock title="Плюсы и минусы">
				<Grid responsive-columns="lg:grid-cols-2 md:grid-cols-2">
					<div class="flex flex-col gap-2">
						<div
							v-for="(pro, index) in item.pros"
							:class="index === 0 ? 'ring-green-400' : 'ring-gray-800'"
							class="opacity-70 rounded-lg ring-1 ring-gray-800"
						>
							<p class="p-2 text-sm">{{ pro }}</p>
						</div>
					</div>

					<div class="flex flex-col gap-2">
						<div
							v-for="(con, index) in item.cons"
							:class="index === 0 ? 'ring-red-400' : 'ring-gray-800'"
							class="opacity-70 rounded-lg ring-1 ring-gray-800"
						>
							<p class="p-2 text-sm">{{ con }}</p>
						</div>
					</div>
				</Grid>
			</TitledBlock>
		</template>
	</UCard>
</template>

<style scoped></style>
