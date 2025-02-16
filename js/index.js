/*
 *jssdk jsapi所在服务器域名，无需追加'http://'或'https://'
 */
let jssdkconfigUrl = 'isdapp.shandong.gov.cn' // 爱山东测试环境

let jssdkbaseUrl = jssdkconfigUrl + '/jpaas-jags-server/interface/'
var jssdkconfig = {
	urlConfig: {
		/*
		 * 服务配置项
		 */
		urldomain: jssdkconfigUrl + '/jmopenpub/jmopen_files/js',
		baseUrl: jssdkbaseUrl,
		urldomaincreatesign: jssdkbaseUrl + 'createsign',
		urldomaingateway: jssdkbaseUrl + 'gateway',

		/*
		 * 埋点配置项
		 */
		app_id: 'jmopennzjk', //appid参数
		interface_id: 'getAppStatisticsSecret', // 上报统计数据参数
		interface_id_ua: 'checkUaAvailability' // ua判断参数
	}
}

// var urldomain = '192.168.160.127:5502'
var urldomain = jssdkconfig.urlConfig.urldomain
// var urldomain = "wfw.isdapp.shandong.gov.cn/jssdkhql"
var urldomaincreatesign = jssdkconfig.urlConfig.urldomaincreatesign
var urldomaingateway = jssdkconfig.urlConfig.urldomaingateway

var flySrc = urldomain + '/jssdk/fly.js'
var sUserAgent = navigator.userAgent.toLowerCase()
var bIsGftApp = sUserAgent.indexOf('hanweb_gft') > -1 || sUserAgent.indexOf('ganfutong_ios') > -1

function containerType() {
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
	var bIsApp = sUserAgent.indexOf('hanweb') > -1
	var bIsdingding = sUserAgent.indexOf('dingtalk') > -1
	var bIsWechat = sUserAgent.indexOf('micromessenger') > -1
	var bIsWechatMini = sUserAgent.indexOf('miniprogram') > -1
	var bIsAlipay = sUserAgent.indexOf('alipayclient') > -1
	var bIsHarmony = sUserAgent.indexOf("hanweb-harmony") > -1

	if (bIsHarmony) {
		return "harmony"
	} else if (bIsApp) {
		return "hanweb"
	} else if (bIsGftApp) {
		return "hanweb"
	} else if (bIsWechat) {
		if (bIsWechatMini) {
			return "wechatMini"
		}
		return "wechat"
	} else if (bIsAlipay) {
		return "Alipay"
	} else if (bIsdingding) {
		return "dingtalk"
	} else {
		return "web"
	}
}
var container = containerType()
var tmpTag = 'https:' == document.location.protocol ? true : false
// var tmpTag = true

// 公用js文件写入
// ua判断 及 应用埋点 js写入
if (tmpTag) {
	document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/md5.js"></script>')
	document.write('<script type="text/javascript" src="https://' + flySrc + '"></script>')
	document.write('<script type="text/javascript" src="https://' + urldomain +
		'/jssdk/AnalyticsJs/sendAnalytics.js"></script>')
} else {
	document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/md5.js"></script>')
	document.write('<script type="text/javascript" src="http://' + flySrc + '"></script>')
	document.write('<script type="text/javascript" src="http://' + urldomain +
		'/jssdk/AnalyticsJs/sendAnalytics.js"></script>')
}
if (bIsGftApp) {
	//	localStorage.setItem("gft_user", "");
	document.write(
		'<script type="text/javascript" src="https://ganfutong.jiangxi.gov.cn/jmopen/webapp/html5/gftAPI/hanwebAPI-2.0.0.min.js"></script>'
	)
} else {
	if (tmpTag == true) {
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/aes.js"></script>')
	} else {
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/aes.js"></script>')
	}
}

