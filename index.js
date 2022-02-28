'USE STRICT';

// Inporting libraries
const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Initializing express app
const app = express();

// Constants
const PORT = 3000;

try {
    // Setting app engine
    app.set('view engine', 'hbs');
    
    // Serving public folder
    app.use(express.static(path.join(__dirname, './public')));
    
    // Serving partial templates
    hbs.registerPartials(path.join(__dirname, './templates'));

    // Handling routes
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.post('/contact', (req, res) => {
        // In prod will send email to tasty-buds customer service
        res.render('contact');
    });

    // Unhandled routes
    app.get('*', async (req, res) => {
        res.status(404).send('<h1>Error 404: Page not Found</h1>');
    });

    // Serving app
    app.listen(PORT, () => {
        console.clear();
        console.log(`Application is listening on port:\n>> http://localhost:${PORT}`);
    });
} catch (error) {
    console.log(`Exception e:`, e);
}