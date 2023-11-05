import api from '../_helpers/axios'
import { Video } from '../models/Video'

export class EntityBase {
	id: number | undefined | string
}

export default class GenericService<T extends EntityBase> {
	endpoint: string = ''

	constructor(recurse: string) {
		this.endpoint = recurse
	}

	save(item: T) {
		return api.post<T>(`/${this.endpoint}`, item)
	}

	update(item: T) {
		return api.put<T>(`/${this.endpoint}/${item.id}`, item)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	list(params: any) {
		if (params.limit < 0) params.limit = 0
		return api.get<T>(`/${this.endpoint}`, { params })
	}

	delete(id: number) {
		return api.delete(`/${this.endpoint}/${id}`)
	}

	findById(id: number) {
		return api.get<T>(`/${this.endpoint}/${id}`)
	}

	findBy(url: string, param: number) {
		return api.get<T>(`/${this.endpoint}/${url}/${param}`)
	}

	post(url: string, body: T) {
		return api.post<T>(`/${this.endpoint}/${url}`, body)
	}

	async saveWithVideo(item: Video) {
		const formData = new FormData()
		formData.append('title', item.title as string)
		formData.append('user', item.user?.id as unknown as string)
		formData.append('video', item.file as File)

		return await api.post<T>(`/${this.endpoint}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}
