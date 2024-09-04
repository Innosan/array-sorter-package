import type { ArrayItem } from "~/types/data/ArrayItem";

export const useArraysStore = defineStore("arrays-store", () => {
	const isFetching = ref(false);

	const arrays = useState("arrays", () => [] as ArrayItem[]);

	const getAllArrays = async () => {
		isFetching.value = true;

		const result = await useFetch("/api/getArrays");
		arrays.value = result.data.value as ArrayItem[];

		isFetching.value = false;
	};

	return { arrays, isFetching, getAllArrays };
});
