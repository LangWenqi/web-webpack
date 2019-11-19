export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refresh_token';
export const ID_TOKEN = 'id_token';
export const EXP = 'exp';
// 打开的文件和工作台通信分类
export const OFFICE_HANDLE = {
	RENAME_KEY: 'rename', // 重命名
	NEW_KEY: 'new', // 新建
	READED_KEY: 'readed' // 标记已读
};
// 请求域名
export function GET_BASE_URL () {
	return process.env.NODE_ENV === 'production' ? window.location.origin : 'https://docs.bianfeng.com';
};
// 网站域名
export function GET_WEB_URL () {
	return process.env.NODE_ENV === 'production' ? `${window.location.origin}/` : 'http://192.168.137.22:1024/';
};
// onlyoffice js 文件域名
export function GET_OFFICE_JS_URL () {
	return process.env.NODE_ENV === 'production' ? `${window.location.origin}/ds-vpath/web-apps/apps/api/documents/api.js` : 'https://docs.bianfeng.com/ds-vpath/web-apps/apps/api/documents/api.js';
};
