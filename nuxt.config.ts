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
		},
		database: {
			default: {
				connector: "postgresql",
				url: "postgresql://postgres:4ev3R2Gether@localhost:5432/rps_arrays",
			},
		},
	},

	runtimeConfig: {
		databaseUrl: "",
	},

	css: ["~/assets/styles/main.css"],
});
