<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";
import type { ArrayItem } from "~/types/data/ArrayItem";
import { createButtonOptions } from "~/types/ui/ButtonOptions";

const props = defineProps({
	array: {
		type: Object as PropType<ArrayItem>,
		required: true,
	},
	onDelete: {
		type: Function as PropType<() => void>,
		required: true,
	},
	onSort: {
		type: Function as PropType<() => void>,
		required: true,
	},
	onEdit: {
		type: Function as PropType<(updatedArray: number[]) => void>,
		required: true,
	},
});

const isDeleting = ref(false);

const isSorted = computed(() => props.array.sorted !== null);

/**
 * Editing the array
 */

const isEditing = ref(false);

const newArrayItem = ref(null as number | null);
const arrayToAdd = ref(props.array.unsorted.slice());

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
</script>

<template>
	<UCard :ui="CardSizes.sm" class="overflow-y-hidden h-fit">
		<div class="flex flex-col gap-4">
			<TitledBlock title="Данные">
				<div
					class="array-list transition-all flex flex-wrap gap-2 min-h-20 content-start overflow-y-scroll max-h-20"
				>
					<span
						v-for="n in array.unsorted"
						:key="n"
						class="underline underline-offset-4 opacity-85 decoration-gray-400"
						>{{ n }}</span
					>
				</div>
			</TitledBlock>

			<TitledBlock title="Сортированные данные">
				<div class="flex flex-wrap gap-2 min-h-20 content-start overflow-y-scroll max-h-20" v-auto-animate>
					<p v-if="!array.sorted">Массив еще не отсортирован</p>
					<span
						v-else
						v-for="n in array.sorted"
						:key="n"
						class="underline underline-offset-4 opacity-85 decoration-gray-400"
						>{{ n }}</span
					>
				</div>
			</TitledBlock>
		</div>

		<template #footer>
			<slot />

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
				<UButton
					@click="onSort()"
					:disabled="isSorted"
					:label="isSorted ? 'Уже отсортрован' : 'Сортировать'"
					:class="isDeleting ? 'hidden' : ''"
					class="col-span-1 md:col-span-2 lg:col-span-4"
					:icon="isSorted ? 'i-heroicons-check-20-solid' : 'i-heroicons-arrow-path-rounded-square-solid'"
				/>
				<UButton
					@click="isDeleting = !isDeleting"
					color="gray"
					:class="isDeleting ? 'hidden' : ''"
					class="justify-center"
					icon="i-heroicons-trash-solid"
				/>
				<Modal
					v-if="!isDeleting"
					title="Изменение массива"
					:button-options="
						createButtonOptions({
							icon: 'i-heroicons-pencil-square-solid',
							color: 'gray',
							label: ' ',
							size: 'xs',
							isVisible: !isDeleting,
							className: 'justify-center',
						})
					"
					:submit-button-options="
						createButtonOptions({
							label: 'Изменить',
							icon: 'i-heroicons-squares-plus-solid',
						})
					"
					:on-submit="
						() => {
							onEdit(arrayToAdd);
						}
					"
					:is-submit-disabled="false"
				>
					<div class="flex flex-col gap-4">
						<UInput
							@keydown="handleKeyDown"
							v-model="newArrayItem"
							type="number"
							id="newArrayItem"
							placeholder="1337..."
						>
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
				<UButton
					label="Точно удалить?"
					color="red"
					:class="isDeleting ? 'col-span-1 md:col-span-1 lg:col-span-4' : 'hidden'"
					@click="onDelete()"
				/>
				<UButton
					@click="isDeleting = false"
					label="Нет"
					color="gray"
					:class="isDeleting ? 'col-span-1 md:col-span-1 lg:col-span-2' : 'hidden'"
				/>
			</div>
		</template>
	</UCard>
</template>
