import type { NavigationLink } from "~/types/utility/NavigationLink";

export const navigation: NavigationLink[] = [
	{
		id: 1,
		to: "/",
		label: "Массивы",
		icon: "i-heroicons-squares-2x2-16-solid",
	},
	{
		id: 2,
		to: "/faq",
		label: "FAQ",
		icon: "i-heroicons-question-mark-circle-16-solid",
	},
];

export const arrayTabs: NavigationLink[] = [
	{
		id: 1,
		label: "Все",
		icon: "i-heroicons-rectangle-stack-solid",
	},
	{
		id: 2,
		label: "Отсортированные",
		icon: "i-heroicons-squares-2x2-solid",
	},
	{
		id: 3,
		label: "Неотсортированные",
		icon: "i-heroicons-rectangle-group-solid",
	},
];

export const socials: NavigationLink[] = [
	{
		id: 1,
		to: "https://github.com",
		label: "GitHub",
		icon: "i-octicon-mark-github-16",
	},
	{
		id: 2,
		to: "https://telegram.com",
		label: "Telegram",
		icon: "i-streamline-telegram-solid",
	},
];
