<template>
	<v-container id="home" class="pa-6" fluid>
		<v-row class="mb-3">
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6"> </v-col>
			<v-col cols="12">
				<v-card class="pa-10 pgc-card-box pgc-card-crud">
					<v-form ref="form" lazy-validation>
						<div class="pgc-crud-header">
							<h2>{{ $route.meta.title }} - Em alta</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-col cols="12">
							<v-slide-group v-model="model" class="pa-4" show-arrows>
								<v-slide-group-item
									v-for="video in pandaVideos.videos"
									:key="video"
									v-slot="{ toggle, selectedClass }"
								>
									<v-card :class="['ma-4', selectedClass]" @click="toggle">
										<div class="d-flex fill-height align-center justify-center">
											<v-scale-transition>
												<v-card class="pt-0 pb-1 px-1 pgc-card-box">
													<v-col cols="6">Titulo: {{ video.title }}</v-col>
													<iframe
														title="Video url"
														width="660"
														height="415"
														:src="video.video_player"
														allowfullscreen
													></iframe>
												</v-card>
											</v-scale-transition>
										</div>
									</v-card>
								</v-slide-group-item>
							</v-slide-group>
						</v-col>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
		<v-row class="mb-3">
			<v-col cols="6">
				<div class="pgc-crud-header">
					<h2>GitHub - Repositories</h2>
					<v-progress-linear
						value="8"
						color="primary"
						background-color="#DDD"
						height="2"
					/>
				</div>
			</v-col>
			<v-col cols="6"> </v-col>

			<v-col cols="6">
				<v-card class="mx-auto" max-width="400">
					<v-img
						class="align-end text-black"
						height="200"
						src="https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667"
						cover
					>
						<v-card-title>video-streaming-back</v-card-title>
					</v-img>

					<v-card-subtitle class="pt-4"> Description </v-card-subtitle>

					<v-card-text>
						<div>Nest framework TypeScript starter repository.</div>

						<div>
							A progressive Node.js framework for building efficient and
							scalable server-side applications.
						</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange">
							<a
								href="https://github.com/BioJJ/video-streaming-back"
								target="_blank"
								>repository</a
							>
						</v-btn>

						<v-btn color="orange">
							<a href="https://github.com/BioJJ" target="_blank">Profile</a>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<v-col cols="6">
				<v-card class="mx-auto" max-width="400">
					<v-img
						class="align-end text-black"
						height="200"
						src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png"
						cover
					>
						<v-card-title>video-streaming-front</v-card-title>
					</v-img>

					<v-card-subtitle class="pt-4"> Description </v-card-subtitle>

					<v-card-text>
						<div>Vue 3 + TypeScript + Vite</div>

						<div>
							This template should help get you started developing with Vue 3
							and TypeScript in Vite. The template uses Vue 3
						</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange">
							<a
								href="https://github.com/BioJJ/video-streaming-front"
								target="_blank"
								>repository</a
							>
						</v-btn>

						<v-btn color="orange">
							<a href="https://github.com/BioJJ" target="_blank">Profile</a>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { useToast } from 'vue-toastification'
	import { PandaVideo } from '../../models/PandaVideo'
	import { usePandaVideoStore } from '../../stores/panda-video.store'

	import Pagination from '../../models/Pagination'

	export default defineComponent({
		name: 'HomeView',
		data: () => ({
			toast: useToast(),
			pandaVideos: [] as unknown as PandaVideo,
			store: usePandaVideoStore(),
			pagination: Pagination.build(),
			model: null
		}),
		mounted(): void {
			this.getVideos()
		},
		methods: {
			async getVideos() {
				try {
					await this.store.fetchAll(this.pagination as any)

					this.pandaVideos = this.store.getVideosList
				} catch (error) {
					this.toast.error('Not found')
				}
			},
			openProfile() {},
			openRepo() {}
		}
	})
</script>
