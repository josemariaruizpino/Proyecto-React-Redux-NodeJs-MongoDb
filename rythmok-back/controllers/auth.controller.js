const passport = require('passport');

module.exports = {

    checkSession: async (req, res, next) => {
        if (req.user) {
            let userRegister = req.user;
            userRegister.password = null;
            return res.status(200).json(userRegister);
        } else {
            return res.status(401).json({message: 'No user found'});
        }
    },

   
    registerPost: (req, res, next) => {
        const done = (error, user) => {
            if (error) {
                return next(error);
            };
           
            req.logIn(user, (error) => {
                if(error) {
                    return next(error);
                }
    
                // return res.redirect('/');
                return res.status(200).json('User registered successfully')
            });
        };
        
        passport.authenticate('registro', done)(req);  
    },
    

    loginPost: (req, res, next) => {
        passport.authenticate('acceso', (error, user) => {
            if(error) {                
                return next(error);
            }
    
            req.logIn(user, (error) => {
                if(error) {                    
                    return next(error);
                }                
                // return res.redirect('/')
                return res.status(200).json('User logged successfully')
            });
        })(req);
    },

    logoutPost: (req, res, next) => {
        if(req.user) {
            req.logout();
    
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
    
                // return res.redirect('/');
                return res.status(200).json('Session closed')
            });
    
        } else {
            return res.status(200).json('No user logged');
        }
    }
};