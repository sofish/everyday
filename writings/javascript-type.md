# JavaScript 类型

对于 JavaScript 类型，可以简单地概括为：相对于强类型语言来说，它是弱（松散）类型的语言；有基本类型和引用类型，他们是区别是一个有固定空间存在于栈内存中，一个没有固定空间保存在堆内存中并且在栈内存中保存了一个指向实现位置的指针。

市面上很多书都有不小的篇幅在讲。这篇文章会讲几个方面，这些方面可能会需要你对 JavaScript 已经有了一些简单的了解，特别是 JavaScript 的类型。如果还不一解，可以随手拿起一本关于 JavaScript 的书翻翻，再来看本文。

### 一、基本类型与引用类型

- 基本类型：Undefined / Null / Boolean / Number / String
- 引用类型：Object / Array / Function / Date / RegExp / Error / Map / Set ...

为什么引用类型没有枚举完呢，因为这里面你了解这么多就够了，至少在我讲的这篇中这些已经足够。其他的可能很少会用到，甚至像 Map 、Set 这样的也不是所有浏览器都支持。

### 二、JavaScript 类型的判断

在 JavaScript 有两个 operator 可以用以判断类型。他们是 `typeof` 和 `instanceof`，不过圈子很小，它们混的可不是那么好，是出了名的不靠谱。少数情况也是对的，很多情况下是不靠谱的。看看就知道了：

```js
// 靠谱的时候：
typeof 'sofish' // object
new String('sofish') instanceof String // true

// 不靠谱的时候：
typeof [] // object
typeof null // object 
'sofish' instanceof String // false
```

呃～ 可能很多初学的 JavaScript 程序员会因此爆粗口。还大部分人在需要用 JS 的时候已经有了 jQuery 等这样的库，他们都做了封装，让你可以方便地检测类型。当然，事实上要检测也不麻烦，因为那句「在 JavaScript 中，一切都是对象」，当然像很多文档中说到的，`undefined` 其实和 `NaN`, `Infinity` 都只是一个全局属性。你大概知道就可以了。但「对象」可以帮到我们：

```js
/* 检测对象类型
 * @param: obj {JavaScript Object}
 * @param: type {String} 以大写开头的 JS 类型名
 * @return: {Boolean}
 */
function is(obj, type)  {
  return Object.prototype.toString.call(obj).slice(8, -1) === type;
}
```

这样的话，我们就可以利用 `is`  这个函数来帮我们搞定类型判断了，并且这个简单的函数有很好的兼容性，可以用到你的项目中去。情况如：

```js
is('sofish', 'String') // true
is(null, 'Null') // true
is(new Set(), 'Set') // true
```

### 三、JavaScript 类型的转换

在 JavaScript 中，变量（属性）的类型是可以改变的。最常看到的是 `String` 与 `Number` 之间的转换。如何把 `1 + '2'` 变成 `12` 呢？这里面有必要理解一下 `+` 号 operator，它是一个数学运算符，同时也是 JavaScript 中的字符串连字符。所以新手会经常会看到一个有趣的现象，当使用 `+` 号的时候有时计算出来的不是想要的，而用 `-` 号却总能得到「正确」的答案。

```js
1 + '2' // '12'
1 + (+'2') // 3
1- '2' // -1
``` 

这里面其实就是因为 `+` 的双重角色导致的。在上面的代码中，可以注意到第二条表达式在 `String` 前面运用了一个 `+` 号，强制把它的类转换为 `Number`。而对于 JavaScript 的类型转换理解，大多数情况下，只要理解 `+` 具有双重角色就可以了。其他的可以理解类，类似都是可以用赋值/重载来修改的，甚至包括 Error：

```js
var err = new Error();
console.log(err instanceof Error); // true

err = 'sofish';
console.log(err); // 'sofish'
```

### 四、JavaScript 引用类型

这一点是本文的一个难点。相于基本类型，引用可以为其添加属性和方法；引用类似的值是一个引用，把一个引用类型的值赋给一个变量，他们所指向的是同一存储在堆内存中的值。变量（属性）可以重载，但复制会是一件很有趣的事情，后面我们会详细来说。

__1. 添加属性和方法__

下面的代码我们将会看到，假设我们对一个基本类似赋值，它并不会报错，但在获取的时候却是失效的：

```js
var arr = [1,2,3];
arr.hello = 'world';
console.log(arr.hello); // 'world'

var str = 'sofish';
str.hello = 'world';
console.log(str.hello); // undefined
``` 
__2. 引用类型值的操作__

