/*
methods for capturing packages from chosen wifi network
*/
var r = {
	c : require('colors'),
	p : require('ora'),
	m : require('inquirer'),
	s : require('sudo'),
	sh : require('shelljs'),
	pl : require('fast-plist').parse
},
	t = {

	},
	v = {
		wifis : []
	}
;
//shell run
var _run = function(cmd) {
	var _r = r.sh.exec(cmd, { silent:true });
	return { out: _r.stdout, code: _r.code, error: _r.stderr };
};

var capture = {
	init : (cb) => {
		console.log('Wifi Network Password Scanner for Mac'.green);
		// prompts for sudo password and leave it in memory
		r.m.prompt([
			{	type:'password',	
				name:'sudo_pass',	
				message:'Please enter your system\'s password (sudo):'
			}
		]).then(function(answer) {
			v.sudo = answer.sudo_pass;
			cb(false,v.sudo);
		});
	},
	getWifiNetworks : (cb) => {
		// return array of available wifi networks
		// get wifi networks
		t.wifis = _run('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s -x').out;
		// parse with plist
		t.wifis_o = r.pl(t.wifis);
		for (t.cn in t.wifis_o) {
			t.r_info = { 	mac: 		t.wifis_o[t.cn].BSSID,
							power: 		t.wifis_o[t.cn].RSSI,
							name: 		t.wifis_o[t.cn].SSID_STR,
							channel: 	t.wifis_o[t.cn].CHANNEL,
							wps: 		false,
							wep: 		false,
							router: 	{}
						};
			if ('WEP' in t.wifis_o[t.cn]) t.r_info.wep=true;
			if ('WPS_PROB_RESP_IE' in t.wifis_o[t.cn]) {
				t.r_info.wps = true;
				// we have info about the router
				t.r_info.router = {
					brand 	: 	t.wifis_o[t.cn].WPS_PROB_RESP_IE.IE_KEY_WPS_MANUFACTURER,
					model 	: 	t.wifis_o[t.cn].WPS_PROB_RESP_IE.IE_KEY_WPS_MODEL_NAME,
					serial 	: 	t.wifis_o[t.cn].WPS_PROB_RESP_IE.IE_KEY_WPS_SERIAL_NUM
				};
			}
			v.wifis.push(t.r_info);
		}
		cb(false,v.wifis);
		//console.log(v.wifis);
	},
	getNetworkCardAlias : () => {
		// return first network alias usign ifconfig
	},
	captureChannel : channel => {
		// capture packages of given channel (using sudo, into /tmp/)
	}
};

// CLI
capture.init((err,pass) => {
	capture.getWifiNetworks();
	//console.log('llego pass:'+pass);
});
