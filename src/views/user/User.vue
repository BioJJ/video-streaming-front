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
									v-model="user.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="10">
								<v-text-field
									v-model="user.name"
									label="name"
									dense
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="user.email"
									label="email"
									readonly
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
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

import { useToast } from 'vue-toastification'
import { User } from '../../models/User'
import { useAuthStore } from '../../stores/auth.store'
import { useUserStore } from '../../stores/user.store'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'User',
	data: () => ({
		formLoading: false,
		user: new User(),
		toast: useToast(),
		store: useUserStore(),
		storeAuth: useAuthStore()
	}),
	mounted(): void {
		this.user = this.storeAuth.getUser
	},
	methods: {
		async submitForm(): Promise<void> {
			this.formLoading = true
			try {
				await this.store.fetchUpdate(this.user)
				this.toast.info('Updated successfully')

				this.formLoading = false
				this.$router.push({ name: 'User' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		}
	}
})
</script>

<style></style>