由于引用类型存储在栈内存中的是一个引用，那么当我们指向的同一个原始的值，对值的操作将会影响所有引用；这里有一个例是，重新赋值（并非对值的直接操作）会重新创建一个对象，并不会改变原始值。比如：

```js
var arr = [1,2,3], sofish = arr;
sofish.push('hello world');
console.log(arr); // [1, 2, 3, 'hello world']

// 非相同类型
sofish = ['not a fish']; // 当 sofish 类似改变时，不会改变原始值
console.log(arr);// [1, 2, 3, 'hello world']
```

__3. 引用类型值的复制__

对原始值的操作会影响所有引用，而这不一定是我们想要的，有时候我们需要复制一个全新的对象，操作的时候不影响其他引用。而一般情况也，像 `Date` / `Function` / `RegExp` ... 都很少有具体的操作，主要是像 `Array` 和 `Object` 会有添加项、属性等操作。所以我们主要需要理解的是如何复制 `Array` 和 `Object` 对象。

3.1 数组的复制

在 `Array` 对象中，存在 `slice` 方法返回一个截取的数组，在 ES5 中 `filter` 等也返回一个新的数组，那么我们可能利用这个方法来进行复制。

```js
var arr = [1, 2, 3];
var sofish = arr.slice();

// 对新的数组进行操作并不会影响到原始数组
sofish.push('hello world');
console.log(arr); // [1, 2, 3] 
```

3.2 对象的复制

在 `Array` 的复制中我们使用的是 `slice` 方法，实际上对于 `Array` 和 `Object` 中都可以利用 `for ... in` 循环来进行遍历并赋值来进行复制。

```js
var obj = { name: 'sofish' }, sofish = {}, p;
for (p in obj) sofish[p] = obj[p];

// 对新的对象操作并不会影响原始值
sofish.say = function() {};
console.log(obj); // { name: 'sofish' }
```

3.3 Shadow / Deep Copy

像上面的操作，就是我们常说的浅拷贝（Shadow Copy）。不过在 `Array` 和 `Object` 都可以有多层（维），像这样的拷贝只考虑到最上面一层的值，在可能存在的值中的 `Array` 和 `Object` 都还是指向了原始对象。比如：

```js
var arr = [1, { bio: 'not a fish' } ], sofish = [], p;
for(p in arr) {
  sofish[p] = arr[p];
}

// 对 `sofish` 中包含的对象 `cat` 的操作会影响原始值
sofish[1].bio = 'hackable';
console.log(arr);//  [1, cat: { bio: 'hackable' } ]
```

那么如何做呢？来一个 `copy()` 函数解决这个问题：

```js
/* 复制对象
 * @param: obj {JavaScript Object} 原始对象
 * @param: isDeep {Boolean} 是否为深拷贝
 * @return: {JavaScript Object} 返回一个新的对象
 */
function copy(obj, isDeep) {
	var ret = obj.slice ? [] : {}, p;
	// 配合 is 函数使用
	if(!isDeep && is(obj, 'Array')) return obj.slice();
	for(p in obj) {
	    var prop = obj[p];
		if(!obj.hasOwnProperty(p)) continue;
		if(is(prop, 'Object') || is(prop, 'Array')) {
		  ret[p] = copy(prop, isDeep);
		} else {
			ret[p] = prop;
		}
	}
	return ret;
}
```

这样，我们就可以通过 `copy(obj, isDeep)` 函数来复制一个 `Array` 或者 `Object` 。可以测试一下：

```js
var arr = [1, {bio: 'not a fish'}];
var sofish = copy(arr);

// 浅拷贝对于第一层的操作不影响原始值，但影响第二层
sofish.push('cat'); 
console.log(arr); //  [1, {bio: 'not a fish'}]
sofish[1].bio = 'hello world';
console.log(arr) //  [1, {bio: 'hello world'}]

// 深拷贝则不会影响原始值
sofish = copy(arr, 1);
sofish[1].bio = 'foo or bar'
console.log(arr); // [1, {bio: 'hello world'}]
```

到此。你基本上要了解的关于类型的比较难的点，应该是都基本了解了。当然，复制是最麻烦的一个点，除了经常需要操作的 `Array` 和 `Object` 来说，还有 Date / Function / RegExp 的复制。给几篇参考文章吧，也都很有趣：

1. [Passing Objects to Functions By Value](http://www.htmlgoodies.com/beyond/javascript/passing-objects-to-functions-by-value.html)
2. [Performance: Regex Clone](http://jsperf.com/regexp-clone)
3. [JavaScript: clone a function](http://stackoverflow.com/questions/1833588/javascript-clone-a-function)