<template>
	<v-container id="client" class="pa-6" fluid>
		<v-row>
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6"></v-col>
			<v-col cols="12">
				<v-card class="pa-10 pgc-card-box pgc-card-crud">
					<v-form ref="form" lazy-validation>
						<div class="pgc-crud-header">
							<h2>{{ $route.meta.title }}</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="12">
								<v-text-field
									v-model="form.title"
									:rules="validators.title"
									label="Title"
									dense
								></v-text-field>
							</v-col>
						</v-row>

						<v-row v-if="!form.id" class="pgc-form-row">
							<v-col cols="12">
								<input
									type="file"
									@change="handleFileUpload"
									accept="video/*"
								/>
							</v-col>
						</v-row>
					</v-form>

					<div class="d-flex justify-start mt-15">
						<v-btn
							@click="cancel"
							color="red"
							outlined
							class="ml-5 pgc-btn-form"
						>
							Cancel
						</v-btn>
						<v-btn
							@click="resetForm"
							color="warning"
							outlined
							class="ml-5 pgc-btn-form"
						>
							Clean
						</v-btn>
						<v-btn
							@click="submitForm"
							:loading="formLoading"
							color="primary"
							class="ml-5 pgc-btn-form"
						>
							<v-icon small class="mr-1">mdi-content-save</v-icon> Save
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Validator } from '../../_helpers/validators'
import { useToast } from 'vue-toastification'
import { useVideoStore } from '../../stores/video.store'
import { useAuthStore } from '../../stores/auth.store'
import { User } from '../../models/User'
import { Video } from '../../models/Video'

export default defineComponent({
	name: 'VideosForm',
	data: () => ({
		formLoading: false,
		validators: {
			title: [Validator.required()]
		},
		video: null as unknown as Video,
		form: new Video(),
		toast: useToast(),
		store: useVideoStore(),
		storeUser: useAuthStore(),
		user: null as unknown as User
	}),

	mounted(): void {
		this.$route.params.id && this.getVideos()
		this.user = this.storeUser.getUser
	},
	methods: {
		cancel(): void {
			this.$router.push({ name: 'Videos' })
		},
		async getVideos() {
			try {
				this.video = await this.store.fetchById(this.$route.params.id)
				this.form = this.video
			} catch (error) {
				this.toast.error('Not found')
			}
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		handleFileUpload(event: any) {
			const file = event.target.files[0]
			if (file) {
				this.form.file = event.target.files[0]
			}
		},

		async submitForm(): Promise<void> {
			this.formLoading = true
			this.form.user = this.user
			try {
				if (this.$route.params.id) {
					await this.store.fetchUpdate(this.form)
					this.toast.info('Updated successfully')
				} else {
					console.log(this.form)
					await this.store.fetchSave(this.form)
					this.toast.success('Saved successfully')
				}
				this.formLoading = false
				this.$router.push({ name: 'Videos' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},

		resetForm() {
			if (this.video) {
				this.getVideos()
			} else {
				this.form = {
					title: '',
					status: true,
					id: undefined
				}
			}
		}
	}
})
</script>

<style scoped></style>
