import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "./config";

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

export function cloudinaryUpload(files: FileList | null, cb: (res: { secure_url: string }) => unknown) {
	if (!files) { return; }

	const formData = new FormData();
	[].forEach.call(files, file => formData.append("file", file));
	formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

	fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
		method: "POST",
		body: formData
	})
	.then(res => res.json())
	.then((res) => {
		// console.log(res.url);
		// cb(res.secure_url);
		cb(res);
	}).catch();
}