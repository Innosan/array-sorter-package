import type { NavigationLink } from "~/types/utility/NavigationLink";

export const navigation: NavigationLink[] = [
	{
		id: 1,
		to: "/",
		label: "Arrays",
		icon: "i-heroicons-squares-2x2-16-solid",
	},
];

export const arrayTabs: NavigationLink[] = [
	{
		id: 1,
		label: "All",
		icon: "i-heroicons-rectangle-stack-solid",
	},
	{
		id: 2,
		label: "Sorted",
		icon: "i-heroicons-squares-2x2-solid",
	},
	{
		id: 3,
		label: "Unsorted",
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
