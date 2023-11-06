import { EntityBase } from '../services/generic.service'

export class User extends EntityBase {
	name?: string
	email?: string
	password?: string
}
