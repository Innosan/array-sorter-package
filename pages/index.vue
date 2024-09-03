<script setup lang="ts">
import { arrayTabs } from "~/utils/navigation";
import { CardSizes } from "~/types/ui/CardSizes";
import { type ArrayItem } from "~/types/data/ArrayItem";

const toast = useToast();

const selectedTab = ref(arrayTabs[0].id);

const arrays: ArrayItem[] = ref([
	{
		id: 1,
		title: "Array 1",
		description: "This is the first array",
		unsorted: [5, 4, 3, 2, 1],
		sorted: [5, 4, 3, 2, 1],
	},
	{
		id: 2,
		title: "Array 2",
		description: "This is the second array",
		unsorted: [1, 2, 3, 4, 5],
		sorted: [1, 2, 3, 4, 5],
	},
	{
		id: 3,
		title: "Array 3",
		description: "This is the third array",
		unsorted: [3, 2, 1, 5, 4],
		sorted: [3, 2, 1, 5, 4],
	},
]);
</script>

<template>
	<PageSection title="All the arrays, all the time, all the way" icon="i-heroicons-home-solid" :is-divided="false">
		<TitledBlock title="Arrays">
			<div class="flex flex-col gap-4">
				<UButtonGroup size="xs">
					<UButton
						v-for="tab in arrayTabs"
						@click="selectedTab = tab.id"
						:color="selectedTab === tab.id ? 'primary' : 'gray'"
						:label="tab.label"
						:icon="tab.icon"
					/>
				</UButtonGroup>

				<Grid>
					<UCard v-for="array in arrays" :ui="CardSizes.sm">
						<template #header>
							<div class="flex flex-col">
								<p class="font-bold text-xl">{{ array.title }}</p>
								<p class="opacity-70 text-sm">{{ array.description }}</p>
							</div>
						</template>
						<div class="flex flex-col gap-4">
							<TitledBlock title="Unsorted state">
								<div class="flex flex-wrap gap-2">
									<span v-for="n in array.sorted" class="p-1 px-3 ring-1 ring-gray-800 rounded-lg">{{
										n
									}}</span>
								</div>
							</TitledBlock>
							<TitledBlock title="Sorted state">
								<div class="flex flex-wrap gap-2" v-auto-animate>
									<span
										v-for="n in array.unsorted"
										:key="n"
										class="p-1 px-3 ring-1 ring-gray-800 rounded-lg"
										>{{ n }}</span
									>
								</div>
							</TitledBlock>
						</div>
						<template #footer>
							<div class="flex place-self-end gap-4">
								<UButton label="Sort" color="green" @click="array.unsorted.sort((a, b) => a - b)" />
								<UButton label="Delete" color="gray" />
								<UButton label="Edit" color="gray" />
							</div>
						</template>
					</UCard>
				</Grid>
			</div>
		</TitledBlock>
	</PageSection>
</template>
