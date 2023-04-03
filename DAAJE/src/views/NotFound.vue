<script setup>
import AppButton from '../components/AppButton.vue';

</script>

<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1>Not found 404</h1>
				<p>Oj! Vi hittade inte den sidan. </p>
					<p>
						<AppButton class="text-center" color="light" size="medium" padding="p-small" type="button">
					<RouterLink to="/">Klicka här för att komma till startsidan.</RouterLink></AppButton>
				</p>
			</div>
		</div>

	</div>
</template>

<style scoped>
div {
	height: 75vh;
}
h1 {
	margin-top: 2rem;
	margin-bottom: 3rem;
}

p {
	color: white;
	text-align: center;
}
</style>