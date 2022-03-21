// hex转json字符串,16进制ASCII
var hextoString = function (hex: string) {
  var arr = hex.split("");
  var out = "";
  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = new Number("0x" + arr[i * 2] + arr[i * 2 + 1]).valueOf();
    var charValue = String.fromCodePoint(tmp);
    out += charValue;
  }
  return out;
};

// json字符串转hex
var stringtoHex = function (str: string) {
  var val = "";
  for (var i = 0; i < str.length; i++) {
    if (val == "") val = str.codePointAt(i).toString(16);
    else val += str.codePointAt(i).toString(16);
  }
  val += "0a";
  return val;
};
