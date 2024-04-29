import express, { json, urlencoded } from 'express'
import { connect } from 'mongoose'
import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from './models/employeeModel'
const app = express()

app.use(json())
app.use(urlencoded({extended: false}))

//routes
app.get('/employees', async(req, res) => {
    try {
        const employees = await find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/employees/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/employees/add', async(req, res) => {
    try {
        const employee = await create(req.body);
        res.status(200).json(employee);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a employee
app.put('/employees/update/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const employee = await findByIdAndUpdate(id, req.body);
        // we cannot find any employee in database
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        const updatedEmployee = await findById(id);
        res.status(200).json(updatedEmployee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a employee

app.delete('/employees/delete/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        res.status(200).json(employee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

connect('mongodb://localhost:27017/ibm')
.then(() => {
 
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})