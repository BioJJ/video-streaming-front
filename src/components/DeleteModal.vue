<template>
	<v-dialog v-model="show" persistent max-width="400">
		<v-card>
			<v-card-title class="headline red--text"> Delete? </v-card-title>
			<v-card-text>
				This will erase the {{ table }} data "{{ name }}" from the system. Are
				you sure you want to delete the {{ table }}?
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="secondary" @click="show = false"> Back </v-btn>
				<v-btn color="red" text @click="deleted"> Delete </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { useVideoStore } from '../stores/video.store'

	export default defineComponent({
		props: {
			table: String
		},
		data() {
			return {
				show: false,
				name: '',
				id: '',
				loading: true,
				store: useVideoStore()
			}
		},
		methods: {
			async deleted(): Promise<void> {
				try {
					if (this.table === 'videos') {
						await this.store.fetchDelete(this.id)
					}
					this.show = false
					this.loading = false
					this.$emit('delete')
				} catch (error) {
					console.log(error)
					this.loading = false
				}
			},
			showModal(name: string, _id: string): void {
				this.name = name
				this.id = _id
				this.show = true
			}
		}
	})
</script>
../stores/chat.store
