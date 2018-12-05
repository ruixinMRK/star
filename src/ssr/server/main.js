import express from 'express';
import {render} from './template';

const app = express();

app.use(express.static('client'))

app.all('/api/*',function (req, res) {
	res.end(JSON.stringify({list:[{name:'a'},{name:'b'},{name:'c'}]}));    
})

app.all('*', function (req, res, next) {
	res.end(render('',req));
})

app.listen(3000);


