<script setup lang="ts">
import faqInfo from "~/public/data/faqInfo.json";
import type { FaqItem } from "~/types/data/FaqItem";

const frontend = faqInfo.frontend as FaqItem[];
const backend = faqInfo.backend as FaqItem[];
</script>

<template>
	<PageSection title="Почему такой выбор клиентской части?" icon="i-heroicons-computer-desktop-solid">
		<TitledBlock title="Варианты">
			<Grid responsive-columns="lg:grid-cols-3 md:grid-cols-3">
				<FaqCard v-for="front in frontend" :item="front" />
			</Grid>
		</TitledBlock>
	</PageSection>

	<PageSection title="Почему такой выбор серверной части?" icon="i-heroicons-server-stack-solid">
		<TitledBlock title="Варианты">
			<Grid responsive-columns="lg:grid-cols-3 md:grid-cols-3">
				<FaqCard v-for="back in backend" :item="back" />
			</Grid>
		</TitledBlock>
	</PageSection>
</template>
