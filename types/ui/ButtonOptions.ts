export type ButtonOptions = {
	label: string;
	icon: string;
	variant: string;
	color: string;
	size: string;
};

export const createButtonOptions = (options: Partial<ButtonOptions> = {}): ButtonOptions => {
	return {
		label: options.label || "Default Button",
		icon: options.icon || "",
		variant: options.variant || "solid",
		color: options.color || "primary",
		size: options.size || "md",
	};
};
