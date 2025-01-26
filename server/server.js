const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const { Product, User } = require('./config'); // Ensure this path is correct
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../dashboard'));

app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../dashboard')));
app.use(express.static(path.join(__dirname, '../dashboard/product')));
app.use('/images/uploads', express.static(path.join(__dirname, './public/images/uploads')));


require('dotenv').config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
let ADMIN_PASSWORD_HASH;

async function initialize() {
    try {
        // Ensure that the password is hashed before the app starts
        ADMIN_PASSWORD_HASH = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        // Other initialization logic can go here
    } catch (error) {
        console.error('Error during password hashing:', error.message);
        process.exit(1);
    }
}

initialize();  // Call this during server initialization



// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 },
    })
);


function isAdminAuthenticated(req,res,next){
    if(req.session&&req.session.isAdmin){
        return next();
    }
    res.redirect('/admin/login')
}



// rate limmiter ip
const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts
    message: 'Too many login attempts. Please try again later.',
});

// rate limiter ip



// front-end user authentication

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/login/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/signup/signup.html'));
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({
            name: username,
            email: email,
            password: hashedPassword
        });
        console.log("User created successfully:", userData);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ error: error.message });
    }
});



app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ name: username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }
        res.redirect('/');
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(400).json({ error: error.message });
    }
});
// front end user authentication



// file upload admin panel
const uploadDir = path.join(__dirname, './public/images/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// file upload admin panel 



// admin panel 

app.get('/admin', isAdminAuthenticated, (req, res) => {
    res.render(path.join(__dirname, '../dashboard/dashboard'));
});

app.post('/dashboard/product/add', upload.single('filename'), async (req, res) => {
    try {
        const productData = {
            product_name: req.body.name,
            product_category: req.body.category,
            product_price: req.body.price,
            product_brand: req.body.brand,
            product_description: req.body.description,
            product_image: `/images/uploads/${req.file.filename}`,
        };
        const newProduct = new Product(productData);
        await newProduct.save();
        console.log("Product added successfully:", newProduct);
        res.status(201).redirect('/admin');
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(400).json({ error: error.message });
    }
});

app.get('/dashboard/product/remove', async (req, res) => {
    try {
        let products = await Product.find();
        res.render('product/remove', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});






app.delete('/dashboard/product/remove/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product removed successfully' });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/dashboard/product/allproducts',async(req,res)=>{
    try{
        let allproducts = await Product.find();
        res.render('product/allproducts',{ allproducts });
    }catch(error){
        console.error(error)
        res.status(500).send('error fetching data')
    }
});


app.get('/admin/login', (req, res) => {
    res.render('../dashboard/authentication/auth'); 
    console.log(path.join(__dirname, '../dashboard'));

});

// Admin login logic
app.post('/admin/login', loginRateLimiter, async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === ADMIN_USERNAME) {
            const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
            if (passwordMatch) {
                req.session.isAdmin = true; // Set admin session
                console.log("Admin logged in:", req.session);
                return res.redirect('/admin');
            }
        }

        res.status(401).json({ message: 'Invalid admin credentials' });
    } catch (error) {
        console.error('Error during admin login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get('/admin/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth/login');
    });

});
//  admin panel



const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/Rent-karo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(error => console.error('Database connection error:', error));


