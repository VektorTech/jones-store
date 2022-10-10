export function setCookie(key: string, value: string, days: number) {
	const expires = new Date();
	expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
	document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

export function getCookie(key: string) {
	const keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
	return keyValue ? keyValue[2] : null;
}

export function eraseCookie(key: string) {
	const keyValue = getCookie(key);
	setCookie(key, keyValue || "", -1);
}