/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import GenericService from '../services/generic.service'
import { User } from '../models/User'

const service = new GenericService<User>('users')

export const useUserStore = defineStore('Users', {
	state: () => ({
		user: [] as unknown as User,
		totalItens: 0
	}),
	getters: {
		getUsersList: (state) => {
			return state.user
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchAll(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.user = res.data
				// this.totalItens = res.data
			})
		},
		async fetchById(id: any): Promise<User> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSave(user: User): Promise<void> {
			await service.save(user).then((res) => {
				return res.data
			})
		},
		async fetchUpdate(user: User): Promise<void> {
			await service.update(user).then((res) => {
				return res.data
			})
		},
		async fetchDelete(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		}
	}
})
