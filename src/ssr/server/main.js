

/* 
	webpack:///./node_modules/css-modules-require-hook/lib/attachHook.js?:9
	  var existingHook = (void 0)[extension];
	                             ^
	TypeError: Cannot read property '.css' of undefined
*/

//运用下面一种 方案处理服务器端引用css文件的问题 以及结局加载图片问题
// 可能是如下原因
//	1.服务器端是打包后的代码(es6+)
//	2.插件本身无法使用
//	将会更改其他解决方案
// import csshook from 'css-modules-require-hook' // import hook before routes
// csshook({
// 	generateScopedName: '[name]__[local]___[hash:base64:5]',
// });

// import assethook from 'asset-require-hook';
// assethook({
//     extensions: ['png', 'jpg']
// });


import express from 'express';
import {render} from './template';


const app = express();

app.use(express.static('client'))

app.all('/api/*',function (req, res) {
	res.end(JSON.stringify({list:[{name:'a'},{name:'b'},{name:'c'}]}));    
})

app.all('*', function (req, res, next) {
	render('',req,res);
})

app.listen(3000);


