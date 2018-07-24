# String

### camelCase

_.camelCase([string=''])

将字符串转为驼峰样式

### capitalize

_.capitalize([string=''])

转换为首字母大写

### deburr

将带有音标的字符集转为普通拉丁文

### endsWith

_.endsWith([string=''], [target], [position=string.length])

检查字符串是否以给定的目标字符串结尾

	_.endsWith('abc', 'c');
	// => true
	 
	_.endsWith('abc', 'b');
	// => false
	 
	_.endsWith('abc', 'b', 2);
	// => true

### startsWith

_.startsWith([string=''], [target], [position=0])

检查字符串是否以给定的目标字符串开始

	_.startsWith('abc', 'a');
	// => true
	 
	_.startsWith('abc', 'b');
	// => false
	 
	_.startsWith('abc', 'b', 1);
	// => true

### escape

_.escape([string=''])

函数将会转换HTML实体，减少XSS的发生

	_.escape('fred, barney, & pebbles');
	// => 'fred, barney, &amp; pebbles'

### unescape

还原escape转义的HTML实体

### escapeRegExp

Escapes the RegExp special characters "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|" in string.

转义正则表达式的特殊字符

	_.escapeRegExp('[lodash](https://lodash.com/)');
	// => '\[lodash\]\(https://lodash\.com/\)'

### kebabCase

将字符串转为中划线格式

	_.kebabCase('Foo Bar');
	// => 'foo-bar'
	 
	_.kebabCase('fooBar');
	// => 'foo-bar'
	 
	_.kebabCase('__FOO_BAR__');
	// => 'foo-bar'

### lowerCase

转换为小写字母

	_.lowerCase('--Foo-Bar--');
	// => 'foo bar'
	 
	_.lowerCase('fooBar');
	// => 'foo bar'
	 
	_.lowerCase('__FOO_BAR__');
	// => 'foo bar'

### lowerFirst

首字母小写

	_.lowerFirst('Fred');
	// => 'fred'
	 
	_.lowerFirst('FRED');
	// => 'fRED'

### pad

_.pad([string=''], [length=0], [chars=' '])

在字符串左右两侧填充目标字符串，先右再左，如果发生填充长度不足，则采取截断的方式进行填充

	_.pad('abc', 8);
	// => '  abc   '
	 
	_.pad('abc', 8, '_-');
	// => '_-abc_-_'
	 
	_.pad('abc', 3);
	// => 'abc'

### padEnd

_.padEnd([string=''], [length=0], [chars=' '])

在右侧填充，方式与pad一致

### padStart

左侧填充，方式一致

### parseInt

_.parseInt(string, [radix=10])

整数解析，第二个参数为进制

### repeat

_.repeat([string=''], [n=1])

	_.repeat('*', 3);
	// => '***'
	 
	_.repeat('abc', 2);
	// => 'abcabc'

### replace

_.replace([string=''], pattern, replacement)

字符串替换，支持正则表达式

### snakeCase

_.snakeCase([string=''])

转为下划线格式

	_.snakeCase('Foo Bar');
	// => 'foo_bar'
	 
	_.snakeCase('fooBar');
	// => 'foo_bar'
	 
	_.snakeCase('--FOO-BAR--');
	// => 'foo_bar'

### split

_.split([string=''], separator, [limit])

字符串分割函数,参数表：字符串，分隔符，返回限制数

	_.split('a-b-c', '-', 2);
	// => ['a', 'b']

### startCase

将字符串转换为start case.模式

	_.startCase('--foo-bar--');
	// => 'Foo Bar'
	 
	_.startCase('fooBar');
	// => 'Foo Bar'
	 
	_.startCase('__FOO_BAR__');
	// => 'FOO BAR'

### toLower

转小写

### toUpper

转大写

### trim

_.trim([string=''], [chars=whitespace])

去除头尾的多余字符，可以自定义去除的字符

	_.trim('  abc  ');
	// => 'abc'
	 
	_.trim('-_-abc-_-', '_-');
	// => 'abc'
	 
	_.map(['  foo  ', '  bar  '], _.trim);
	// => ['foo', 'bar']

### trimEnd

右侧清除，用法一致

### trimStart

