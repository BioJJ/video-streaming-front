export function decodeToken(token: string) {
	try {
		return JSON.parse(atob(token.split('.')[1]))
	} catch (e) {
		return null
	}
}
