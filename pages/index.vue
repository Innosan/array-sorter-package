<script setup lang="ts">
import { useArraysStore } from "~/stores/arrays";
import { arrayTabs } from "~/utils/navigation";

const selectedTab = ref(arrayTabs[0].id);

const arrayStore = useArraysStore();
arrayStore.getAllArrays(true);

const filteredArrays = computed(() => {
	switch (selectedTab.value) {
		case 1:
			return arrayStore.arrays;
		case 2:
			return arrayStore.arrays.filter((array) => array.sorted);
		case 3:
			return arrayStore.arrays.filter((array) => !array.sorted);
		default:
			return arrayStore.arrays;
	}
});
</script>

<template>
	<PageSection title="Массивы" icon="i-heroicons-squares-2x2-16-solid" :is-divided="false">
		<TitledBlock title="">
			<div class="flex flex-col gap-4">
				<div class="flex gap-4 items-center">
					<UButtonGroup size="xs">
						<UButton
							v-for="tab in arrayTabs"
							@click="selectedTab = tab.id"
							:color="selectedTab === tab.id ? 'primary' : 'gray'"
							:label="tab.label"
							:icon="tab.icon"
						/>
					</UButtonGroup>

					<AddArray />
				</div>

				<Grid v-auto-animate>
					<ArrayCard
						v-for="array in filteredArrays.sort((a, b) => b.unsorted.length - a.unsorted.length)"
						:key="array.id"
						:array="array"
						:on-delete="() => arrayStore.deleteArray(array.id)"
						:on-sort="() => arrayStore.sortArray(array.id)"
						:on-edit="(newArray) => arrayStore.updateArray(newArray, array.id)"
					/>
				</Grid>
				<UAlert
					icon="i-heroicons-magnifying-glass-circle-solid"
					v-if="filteredArrays.length === 0"
					title="Нет массивов"
					description="К сожалению, массивы не найдены. Попробуйте выбрать другую категорию!"
				/>
			</div>
		</TitledBlock>
	</PageSection>
</template>
