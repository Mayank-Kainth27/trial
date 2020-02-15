const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => { 
    app.post('api/surveys', requireLogin, requireCredit, (req, res) => {
        const { title, subject, body, recipients } = req.body;
    
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        // place to send mail as it is after the survey genration
        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
};