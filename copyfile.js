import fs from 'fs';
let 原始路徑 = 語言名稱 => `D:/Steam/steamapps/common/AoE2DE/resources/${語言名稱}/strings/key-value/key-value-strings-utf8.txt`;
let 路徑檔名 = 語言名稱 => `resources/${語言名稱}/strings/key-value/key-value-strings-utf8.txt`;
let 語言s = {
	br: {},
	de: {},
	en: {},
	es: {},
	fr: {},

	hi: {},
	it: {},
	jp: {},
	ko: {},
	ms: {},

	mx: {},
	pl: {},
	ru: {},
	tr: {},
	tw: {},

	vi: {},
	zh: {}
};

for (let 語言名稱 in 語言s) {
	fs.copyFile(原始路徑(語言名稱), 路徑檔名(語言名稱), err => { if (err) throw err; });
}