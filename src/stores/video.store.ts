/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { Video } from '../models/Video'
import GenericService from '../services/generic.service'
import { PandaVideo } from '../models/PandaVideo'

const service = new GenericService<Video>('videos')
const servicePanda = new GenericService<PandaVideo>('panda-video')

export const useVideoStore = defineStore('videos', {
	state: () => ({
		videos: [] as unknown as Video,
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
			await service.findBy('user', userId).then((res) => {
				this.videos = res.data
				// this.totalItens = res.data
			})
		},
		async fetchById(id: any): Promise<Video> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSave(video: Video): Promise<void> {
			await service.saveWithVideo(video).then((res) => {
				return res.data
			})
		},
		async fetchUpdate(video: Video): Promise<void> {
			await service.update(video).then((res) => {
				return res.data
			})
		},
		async fetchDelete(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		},
		async fetchUrlById(videoId: any): Promise<PandaVideo> {
			return await servicePanda.findById(videoId).then((res) => {
				return res.data
			})
		}
	}
})
