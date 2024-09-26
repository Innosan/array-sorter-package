import { type ArrayItem, createArrayItem } from "~/types/data/ArrayItem";

export const useArraysStore = defineStore("arrays-store", () => {
	const toast = useToast();
	const arrays = useState("arrays", () => [] as ArrayItem[]);

	const getAllArrays = async (isInitial: boolean = false) => {
		if (isInitial) {
			const result = await useFetch("/api/arrays");
			arrays.value = result.data.value as ArrayItem[];
		} else {
			const result = await $fetch("/api/arrays");
			arrays.value = result as ArrayItem[];
		}
	};

	const addArray = async (array: number[]) => {
		const item = createArrayItem(array);

		const { status, body } = await $fetch("/api/post/array", {
			method: "POST",
			body: { ...item },
		});

		if (status === 200) {
			await getAllArrays();
		}

		toast.add(body.notification);
	};

	const deleteArray = async (id: number) => {
		const { body } = await $fetch("/api/delete/array", {
			method: "DELETE",
			body: { id },
		});

		toast.add(body.notification);
		await getAllArrays();
	};

	const sortArray = async (id: number) => {
		const { body } = await $fetch("/api/post/sort", {
			method: "POST",
			body: { id },
		});

		toast.add(body.notification);
		await getAllArrays();
	};

	const updateArray = async (newArray: number[], arrayId: number) => {
		const { body } = await $fetch("/api/post/edit", {
			method: "POST",
			body: { newArray: newArray, id: arrayId },
		});

		toast.add(body.notification);
		await getAllArrays();
	};

	return { arrays, getAllArrays, addArray, deleteArray, sortArray, updateArray };
});
