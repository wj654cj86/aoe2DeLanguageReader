let 路徑檔名 = 語言名稱 => `resources/${語言名稱}/strings/key-value/key-value-strings-utf8.txt`;
let geturl = url2obj();
let 語言s = {
	br: { 名稱: '葡萄牙文' },
	de: { 名稱: '德文' },
	en: { 名稱: '英文' },
	es: { 名稱: '西班牙文' },
	fr: { 名稱: '法文' },

	hi: { 名稱: '印度文' },
	it: { 名稱: '義大利文' },
	jp: { 名稱: '日文' },
	ko: { 名稱: '韓文' },
	ms: { 名稱: '馬來文' },

	mx: { 名稱: '西班牙文-拉丁美洲' },
	pl: { 名稱: 'Polish' },
	ru: { 名稱: '俄文' },
	tr: { 名稱: '土耳其文' },
	tw: { 名稱: '正體中文' },

	vi: { 名稱: '越南文' },
	zh: { 名稱: '簡體中文' }
};
let 有顯示語言 = false;
if (geturl.lang !== undefined) {
	let 語言名稱s = geturl.lang.split(',');
	for (let 語言名稱 of 語言名稱s) {
		if (語言名稱 in 語言s) {
			語言s[語言名稱].顯示 = true;
			有顯示語言 = true;
		}
	}
}
if (!有顯示語言) {
	語言s.en.顯示 = true;
	語言s.tw.顯示 = true;
}

let 對照表 = {};

function 移除註解(內容) {
	let 在引號內 = false;
	let 斜線跳脫 = false;
	let 輸出內容 = '';
	for (let c of 內容) {
		if (c == ' ' && !在引號內) { }
		else if (c == '"' && !在引號內) {
			在引號內 = true;

		} else if (c == '\\' && !斜線跳脫) {
			輸出內容 += c;
			斜線跳脫 = true;
		} else if (c == '"' && !斜線跳脫) {
			break;
		} else {
			輸出內容 += c;
			斜線跳脫 = false;
		}
	}
	return 輸出內容;
}
let 第一列 = document.querySelector('tr');
for (let 語言名稱 in 語言s) {
	if (!語言s[語言名稱].顯示) continue;
	第一列.append(text2html(`<th>${語言s[語言名稱].名稱}</th>`))
	語言s[語言名稱].text = await loadfile('text', 路徑檔名(語言名稱));
	語言s[語言名稱].lines = 語言s[語言名稱].text.replace(/\r\n/g, '\n').split('\n');
	for (let value of 語言s[語言名稱].lines) {
		if (value.length <= 2) continue;
		if (value.substr(0, 2) == '//') continue;
		let 空白位置 = value.search(/\s/);
		let 編號 = value.substr(0, 空白位置);
		let 內容 = value.substr(空白位置);
		if (對照表[編號] === undefined) 對照表[編號] = {};
		對照表[編號][語言名稱] = 移除註解(內容).split('\\n').flatMap(s => [s + '\\n', text2html('<br>')]);
	}
}
let tbody = document.querySelector('tbody');
for (let 編號 in 對照表) {
	let tr = text2html(`<tr><td>${編號.replace(/\_/g, ' ')}</td></tr>`);
	tbody.append(tr);
	for (let 語言名稱 in 語言s) {
		if (!語言s[語言名稱].顯示) continue;
		let 內容 = 對照表[編號][語言名稱] === undefined ? '' : 對照表[編號][語言名稱];
		let td = text2html('<td></td>');
		td.append(...內容);
		tr.append(td);
	}
}