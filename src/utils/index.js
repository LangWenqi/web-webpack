/**
 * @description: make utf16 to utf8
 * @param { String } str | utf16
 * @return { String } utf8
 */

export function utf16toEntities (str) {
    if (!str) {
        return str;
    }
    let patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    // 检测utf16字符正则
    str = str.replace(patt, function (char) {
        let H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0);
            // 取出高位
            L = char.charCodeAt(1);
            // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
            // 转换算法
            return '&#' + code + ';';
        } else {
            return char;
        }
    });
    return str;
}

/**
 * @description: make utf8 to utf16
 * @param { String } str | utf8
 * @return { String } utf16
 */

export function entitiestoUtf16 (str) {
    if (!str) {
        return '';
    }
    // 检测出形如&#12345;形式的字符串
    let strObj = utf16toEntities(str);
    let patt = /&#\d+;/g;
    let H, L, code;
    let arr = strObj.match(patt) || [];
    for (let i = 0; i < arr.length; i++) {
        code = arr[i];
        code = code.replace('&#', '').replace(';', '');
        // 高位
        H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
        // 低位
        L = (code - 0x10000) % 0x400 + 0xDC00;
        code = '&#' + code + ';';
        let s = String.fromCharCode(H, L);
        strObj = strObj.replace(code, s);
    }
    return strObj;
}

/**
 * @description: make form string to html string
 * @param { String } str | form string
 * @return { String } html string
 */

export function getHtmlData (str) {
    if (!str) {
        return '';
    }
    const newStr = entitiestoUtf16(str).replace('<', '&lt;').replace('>', '&gt;').replace(/\n|\r\n/g, '<br>').replace(/[ ]/g, '&nbsp;');
    return newStr;
}

/**
 * @description: check form submit of phone
 * @param { String } phone | form string
 * @return { Boolean } result
 */

export function checkPhone (phone) {
    const reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/;
    return reg.test(phone);
}

/**
 * @description: check form submit of string exclude emoji or '' or ! or string.trim() === ''
 * @param { String } str
 * @return { Boolean } result
 */

export function checkExpression (str) {
    const emoji = /[\ud800-\udbff][\udc00-\udfff]/;
    //   let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if ((!str) || emoji.test(str) || (str.trim() === '')) {
        return false;
    }
    return true;
}

/**
 * @description: check form submit of mobile
 * @param { String } mobile | form string
 * @return { Boolean } result
 */

export function checkMobile (mobile) {
    let reg = /^1[0-9]{10}$/;
    return reg.test(mobile);
}

/**
 * @description: get img's src in rich text
 * @param { String } strs | rich text
 * @return { Array } img's src
 */

export function getHtmlImg (strs) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = [];
    if (strs && strs.trim()) {
        arr = strs.match(imgReg);
    }
    console.log('所有已成功匹配图片的数组：' + arr);
    let arrSrc = [];
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            let src = arr[i].match(srcReg);
            // 获取图片地址
            if (src[1]) {
                arrSrc.push(src[1]);
            }
        }
    }
    return arrSrc;
}

/**
 * @description: get BytesLength of string
 * @param { String } strs
 * @return { Number } BytesLength
 */

// export function getBytesLength (str) {
//     // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
//     return str.replace(/[^\x00-\xff]/g, 'xx').length;
// }

/**
 * @description: judge if integer and positive number
 * @param { String } strs
 * @return { Boolean } result
 */

export function isInteger (str) {
    var reg = /^\+?[1-9]\d*$/;
    return reg.test(str);
}

/**
 * @author: langwenqi
 * @description: judge if positive number
 * @param { String } strs
 * @return { Boolean } result
 */

export function isPositiveNumber (str) {
    var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    return reg.test(str);
}

/**
 * @description: accurate multiplication
 * @param { Number } cent | multiplier
 * @param { Number } per | multiplier
 * @return { Number } the result of accurate multiplication
 */

export function mul (arg1 = 0, arg2 = 0) {
    let m = 0;
		let s1 = arg1.toString();
		let s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

/**
 * @description: accurate division
 * @param { Number } cent | dividend
 * @param { Number } per | divisor
 * @return { Number } the result of accurate division
 */

export function div (arg1 = 0, arg2 = 1) {
		let t1 = 0;
		let t2 = 0;
		let r1;
		let r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * @description: change txt to '' exclude Chinese,English and Number
 * @param { String } txt
 * @return { String } result
 */

export function changeTxt (txt) {
    return txt.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
}

/**
 * @description: dateFormat
 * @param { DateObject, String } dateObj
 * @return { String } dateFormat
 */

export function dateFormat (dateObj, format) {
    if (!dateObj) return '';
    let date = dateObj;
    if (typeof dateObj !== 'number') {
        date = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
        date = date.slice(0, dateObj.indexOf('.'));
    }
    var o = {
        'y+': new Date(date).getFullYear(),
        'M+': new Date(date).getMonth() + 1,
        'd+': new Date(date).getDate(),
        'h+': new Date(date).getHours(),
        'm+': new Date(date).getMinutes(),
        's+': new Date(date).getSeconds()
    };
    if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1
			, (new Date(date).getFullYear() + '').substr(4 - RegExp.$1.length));
		}
    for (var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1,
            RegExp.$1.length === 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
    return format;
}
/**
 * @description: 闭包节流函数方法（可传参数）
 * @param { Function } fn 延时调用函数
 * @param { Number } delay 延迟多长时间
 * @return { Function } 延迟执行的方法
 */
export function throttle (self, fn, delay = 300) {
    let timer = null;
    return function () {
			var args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
					fn.apply(self, args);
			}, delay);
    };
};
/**
 * @description: 字节大小转换
 * @param { Number } size 字节大小
 * @return { String } result 转换之后字符串
 */
export function getFileSize (size) {
		if (!size) return '';
		const num = 1024.00;
		if (size < num) {
			return size + ' B';
		} else if (size < Math.pow(num, 2)) {
			return (size / num).toFixed(2) + ' K';
		} else if (size < Math.pow(num, 3)) {
			return (size / Math.pow(num, 2)).toFixed(2) + ' M';
		} else if (size < Math.pow(num, 4)) {
			return (size / Math.pow(num, 3)).toFixed(2) + ' G';
		} else {
			return (size / Math.pow(num, 4)).toFixed(2) + ' T';
		}
}
/**
 * @description: 多页面通信
 * @param { String } key localStorage key
 * @param { Object } data 传递数据
 */
export function postStorageMessage (key = '', data = {}) {
	localStorage.setItem(key, JSON.stringify({ data, version: new Date().getTime() }));
}
/**
 * @description: 判断访问终端
 */

export const browser = {
	versions: (function () {
			let u = navigator.userAgent;
			// let app = navigator.appVersion;
			return {
					trident: u.indexOf('Trident') > -1,	// IE内核
					presto: u.indexOf('Presto') > -1, // opera内核
					webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, // 是否iPad
					webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
					weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
					qq: u.match(/\sQQ/i) === 'qq' // 是否QQ
			};
	})(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
