export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: ["@nuxt/ui", "@formkit/auto-animate/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],

	nitro: {
		experimental: {
			database: true,
			openAPI: true,
		},
		database: {
			default: {
				connector: "postgresql",
			},
		},
		openAPI: {
			meta: {
				title: "My Awesome Project",
				description: "This might become the next big thing.",
				version: "1.0",
			},
		},
	},

	runtimeConfig: {
		databaseUrl: "",
		random: {
			arrays: {
				minLength: 5,
				maxLength: 30,
			},
			numbers: {
				min: -100,
				max: 100,
			},
		},
	},

	css: ["~/assets/styles/main.css"],
});
