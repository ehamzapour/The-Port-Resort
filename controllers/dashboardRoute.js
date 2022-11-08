const router = require('express').Router();
const { Portfolio, User } = require('../models');
const withAuth = require('../utils/auth');
//wont work unless logged in 
router.get('/', withAuth, async (req, res) => {
    try {
        const portfolioData = await Portfolio.findAll ({
            attributes: [
                'id', 
                'full_name', 
                'job_title', 
                'about',
                'phone',
                'country',
                'city',
                'linkedin',
                'github',
                'school',
                'course',
                'graduation_date',
                'role',
                'company',
                'location',
                'job_starting',
                'job_ending',
                'job_description',
                'project_name',
                'repository',
                'project_description'
            ],

            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });
//for the render of page
         const Portfolio = portfolioData.map(post => post.get({ plain: true }));
        res.json(portfolioData)
    } catch(err) {
        res.status(500).json({messgae: 'check line 43 dbr'});
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const portfolioData = await Portfolio.findOne ({
                 where: {
                    id: req.body.user_id
                 },
                 include: [
                    {
                        model: Portfolio,
                        attributes: [
                            'id', 
                            'full_name', 
                            'job_title', 
                            'about',
                            'phone',
                            'country',
                            'city',
                            'linkedin',
                            'github',
                            'school',
                            'course',
                            'graduation_date',
                            'role',
                            'company',
                            'location',
                            'job_starting',
                            'job_ending',
                            'job_description',
                            'project_name',
                            'repository',
                            'project_description'
                        ]
                    }
                 ],
                 include: [
                    {
                        model: User,
                        attributes: ['name']
                    }
                 ]
        });

        if(!portfolioData) {
            res.status(400).json({message: 'No poertfolio to edit'});
            return;
        }

        res.status(200).json(portfolioData)
    } catch(err) {
        res.status(500).json({message: 'check line 96 dbr'});
    }
});

module.exports = router;
