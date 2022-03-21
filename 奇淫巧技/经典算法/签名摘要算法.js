/**
 * 原重庆Netkeeper用户拨号算法（动态变化步进时间为5秒）
 */

class Encryptor {
  constructor(radius = "radius") {
    this.RADIUS = radius;
  }
  getTimec() {
    var zeroDate = new Date(0);
    var nowDate = new Date();
    nowDate -= nowDate.getMilliseconds();
    zeroDate /= 1000;
    nowDate /= 1000;
    var tDate = nowDate - zeroDate;
    var Timec = tDate;
    Timec *= 1717986919;
    Timec /= 4294967296;
    Timec = Math.floor(Timec);
    Timec /= 2;
    Timec = Math.floor(Timec);
    return Timec;
  }
  xkv18(username) {
    this.hexcase = 0;
    this.b64pad = "";
    this.chrsz = 8;
    var LR = "\r\n";
    var timec = this.getTimec();
    var S = new Array(4);
    var t = timec;
    S[3] = t & 0xff;
    S[2] = (t & 0xff00) / 0x100;
    S[1] = (t & 0xff0000) / 0x10000;
    S[0] = (t & 0xff000000) / 0x1000000;
    var s1md5 = new String("");
    for (var i = 0; i < 4; i++) {
      s1md5 += String.fromCharCode(S[i]);
    }
    var S2 = new Array(4);
    S2[3] = S[0];
    S2[2] = S[1];
    S2[1] = S[2];
    S2[0] = S[3];
    var S3 = new Array(4);
    S3[0] = 0;
    S3[1] = 0;
    S3[2] = 0;
    S3[3] = 0;
    var i = 0,
      j = 0,
      k = 0;
    for (i = 0; i < 0x20; i++) {
      j = Math.floor(i / 0x8);
      k = 3 - (i % 0x4);

      S3[k] *= 0x2;

      if (Math.floor(S2[j] % 2) == 1) {
        S3[k]++;
      }
      S2[j] /= 2;
      S2[j] = Math.floor(S2[j]);
    }
    var S4 = new Array(6);
    S4[0] = 0;
    S4[1] = 0;
    S4[2] = 0;
    S4[3] = 0;
    S4[4] = 0;
    S4[5] = 0;
    var t1, t2;
    t1 = S3[3];
    t1 /= 0x4;
    S4[0] = Math.floor(t1);
    t1 = S3[3];
    t1 = t1 & 0x3;
    t1 *= 0x10;
    S4[1] = Math.floor(t1);
    t2 = S3[2];
    t2 /= 0x10;
    t2 = t2 | t1;
    S4[1] = Math.floor(t2);
    t1 = S3[2];
    t1 = t1 & 0x0f;
    t1 *= 0x04;
    S4[2] = Math.floor(t1);
    t2 = S3[1];
    t2 /= 0x40;
    t2 = t2 | t1;
    S4[2] = Math.floor(t2);
    t1 = S3[1];
    t1 = t1 & 0x3f;
    S4[3] = Math.floor(t1);
    t2 = S3[0];
    t2 /= 0x04;
    S4[4] = Math.floor(t2);
    t1 = S3[0];
    t1 = t1 & 0x03;
    t1 *= 0x10;
    S4[5] = Math.floor(t1);
    for (i = 0; i < 6; i++) {
      S4[i] += 0x20;
      if (S4[i] >= 0x40) {
        S4[i]++;
      }
    }
    var sFormatString = new String("");
    for (var i = 0; i < 6; i++) {
      sFormatString += String.fromCharCode(S4[i]);
    }
    // *** 自定义修改：去掉关于@的截取，采用全输入签名 ***
    // var strInput = s1md5 + username.substr(0, username.indexOf('@')) + RADIUS;
    var strInput = s1md5 + username + this.RADIUS;
    // *** 自定义修改：去掉关于@的截取，采用全输入签名 ***
    var sMd5 = this.hex_md5(strInput);
    var sMD5Used = sMd5.substr(0, 2);
    // *** 自定义修改：去掉LR ***
    // var sRealUsername = LR + sFormatString + sMD5Used + username;
    var sRealUsername = this.stringtoHex(sFormatString + sMD5Used);
    // *** 自定义修改：去掉LR ***
    return sRealUsername;
  }
  // json字符串转hex
  stringtoHex(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
      if (val == "") val = str.codePointAt(i).toString(16);
      else val += str.codePointAt(i).toString(16);
    }
    val += "0a";
    return val;
  }
  hex_md5(s) {
    return this.binl2hex(
      this.core_md5(this.str2binl(s), s.length * this.chrsz)
    );
  }
  b64_md5(s) {
    return this.binl2b64(
      this.core_md5(this.str2binl(s), s.length * this.chrsz)
    );
  }
  str_md5(s) {
    return this.binl2str(
      this.core_md5(this.str2binl(s), s.length * this.chrsz)
    );
  }
  hex_hmac_md5(key, data) {
    return this.binl2hex(this.core_hmac_md5(key, data));
  }
  b64_hmac_md5(key, data) {
    return this.binl2b64(this.core_hmac_md5(key, data));
  }
  str_hmac_md5(key, data) {
    return this.binl2str(this.core_hmac_md5(key, data));
  }
  core_md5(x, len) {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = this.safe_add(a, olda);
      b = this.safe_add(b, oldb);
      c = this.safe_add(c, oldc);
      d = this.safe_add(d, oldd);
    }
    return Array(a, b, c, d);
  }
  md5_cmn(q, a, b, x, s, t) {
    return this.safe_add(
      this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s),
      b
    );
  }
  md5_ff(a, b, c, d, x, s, t) {
    return this.md5_cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  md5_gg(a, b, c, d, x, s, t) {
    return this.md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  md5_hh(a, b, c, d, x, s, t) {
    return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  md5_ii(a, b, c, d, x, s, t) {
    return this.md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  core_hmac_md5(key, data) {
    var bkey = this.str2binl(key);
    if (bkey.length > 16) bkey = this.core_md5(bkey, key.length * this.chrsz);
    var ipad = Array(16),
      opad = Array(16);
    for (var i = 0; i < 16; i++) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    var hash = this.core_md5(
      ipad.concat(this.str2binl(data)),
      512 + data.length * this.chrsz
    );
    return this.core_md5(opad.concat(hash), 512 + 128);
  }
  bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  str2binl(str) {
    var bin = Array();
    var mask = (1 << this.chrsz) - 1;
    for (var i = 0; i < str.length * this.chrsz; i += this.chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << i % 32;
    return bin;
  }
  binl2str(bin) {
    var str = "";
    var mask = (1 << this.chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += this.chrsz)
      str += String.fromCharCode((bin[i >> 5] >>> i % 32) & mask);
    return str;
  }
  binl2hex(binarray) {
    var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }
  binl2b64(binarray) {
    var tab =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet =
        (((binarray[i >> 2] >> (8 * (i % 4))) & 0xff) << 16) |
        (((binarray[(i + 1) >> 2] >> (8 * ((i + 1) % 4))) & 0xff) << 8) |
        ((binarray[(i + 2) >> 2] >> (8 * ((i + 2) % 4))) & 0xff);
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32) str += this.b64pad;
        else str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f);
      }
    }
    return str;
  }
}

setInterval(() => {
  const encrypter = new Encryptor();
  // userTag 仅用于标识用户，可以不要
  const userTag = "df30dbc69d66bdc10c1e92eb7ed34a1d";
  // 对数据进行摘要签名
  const signature = encrypter.xkv18(userTag);
  console.log({ signature, userTag });
}, 1000);
