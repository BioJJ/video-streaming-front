import { EntityBase } from '../services/generic.service'

export class PandaVideo extends EntityBase {
	title?: string
	description?: string | null
	status?: string
	user_id?: string
	folder_id?: string | null
	library_id?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config?: Record<string, any>
	live_id?: boolean
	video_external_id?: string
	converted_at?: Date | null
	created_at?: Date
	updated_at?: Date
	storage_size?: number
	length?: number
	width?: number
	height?: number
	video_player?: string
	video_hls?: string
	pullzone_name?: string
	playable?: boolean
	backup?: boolean
	preview?: string
	thumbnail?: string
	extension?: string
	playback?: string[]
}
