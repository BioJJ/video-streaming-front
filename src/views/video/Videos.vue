<template>
	<v-container id="template" class="pa-6" fluid>
		<delete-modal @delete="deleteClient" ref="DeleteModal" :table="'chat'" />

		<v-row class="mb-3">
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6">
				<v-btn to="/videos/create" elevation="1" class="btn-create-title">
					<v-icon class="mr-1">mdi-plus</v-icon>
					New Video
				</v-btn>
			</v-col>

			<v-col cols="12">
				<v-card class="pt-10 pb-7 px-6 pgc-card-box">
					<v-row>
						<v-col cols="6">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								label="Search"
								single-line
								hide-details
							></v-text-field>
						</v-col>

						<v-col cols="3">
							<v-btn
								elevation="1"
								color="bluesky"
								style="color: #000; transform: translateY(6px)"
								large
								@click="performSearch"
							>
								Search
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="py-3 px-6 pgc-card-box">
					<v-data-table
						:headers="headers"
						:items="videos"
						class="pgc-table"
						:search="search"
						v-model:page="page"
						:items-per-page="itemsPerPage"
						:total-items="pageCount * itemsPerPage"
					>
						<template v-slot:item.actions="{ item }">
							<table-action
								@delete="deleteModal(item.title, item.id)"
								route="videos"
								:item="item"
							/>
						</template>
					</v-data-table>
					<v-spacer></v-spacer>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	import TableAction from '../../components/TableAction.vue'
	import DeleteModal from '../../components/DeleteModal.vue'

	import { VDataTable } from 'vuetify/labs/VDataTable'
	import { useToast } from 'vue-toastification'

	import Pagination from '../../models/Pagination'
	import { Video } from '../../models/Video'
	import { useVideoStore } from '../../stores/video.store'
	import { User } from '../../models/User'
	import { useAuthStore } from '../../stores/auth.store'

	export default defineComponent({
		// eslint-disable-next-line vue/multi-word-component-names
		name: 'Videos',
		components: {
			TableAction,
			DeleteModal,
			VDataTable
		},
		data() {
			return {
				toast: useToast(),
				store: useVideoStore(),
				pagination: Pagination.build(),
				search: '',
				page: 1,
				pageCount: 0,
				itemsPerPage: 10,
				videos: [] as unknown as Video,
				headers: [
					{ title: 'Id', align: 'start', value: 'id', key: 'id' },
					{ title: 'title', align: 'start', value: 'title', key: 'title' },
					{
						title: 'videoId',
						align: 'start',
						value: 'videoId',
						key: 'videoId'
					},
					{ title: 'Actions', key: 'actions', sortable: false }
				],
				storeUser: useAuthStore(),
				user: null as unknown as User
			}
		},
		mounted() {
			this.user = this.storeUser.getUser
			this.getVideos()
		},
		methods: {
			async getVideos() {
				await this.store.fetchAll(this.user.id as number)
				this.videos = this.store.getVideosList
				this.itemsPerPage = this.store.getTotalItens
			},
			deleteModal(name: string, id: string) {
				const deleteModal = this.$refs.DeleteModal as any
				deleteModal.showModal(name, id)
			},
			deleteClient() {
				this.toast.success('Deleted successfully')
				this.getVideos()
			},
			performSearch() {}
		}
	})
</script>
