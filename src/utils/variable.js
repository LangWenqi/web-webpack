export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refresh_token';
export const ID_TOKEN = 'id_token';
export const EXP = 'exp';

// 请求域名
export function GET_BASE_URL () {
	return process.env.NODE_ENV === 'production' ? window.location.origin : 'https://www.baidu.com';
};
// 网站域名
export function GET_WEB_URL () {
	return process.env.NODE_ENV === 'production' ? `${window.location.origin}/` : 'http://192.168.xxx.xx:xxxx/';
};

