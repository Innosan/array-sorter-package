<script setup lang="ts">
import { createButtonOptions } from "~/types/ui/ButtonOptions";

const newArrayItem = ref(null as number | null);
const arrayToAdd = ref([]);

const addToArray = () => {
	if (!newArrayItem.value) return;
	arrayToAdd.value.push(newArrayItem.value);
	newArrayItem.value = null; // Reset the input field
};

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key === "Enter") {
		addToArray();
	}
};

function removeItemByIndex(toRemove) {
	arrayToAdd.value.splice(toRemove, 1);
}

const arraysStore = useArraysStore();
</script>

<template>
	<Modal
		title="Новый массив"
		:button-options="
			createButtonOptions({
				label: 'Добавить новый',
				icon: 'i-heroicons-squares-plus-solid',
				size: 'xs',
			})
		"
		:submit-button-options="
			createButtonOptions({
				label: 'Добавить',
				icon: 'i-heroicons-squares-plus-solid',
			})
		"
		:on-submit="
			() => {
				arraysStore.addArray(arrayToAdd);
				arrayToAdd = [];
			}
		"
		:is-submit-disabled="arrayToAdd.length === 0"
	>
		<div class="flex flex-col gap-4">
			<UInput @keydown="handleKeyDown" v-model="newArrayItem" type="number" placeholder="1337...">
				<template #trailing>
					<UKbd>Enter</UKbd>
				</template>
			</UInput>

			<UDivider />

			<TitledBlock title="Что же находится в моей сумочке?">
				<div
					v-if="arrayToAdd.length !== 0"
					class="flex flex-wrap gap-2 min-h-32 max-h-60 content-start overflow-y-scroll"
				>
					<UTooltip text="Нажмите, чтобы удалить" v-for="(n, index) in arrayToAdd" :key="index">
						<UButton
							@click="removeItemByIndex(index)"
							color="gray"
							class="min-w-14 justify-center h-8 max-w-24 overflow-y-hidden overflow-x-hidden"
						>
							<p :title="n" class="truncate">{{ n }}</p>
						</UButton>
					</UTooltip>
				</div>
				<UAlert
					v-else
					title="Тут пусто!"
					description="Добавьте что-нибудь."
					icon="i-heroicons-archive-box-x-mark-solid"
				/>
			</TitledBlock>
		</div>
	</Modal>
</template>
