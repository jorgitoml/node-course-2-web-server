import express from 'express';
import hbs from 'hbs';
import path from 'path';
import fs from 'fs';

const app = express();

hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());
hbs.registerHelper('screamIt',text=>text.toUpperCase());

app.set('view engine','hbs');
app.set('views', path.join(__dirname, '/views'));

app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log + '\n', err=>{
        if(err){
            console.log('Unable to append to server log.');
        }
    });
    next();
});

/* app.use((req,res,next)=>{
    res.render('maintenance.hbs');
}); */

app.use(express.static(path.join(__dirname, '/public')));




app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my syte'
    });

});

app.get('/about',(req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Se ha producido un error'
    });
});




app.listen(3000, ()=>{
    console.log('Server is up and listening port 3000');
});