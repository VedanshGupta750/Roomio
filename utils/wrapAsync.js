module.exports = (fn) => {
    return (req, res, next) => {  // ✅ Only 3 parameters!
        fn(req, res, next).catch(next);    
    }
};