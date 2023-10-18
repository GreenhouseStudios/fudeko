<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
	<div class="flex justify-start" id="feedback-container">
		<label for="feedback" class="mx-1 font-bold">How difficult was this to answer?</label>

		<select name="feedback" id="feedback" :value="difficulty"  @change="$emit('update:difficulty', $event.target.value)">
			<option value="None"></option>
			<option value="Easy">Easy</option>
			<option value="Moderate">Moderate</option>
			<option value="SomewhatDifficult">Somewhat Difficult</option>
			<option value="Difficult">Difficult</option>
		</select>
	</div>
</template>

<script>
export default {
	props: {
		difficulty: {
			type: String,
		}
	}
}

</script>