if (container == 'harmony') {
	// 鸿蒙判断代码
	if (tmpTag == true) {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="https://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/js/harmonyOS.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/harmonyjs/indexnew.js"></script>')
	} else {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="http://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/js/harmonyOS.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/harmonyjs/indexnew.js"></script>')
	}

} else if (container == 'hanweb') {
	if (tmpTag == true) {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="https://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/js/indexnew.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/jmportal_SDK.js"></script>')
	} else {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="http://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/js/indexnew.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/jmportal_SDK.js"></script>')
	}

} else if (container == 'wechatMini') {

	if (tmpTag == true) {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="https://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>')
		// document.write('<script src="https://cdn.bootcss.com/qs/6.5.1/qs.min.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/wechat_mini/qs.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/wechat_mini/aes.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/wechat_mini/newsm2.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/wechat_mini/indexnew.js"></script>')

	} else {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="http://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>')
		// document.write('<script src="https://cdn.bootcss.com/qs/6.5.1/qs.min.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/wechat_mini/qs.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain +
			'/jssdk/wechat_mini/aes.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain +
			'/jssdk/wechat_mini/newsm2.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain +
			'/jssdk/wechat_mini/indexnew.js"></script>')
	}

} else if (container == 'wechat') {

	if (tmpTag == true) {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="https://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>')
		// document.write(
		// 	'<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=cL8AUF5vdmRtXC1cjgq2XjjS"></script>'
		// )
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/alipayjs/aes.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/alipayjs/pad-nopadding.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/wechatjs/indexnew.js"></script>')

	} else {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="http://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		// document.write(
		// 	'<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=cL8AUF5vdmRtXC1cjgq2XjjS"></script>'
		// )
		document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/aes.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain +
			'/jssdk/alipayjs/pad-nopadding.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain +
			'/jssdk/wechatjs/indexnew.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/md5.js"></script>')
	}

} else if (container == 'dingtalk') {
	if (tmpTag == true) {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="https://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/sha1.js"></script>')
		// document.write(
		// 	'<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry"></script>'
		// )
	} else {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="http://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/sha1.js"></script>')
		// document.write(
		// 	'<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry"></script>'
		// )
	}

} else if (container == 'Alipay') {
	document.write('<script type="text/javascript" src="//' + urldomain +
		'/jssdk/jquery-1.8.3.min.js"></script>')
	document.write(
		'<script type="text/javascript" src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script>'
	)
	document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>')
	// document.write(
	// 	'<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry"></script>'
	// )
	document.write('<script type="text/javascript" src="//' + urldomain + '/jssdk/alipayjs/aes.js"></script>')
	document.write('<script type="text/javascript" src="//' + urldomain + '/jssdk/sha1.js"></script>')
	document.write('<script type="text/javascript" src="//' + urldomain +
		'/jssdk/alipayjs/pad-nopadding.js"></script>')
	document.write('<script type="text/javascript" src="//' + urldomain +
		'/jssdk/alipayjs/indexnew.js"></script>')
} else {
	if (tmpTag == true) {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="https://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="https://' + urldomain +
			'/jssdk/wechatjs/brower.js"></script>')
	} else {
		if (typeof $ == 'undefined') {
			document.write('<script type="text/javascript" src="http://' + urldomain +
				'/jssdk/jquery-1.8.3.min.js"></script>')
		}
		document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/sha1.js"></script>')
		document.write('<script type="text/javascript" src="http://' + urldomain +
			'/jssdk/wechatjs/brower.js"></script>')
	}
}

/*
 * 网关验签接口
 * appid应用唯一标识
 * interfaceid接口唯一标识
 * interfacecontent接口参数,请使用json格式, 例如:{"siteid":"2","cateid":"1"}
 * fromport端口来源"0"：PC；"1"：APP；"2"：支付宝；"3"：微信
 * signurl签名接口地址
 * gatewayurl网关接口地址
 * extraData 额外参数,附件,请求头一类的参数
 */
