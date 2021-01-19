const app = require('express')();
const chalk = require('chalk');

debugger

const startApp = new Date();

const PORT = process.env.PORT || 3000;

function accessLog( path , error ) {
    const now = new Date().toISOString();
    const pathString = error ? chalk.redBright(path) : chalk.greenBright(path)
    console.log('[' + now + '] - ' + pathString );
}

app.get('/ping', (req, res)=>{
    res.send("pong")
})

app.get('/healthz', (req, res)=>{
    let upatime = new Date() - startApp;
    res.json({
        db: 'healthy',
        cache: 'healthy',
        uptime: Math.floor(upatime / 3600) + 's'
    })
})

app.get('/', (req, res)=>{
    accessLog('/', false);
    res.json({
        message: 'salam',
        code: 200
    })
})

app.use((req, res)=>{
    accessLog('/', true);
    res.json({
        message: 'not found',
        code: 404
    })
})

app.listen(PORT, ()=>{
    console.log(`server is ready on port ${ chalk.yellow(PORT) }`)
})