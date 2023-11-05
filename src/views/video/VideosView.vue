<template>
	<v-container id="template" class="pa-6" fluid>
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
							<h2>{{ $route.meta.title }} View</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="2">
								<v-text-field
									v-model="video.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="10">
								<v-text-field
									v-model="video.title"
									label="title"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="8">
								<v-text-field
									v-model="video.videoId"
									label="videoId"
									readonly
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-if="video.user"
									v-model="video.user.name"
									readonly
									label="UserName"
									dense
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<iframe
									width="660"
									height="415"
									:src="videoUrl"
									frameborder="0"
									allowfullscreen
								></iframe>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-10">
						<v-btn to="/videos" color="red" outlined class="ml-5 pgc-btn-form">
							Voltar
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useToast } from 'vue-toastification'
import { useVideoStore } from '../../stores/video.store'
import { Video } from '../../models/Video'

export default defineComponent({
	name: 'VideosView',
	data: () => ({
		video: new Video(),
		toast: useToast(),
		store: useVideoStore(),
		videoUrl: null as unknown as string
	}),

	mounted(): void {
		this.$route.params.id && this.getVideos()
	},
	methods: {
		async getVideos() {
			try {
				this.video = await this.store.fetchById(this.$route.params.id)

				const responsePanda = await this.store.fetchUrlById(this.video.videoId)

				this.videoUrl = responsePanda.video_player as string
			} catch (error) {
				this.toast.error('Client not found')
			}
		}
	}
})
</script>