左侧清除，用法一致

### truncate

_.truncate([string=''], [options={}])

参数表：

- [string=''] (string): The string to truncate.
- [options={}] (Object): The options object.
- [options.length=30] (number): The maximum string length.
- [options.omission='...'] (string): The string to indicate text is omitted.
- [options.separator] (RegExp|string): The separator pattern to truncate to.

字符串截断省略函数,实现超出显示省略号的效果

	_.truncate('hi-diddly-ho there, neighborino');
	// => 'hi-diddly-ho there, neighbo...'
	 
	_.truncate('hi-diddly-ho there, neighborino', {
	  'length': 24,
	  'separator': ' '
	});
	// => 'hi-diddly-ho there,...'
	 
	_.truncate('hi-diddly-ho there, neighborino', {
	  'length': 24,
	  'separator': /,? +/
	});
	// => 'hi-diddly-ho there...'
	 
	_.truncate('hi-diddly-ho there, neighborino', {
	  'omission': ' [...]'
	});
	// => 'hi-diddly-ho there, neig [...]'

### upperCase

转为大写字母，去除多余的中划线、下划线

	_.upperCase('--foo-bar');
	// => 'FOO BAR'
	 
	_.upperCase('fooBar');
	// => 'FOO BAR'
	 
	_.upperCase('__foo_bar__');
	// => 'FOO BAR'

### upperFirst

转为首字母大写

	_.upperFirst('fred');
	// => 'Fred'
	 
	_.upperFirst('FRED');
	// => 'FRED'

### words

_.words([string=''], [pattern])

Splits string into an array of its words.

获取字符串中的单词，第二参数指定单词匹配模式[Regex]

	_.words('fred, barney, & pebbles');
	// => ['fred', 'barney', 'pebbles']
	 
	_.words('fred, barney, & pebbles', /[^, ]+/g);
	// => ['fred', 'barney', '&', 'pebbles']


## 模板函数

### template

_.template([string=''], [options={}])

高深的模板函数，需要单独研究

	// Use the "interpolate" delimiter to create a compiled template.
	var compiled = _.template('hello <%= user %>!');
	compiled({ 'user': 'fred' });
	// => 'hello fred!'
	 
	// Use the HTML "escape" delimiter to escape data property values.
	var compiled = _.template('<b><%- value %></b>');
	compiled({ 'value': '<script>' });
	// => '<b>&lt;script&gt;</b>'
	 
	// Use the "evaluate" delimiter to execute JavaScript and generate HTML.
	var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	compiled({ 'users': ['fred', 'barney'] });
	// => '<li>fred</li><li>barney</li>'
	 
	// Use the internal `print` function in "evaluate" delimiters.
	var compiled = _.template('<% print("hello " + user); %>!');
	compiled({ 'user': 'barney' });
	// => 'hello barney!'
	 
	// Use the ES template literal delimiter as an "interpolate" delimiter.
	// Disable support by replacing the "interpolate" delimiter.
	var compiled = _.template('hello ${ user }!');
	compiled({ 'user': 'pebbles' });
	// => 'hello pebbles!'
	 
	// Use backslashes to treat delimiters as plain text.
	var compiled = _.template('<%= "\\<%- value %\\>" %>');
	compiled({ 'value': 'ignored' });
	// => '<%- value %>'
	 
	// Use the `imports` option to import `jQuery` as `jq`.
	var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	compiled({ 'users': ['fred', 'barney'] });
	// => '<li>fred</li><li>barney</li>'
	 
	// Use the `sourceURL` option to specify a custom sourceURL for the template.
	var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	compiled(data);
	// => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
	 
	// Use the `variable` option to ensure a with-statement isn't used in the compiled template.
	var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	compiled.source;
	// => function(data) {
	//   var __t, __p = '';
	//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	//   return __p;
	// }
	 
	// Use custom template delimiters.
	_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	var compiled = _.template('hello {{ user }}!');
	compiled({ 'user': 'mustache' });
	// => 'hello mustache!'
	 
	// Use the `source` property to inline compiled templates for meaningful
	// line numbers in error messages and stack traces.
	fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
	  var JST = {\
	    "main": ' + _.template(mainText).source + '\
	  };\
	');

