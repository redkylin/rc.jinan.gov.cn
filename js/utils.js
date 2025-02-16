function containerType() {
    var sUserAgent = navigator.userAgent.toLowerCase()
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
    var bIsApp = sUserAgent.indexOf('hanweb') > -1
    var bIsdingding = sUserAgent.indexOf('dingtalk') > -1
    var bIsWechat = sUserAgent.indexOf('micromessenger') > -1
    var bIsWechatMini = sUserAgent.indexOf('miniprogram') > -1
    var bIsAlipay = sUserAgent.indexOf('alipayclient') > -1
    if(bIsApp) {
        return "hanweb"
    } else if(bIsWechat) {
        if(bIsWechatMini) {
            return "wechatMini" //爱山东微信小程序
        }
        return "wechat"
    } else if(bIsAlipay) {
        return "Alipay" //爱山东支付宝小程序
    } else if(bIsdingding) {
        return "dingtalk"
    } else {
        return "web"
    }
}
function isWechat(){
    var type = containerType();
    return type == 'wechat';
}

function isApp() {
	return containerType() === 'hanweb'
}

window._close = lightAppJssdk.navigation.close
const originalAlert = window.alert
const originalConfirm = window.confirm

window.alert = function(msg, onOk) {
	if (!isApp()) {
		originalAlert(msg)
		if (onOk && typeof onOk === 'function') {
			onOk()
		}
	} else {
		// 爱山东 notification.alert
		lightAppJssdk.notification.alert ({
			message: msg, 
			title: "爱山东",//可传空
			buttonName: "确定", 
			success:function(data){
				if (onOk && typeof onOk === 'function') {
					onOk()
				}
			},
			fail:function(data){}
		});
	}
}
window.confirm = function(msg, onOk, onCancel) {
	if (!isApp()) {
		if (originalConfirm(msg)) {
			onOk()
		} else {
			onCancel()
		}
	} else {
		// 爱山东 notification.alert
		lightAppJssdk.notification.confirm ({
			message: msg, 
			title: "爱山东", 
			buttonLabels: ['确定', '取消'], 
			success:function(data){
				if (JSON.parse(data).buttonIndex == 1) {
					if (onOk && typeof onOk === 'function') {
						onOk()
					}
				}else{
					if (onCancel && typeof onCancel === 'function') {
						onCancel()
					}
				}
			},fail:function(data){ //错误返回
				onCancel()
			}
		});
	}
}
