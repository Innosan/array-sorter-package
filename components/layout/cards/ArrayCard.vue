<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";
import type { ArrayItem } from "~/types/data/ArrayItem";

const props = defineProps({
	array: {
		type: Object as PropType<ArrayItem>,
		required: true,
	},
	onDelete: {
		type: Function as PropType<() => void>,
		required: true,
	},
});

const isDeleting = ref(false);
</script>

<template>
	<UCard :ui="CardSizes.sm">
		<div class="flex flex-col gap-4">
			<TitledBlock title="Данные">
				<div class="flex flex-wrap gap-2">
					<span v-for="n in array.unsorted" class="p-1 px-3 ring-1 ring-gray-800 rounded-lg">{{ n }}</span>
				</div>
			</TitledBlock>
			<TitledBlock title="Сортированные данные">
				<div v-if="array.sorted" class="flex flex-wrap gap-2" v-auto-animate>
					<span v-for="n in array.sorted" :key="n" class="p-1 px-3 ring-1 ring-gray-800 rounded-lg">{{
						n
					}}</span>
				</div>
				<p v-else>Массив еще не отсортирован</p>
			</TitledBlock>
		</div>
		<template #footer>
			<slot />
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
				<UButton
					label="Сортировать"
					color="green"
					:class="isDeleting ? 'hidden' : ''"
					class="col-span-1 md:col-span-2 lg:col-span-4"
					icon="i-heroicons-arrow-path-rounded-square-solid"
				/>
				<UButton
					@click="isDeleting = !isDeleting"
					color="gray"
					:class="isDeleting ? 'hidden' : ''"
					class="justify-center"
					icon="i-heroicons-trash-solid"
				/>
				<UButton
					color="gray"
					:class="isDeleting ? 'hidden' : ''"
					class="justify-center lg:col-span-"
					icon="i-heroicons-pencil-square-solid"
				/>
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
