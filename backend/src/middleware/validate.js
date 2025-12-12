module.exports = (schema) => {
    return (req, res, next) => {
        console.log("hi");
        const { error } = schema.validate(req.body);
       

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        console.log("hiiii");

        next();
    };
};
