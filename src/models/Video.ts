import { EntityBase } from '../services/generic.service'
import { User } from './User'

export class Video extends EntityBase {
	title?: string
	videoId?: string
	status?: boolean
	user?: User

	file?: File
}
