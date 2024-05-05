import mysql from 'mysql2'
import dotenv from 'dotenv';
dotenv.config({path: "../.env"});

 export const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "db"
});

async function dropDatabase() {
    try {
        await pool.promise().query("DROP DATABASE db");
        console.log("Database dropped successfully!");
    } catch (error) {
        console.error("Error dropping database:", error.message);
    }
}
async function createDatabase() {
    try {
        await pool.promise().query("CREATE DATABASE db");
        console.log("Database created successfully!");
    } catch (error) {
        console.error("Error creating database:", error.message);
    }
}
async function createTables() {
    try {
        //const connection = await pool.getConnection();
        await pool.promise().query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(255),
          city VARCHAR(255),
          company VARCHAR(255)
        )
      `);

        await pool.promise().query(`
      CREATE TABLE IF NOT EXISTS todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          title TEXT,
          completed BOOL DEFAULT false,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

        await pool.promise().query(`
      CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          title VARCHAR(255) NOT NULL,
          body TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

        await pool.promise().query(`
      CREATE TABLE IF NOT EXISTS comments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          post_id INT,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          body TEXT,
          FOREIGN KEY (post_id) REFERENCES posts(id)
        )
      `);
        await pool.promise().query(`
      CREATE TABLE IF NOT EXISTS passwords (
        user_id INT,
        password VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}
async function dropTables() {
    try {
        await pool.promise().query("DROP TABLE IF EXISTS passwords");
        await pool.promise().query("DROP TABLE IF EXISTS comments");
        await pool.promise().query("DROP TABLE IF EXISTS posts");
        await pool.promise().query("DROP TABLE IF EXISTS todos");
        await pool.promise().query("DROP TABLE IF EXISTS users");
        console.log("Tables dropped successfully!");
    } catch (error) {
        console.error("Error dropping tables:", error.message);
    }
}

async function insertTable() {
    const usersList = ["John Joneri", "Emma Emaneri", "Michael Mikeri", "Olivia Olleri", "William Willeri", "Sophia Sopheri", "James Jameri", "Ava Averi", "Alexander Aleri", "Isabella Isari", "Henry Heneri", "Mia Mieri", "Benjamin Beneri", "Charlotte Chari", "Daniel Daneri", "Amelia Ameri", "David Dari", "Harper Haperi", "Joseph Joseri", "Evelyn Eveleri"];
    const usernames = ['john', 'emma', 'Michael', 'Olivia', 'William', 'Sophia', 'James', 'Ava', 'Alexander', 'Isabella', 'Henry', 'Mia', 'Benjamin', 'Charlotte', 'Daniel', 'Amelia', 'David', 'Harper', 'Joseph', 'Evelyn'];
    const usersPhone = ['123-456-7890', '234-567-8901', '345-678-9012', '456-789-0123', '567-890-1234', '678-901-2345', '789-012-3456', '890-123-4567', '901-234-5678', '987-654-3210', '876-543-2109', '765-432-1098', '654-321-0987', '543-210-9876', '432-109-8765', '321-098-7654', '210-987-6543', '109-876-5432', '098-765-4321', '987-654-3210']
    const cities = ["Tel Aviv", "Jerusalem", "Haifa", "Tel Hai", "Beersheba", "Netanya", "Eilat", "Holon", "Ashdod", "Herzliya", "New York", "London", "Paris", "Tokyo", "Berlin"];
    const companyNames = ["Amazon", "Google", "Apple", "Microsoft", "Facebook", "Tesla", "Oracle", "Intel", "IBM", "Cisco", "HP", "Dell", "Twitter", "Salesforce", "Netflix", "Uber", "Airbnb", "PayPal", "LinkedIn", "Snapchat"];
    const passwords = ["P@ssw0rd123", "N1c3TrY!", "S3cur1tY#", "Pr0t3ctMe$", "Pa$$w0rd!", "Str0ngP@ss", "C0d3Ninj@", "Fir3w@ll!", "GeekP@ss1", "Th3C0d3R!", "P@ssw0rd2023", "S@f3H@v3n", "P@55w0rd!", "S3cur3P@ss", "G0tY0uR!", "N0tT0d@y", "Cyb3rS3cur1ty", "D1g1t@lSec", "P@ssw0rd987", "H@ckPr00f"];
    const todos = ["Implement bubble sort algorithm", "Create a RESTful API using Node.js and Express", "Design a simple CRUD application", "Write unit tests for a React component", "Deploy a website to AWS using Elastic Beanstalk", "Optimize database queries for better performance", "Develop a chatbot using natural language processing", "Build a responsive landing page with HTML and CSS",
        "Integrate OAuth2 authentication into a web application", "Configure a CI/CD pipeline with Jenkins", "Create a data visualization dashboard with D3.js", "Implement a GraphQL API server with Apollo Server", "Write a Python script for web scraping", "Develop a mobile app with React Native", "Design a relational database schema for an e-commerce platform", "Build a Docker container for a microservice",
        "Optimize frontend assets for faster loading times", "Implement authentication and authorization using JSON Web Tokens (JWT)", "Automate testing with Selenium WebDriver", "Deploy a serverless application on AWS Lambda", "Write a shell script for automating server maintenance tasks", "Create a custom WordPress theme from scratch", "Design an algorithm for solving a sudoku puzzle", "Develop a real-time chat application with Socket.io",
        "Build a responsive email template", "Optimize images for the web", "Implement a linked list data structure", "Design a REST API documentation using Swagger", "Write a function to reverse a string in JavaScript", "Develop a single-page application (SPA) with Angular", "Deploy a MongoDB cluster on the cloud", "Create a Slack bot with the Slack API", "Build a CRUD application using Vue.js", "Design a system architecture for a scalable web application",
        "Implement error handling in a Node.js application", "Develop a web scraper with Puppeteer", "Write SQL queries to retrieve data from a database", "Optimize CSS stylesheets for better performance", "Implement a binary search algorithm", "Create automated tests with Jest", "Build a responsive image gallery using CSS Grid"];
    const postsBody = [
        "Actions speak louder than words.",
        "Time heals all wounds.",
        "Every cloud has a silver lining.",
        "Beauty is in the eye of the beholder.",
        "Hope springs eternal.",
        "A picture is worth a thousand words.",
        "All good things must come to an end.",
        "Knowledge is power.",
        "Better late than never.",
        "A penny for your thoughts.",
        "Bite the bullet.",
        "Let sleeping dogs lie.",
        "Dont count your chickens before they hatch.",
        "Necessity is the mother of invention.",
        "Absence makes the heart grow fonder.",
        "Fortune favors the bold.",
        "Birds of a feather flock together.",
        "The early bird catches the worm.",
        "To err is human, to forgive divine.",
        "Actions speak louder than words.",
        "A rolling stone gathers no moss.",
        "A stitch in time saves nine.",
        "Practice makes perfect.",
        "Beauty is only skin deep.",
        "Beggars cant be choosers.",
        "Blood is thicker than water.",
        "Charity begins at home.",
        "A fool and his money are soon parted.",
        "A friend in need is a friend indeed.",
        "The grass is always greener on the other side."
    ];
    const postTitle = [
        "Believe", "Happiness", "Truth", "Love", "Wisdom", "Stability", "Courage", "Beauty", "Simplicity", "Creativity",
        "Health", "Action", "Breath", "Joy", "Reader", "Leadership", "Inspiration", "Connection", "Peace", "Journey",
        "Experience", "Giving", "Intelligence", "Grace", "Gratitude", "Human", "Transparency", "Sustainability", "Change", "Solution"
    ];
    const comments = [
        "Great post!", "I agree", "Well said!", "Interesting", "Love it", "Thanks for sharing", "Exactly!", "So true", "Brilliant",
        "Spot on", "Couldnt agree more", "Amazing", "Love this!", "Absolutely", "True", "Informative", "Impressive", "Fantastic",
        "Awesome", "Very insightful", "So helpful", "Inspiring", "This is gold", "Incredible", "Thanks!", "Excellent point",
        "Really good", "Wonderful", "Couldnt have said it better", "Appreciate it", "Love your perspective", "Terrific",
        "Insightful", "Helpful", "Fascinating", "Exactly what I needed", "Such a great point", "Love the content", "Perfect!"
    ];

    for (let i = 0; i < 20; i++) {
        await pool.promise().query(`
                INSERT INTO users (name, username, email, phone,city, company) 
                VALUES ('${usersList[i]}', '${usernames[i]}', '${usernames[i]}@gmail.com', '${usersPhone[i]}','${cities[i % 15]}', '${companyNames[i]}')
            `);
        await pool.promise().query(`
        INSERT INTO passwords (user_id, password)
        VALUES (${i + 1}, '${passwords[i]}')`);
    }
    for (var i = 0; i < 20; i++) {
        var randomNumber = Math.floor(Math.random() * 20) % 15;
        for (var j = 0; j < randomNumber; j++) {
            await pool.promise().query(`
                INSERT INTO todos (user_id, title, completed) 
                VALUES (${i + 1}, '${todos[i * j + 5 % 40]}', ${2 < j < 7 ? true : false})
            `);
        }
    }
    for (var i = 0; i < 20; i++) {
        var randomNumber = Math.floor(Math.random() * 20) % 15;
        for (var j = 0; j < randomNumber; j++) {
            await pool.promise().query(`
                INSERT INTO posts (user_id, title, body) 
                VALUES (${i + 1}, '${postTitle[i * j % 40]}', '${postsBody[i * j % 30]}')
            `);
            for (var k = 0; k < Math.floor(Math.random() * 20) % 25; k++) {
                var user = usernames[Math.floor(Math.random() * k) % (235 + k)];
                await pool.promise().query(`
                    INSERT INTO comments (post_id, name, email, body) 
                    VALUES (${j + 1}, '${user}', '${user}@gmail.com', '${comments[i * j % 40]}')
                `);
            }
        }
    }
    console.log("Data inserted successfully");
}
if (true) {
    //dropTables();
    createTables();
    //insertTable();
}
// קריאה לפונקציה ליצירת הטבלאות
//createDatabase();