function vaildInterface(appid, interfaceid, interfacecontent, fromport = '2', extraData = {}) {
	return new Promise(async function (resolve, reject) {
		'string' === typeof extraData && (extraData = {})

		// 获取额外参数
		let {
			fileList,
			header
		} = extraData

		const defaultDomainUrl = 'https://web1.isdapp.shandong.gov.cn'

		// 获取当前客户端版本
		let currentClientVersion = await new Promise((resolve) => {
			if (lightAppJssdk
				&& lightAppJssdk.device
				&& lightAppJssdk.device.version
				&& container != 'Alipay'
			) {
				lightAppJssdk.device.version({
					version: '',
					success: function (data) {
						resolve(data)
					},
					fail: function (data) {
						resolve('4.0.0')
					}
				})
			}
			else {
				if (container == 'Alipay') {
					resolve('5.0.0')
				} else {
					resolve('4.0.0')
				}
			}
		})

		// 获取分发的网关域名
		let domainUrl = await new Promise((resolve) => {
			if (lightAppJssdk
				&& lightAppJssdk.device
				&& lightAppJssdk.device.getCurrentDomainUrl
				&& Number(currentClientVersion.replace(/\./g, '')) >= 500
				&& container != 'Alipay'
			) {
				lightAppJssdk.device.getCurrentDomainUrl({
					success: function (data) {
						resolve(data + '/jpaas-jags-web-server/interface/gateway')
					},
					fail: function (data) {
						resolve(defaultDomainUrl + '/jpaas-jags-web-server/interface/gateway')
					}
				})
			} else {
				if (container == 'Alipay') {
					let currentHost = window.location.host,
						currentProtocol = window.location.protocol,
						currentDomainUrl = currentProtocol + '//' + currentHost,
						host5Arr = [
							'web1.isdapp.shandong.gov.cn',
							'web2.isdapp.shandong.gov.cn',
							'web3.isdapp.shandong.gov.cn',
							'web4.isdapp.shandong.gov.cn',
						],
						host4Arr = ['isdapp.shandong.gov.cn']

					if (host5Arr.includes(currentHost)) {
						resolve(currentDomainUrl + '/jpaas-jags-web-server/interface/gateway')
					}

					else if (host4Arr.includes(currentHost)) {
						resolve(currentDomainUrl + '/jpaas-jags-server/interface/gateway')
					}

					else {
						resolve(defaultDomainUrl + '/jpaas-jags-web-server/interface/gateway')
					}
				}

				else {
					// 当前版本非30w平台客户端版本,依旧返回线上的爱山东网关地址
					resolve('https://isdapp.shandong.gov.cn/jpaas-jags-server/interface/gateway')
				}
			}
		})

		const datestr = (new Date()).valueOf()
		let fdDqtq = new FormData()
		fdDqtq.append('app_id', appid)
		fdDqtq.append('interface_id', interfaceid)
		fdDqtq.append('version', '1.0')
		fdDqtq.append('biz_content', interfacecontent)
		fdDqtq.append('charset', 'utf-8')
		fdDqtq.append('timestamp', datestr)
		fdDqtq.append('origin', fromport)
		fdDqtq.append('sign', 'signResult')

		// 附件
		let fileListType = ''
		if (typeof Array.isArray === 'function') {
			fileListType = Array.isArray(fileList)
		} else {
			fileListType = Object.prototype.toString.call(fileList) === "[object Array]"
		}
		if (fileListType) {
			fileList.forEach(ele => {
				let {
					fileName,
					file
				} = ele
				if (fileName && file) {
					fdDqtq.append(fileName, file)
				}
			})
		}

		// 请求头
		if (header) {
			if (typeof header !== 'string') {
				try {
					header = JSON.stringify(header)
				} catch (error) {

				} finally {
					fdDqtq.append('header', header)
				}
			} else {
				fdDqtq.append('header', header)
			}
		}

		$.ajax({
			url: domainUrl,
			type: 'post',
			dataType: 'json',
			data: fdDqtq,
			contentType: false, // 注意这里应设为false
			processData: false,
			cache: false,
			success: function (data) {
				if (data == null || data == undefined || data == '') {
					reject(false)
				} else {
					var gateWayResult = data.data
					resolve(gateWayResult)
				}
			},
			error: function (data) {
				reject(false)
			}
		})
	})
}

//扩展带请求头方法,headers必填参数
function vaildInterfaceWithHeaders(appid, interfaceid, interfacecontent, fromport, headers, signurl, gatewayurl) {
	return new Promise(function (resolve, reject) {
		var datestr = (new Date()).valueOf()
		var param = {
			"app_id": appid,
			"interface_id": interfaceid,
			"version": "1.0",
			"biz_content": interfacecontent,
			"charset": "utf-8",
			"timestamp": datestr,
			"origin": fromport,
			"sign": 'signResult',
			"header": headers
		}

		$.ajax({
			url: "https://" + urldomaingateway,
			type: 'post',
			dataType: 'json',
			data: param,
			success: function (data) {
				if (data == null || data == undefined || data == '') {
					reject(false)
				} else {
					var gateWayResult = data.data
					resolve(gateWayResult)
				}
			},
			error: function (data) {
				reject(false)
			}
		})
	})
}

async function vaildInterfacefn(appid, interfaceid, interfacecontent, fromport, extraData = {}) {
	var returnData = await vaildInterface(appid, interfaceid, interfacecontent, fromport, extraData)
	return returnData
}

async function vaildInterfaceWithHeadersfn(appid, interfaceid, interfacecontent, fromport, headers, signurl, gatewayurl) {
	var returnData = await vaildInterfaceWithHeaders(appid, interfaceid, interfacecontent, fromport, headers,
		signurl, gatewayurl)
	return returnData
}

//调用方式验证网关接口
//vaildInterfacefn().then(value => {
//	var data = value
//})

// vaildInterfaceWithHeadersfn().then(value => {
// 	var data = value
// })