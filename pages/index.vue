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

const max = 5;
const pageCount = 16;
const currentPage = ref(1);
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

				<Grid>
					<ArrayCard
						v-for="array in filteredArrays.slice((currentPage - 1) * pageCount, currentPage * pageCount)"
						:key="array.id"
						:array="array"
						:on-delete="() => arrayStore.deleteArray(array.id)"
						:on-sort="() => arrayStore.sortArray(array.id)"
						:on-edit="(newArray) => arrayStore.updateArray(newArray, array.id)"
					/>
				</Grid>
				<UPagination :max="max" :page-count="pageCount" :total="filteredArrays.length" v-model="currentPage" />
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
