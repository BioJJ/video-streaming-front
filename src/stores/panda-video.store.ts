/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import GenericService from '../services/generic.service'
import { PandaVideo } from '../models/PandaVideo'

const service = new GenericService<PandaVideo>('panda-video')

export const usePandaVideoStore = defineStore('videos', {
	state: () => ({
		videos: [] as unknown as PandaVideo,
		totalItens: 0
	}),
	getters: {
		getVideosList: (state) => {
			return state.videos
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchAll(userId: number): Promise<void> {
			await service.list(userId).then((res) => {
				this.videos = res.data
			})
		},
		async fetchById(id: any): Promise<PandaVideo> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSave(video: PandaVideo): Promise<void> {
			await service.save(video).then((res) => {
				return res.data
			})
		},
		async fetchUpdate(video: PandaVideo): Promise<void> {
			await service.update(video).then((res) => {
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
