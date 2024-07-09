const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const emailjs = require('emailjs-com');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 7001;
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3004',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/referrals', async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await prisma.referral.create({
            data: {
                referrerName,
                referrerEmail,
                refereeName,
                refereeEmail,
            },
        });
        res.status(200).json({ message: 'Referral submitted successfully' });
    } catch (error) {
        console.error('Error processing referral:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
