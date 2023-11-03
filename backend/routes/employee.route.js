const express = require('express');
const app = express();
const employeeRoute = express.Router();

let Employee = require('../models/Employee');

employeeRoute.route('/create').post((req,res,next)=>{
    Employee.create(req.body)
.then( data => {
    res.json(data);
})
.catch(error => {
    return next(error);
});
});

employeeRoute.route('/').get((req, res, next) => {
    Employee.find()
        .exec()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
});


employeeRoute.route('/read/:id').get((req, res, next) => {
    Employee.findById(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Employee not found" });
            } else {
                res.json(data);
            }
        })
        .catch(error => {
            return next(error);
        });
});


employeeRoute.route('/update/:id').put(async (req, res, next) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(updatedEmployee);
        console.log("Data successfully updated");
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


employeeRoute.route('/delete/:id').delete(async (req, res, next) => {
    try {
        const deletedEmployee = await Employee.findOneAndRemove({ _id: req.params.id });
        if (!deletedEmployee) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        res.status(200).json({ msg: deletedEmployee });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


module.exports = employeeRoute;