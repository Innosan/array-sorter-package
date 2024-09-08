<script setup lang="ts">
import { useArraysStore } from "~/stores/arrays";
import { arrayTabs } from "~/utils/navigation";

import AddArray from "~/components/forms/AddArray.vue";

const selectedTab = ref(arrayTabs[0].id);

const arrayStore = useArraysStore();
arrayStore.getAllArrays();
</script>

<template>
	<PageSection title="All the arrays, all the time, all the way" icon="i-heroicons-home-solid" :is-divided="false">
		<TitledBlock title="Arrays">
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
					<ArrayCard v-for="array in arrayStore.arrays" :array="array" :on-delete="() => {}" />
				</Grid>
			</div>
		</TitledBlock>
	</PageSection>
</template>
