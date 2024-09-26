export type TestResult = {
	id: string;
	title: string;
	totalTime: string;
	sortTime: string;
	isCompleted: boolean;
	latestCompletion: string;
};

export const createTest = (testData: Partial<TestResult>): TestResult => {
	return {
		id: testData.id || "test",
		title: testData.title || "Тест",
		totalTime: testData.totalTime || "1 час",
		sortTime: testData.sortTime || "1 минута",
		isCompleted: testData.isCompleted || false,
		latestCompletion: "",
	};
};
