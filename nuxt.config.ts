export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: ["@nuxt/ui", "@formkit/auto-animate/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],

	image: {
		domains: ["nekos.best"],
	},

	css: ["~/assets/styles/main.css"],
});
