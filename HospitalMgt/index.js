const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./DB");
const Patients = require("./Model/hospital");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json())

app.listen(PORT, (req, res) =>{
    console.log(`Hospital server is running on port ${PORT}` )
})


connectDB();

// CRUD


// create

app.post("/patients", async (req, res) =>{
    try {
        const {firstName, lastName, cardNo, docAssigned, nurseAssigned, diagonize, reportOfDc, nextOfKin, contactOfNextOfKin} = req.body

        const patient = await Patients.findOne({cardNo})
    
        if(patient)
            return res.status(404).json({msg: "Patient already exist!"})
    
        const newPatient = new Patients({firstName, lastName, cardNo, docAssigned, nurseAssigned, diagonize, reportOfDc, nextOfKin, contactOfNextOfKin} )
     
        await newPatient.save() 
    

        return res.status(200).json({msg: "Patient added succefully."})
    } catch (error) {
        return res.status(500).json({msg: error.message})
         
    }

})


// read all

app.get("/patients", async (req, res)=>{

    try {
         const allPatients = await Patients.find()

         if(!allPatients)
         return res.status(404).json({msg: "No patient on the database"})

    res.status(200).json(allPatients)
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }

   
})



// read 0ne

app.get("/patients/:id", async (req, res) =>{
    try { 
        const {id} = req.params

        const patient = await Patients.findById(id)

        if(!patient)
        return res.status(200).json({msg: "this patient does not exist!"})

        return res.status(200).json(patient)

        // const id = req.params.id
        
    } catch (error) {
        
        return res.status(500).json({msg: error.message})
    }
})


// update

app.put("/patient/:id", async (req, res) =>{

    try {
        const {id} = req.params

        const {firstName, lastName, docAssigned, nurseAssigned, diagonize, reportOfDc, nextOfKin, contactOfNextOfKin} = req.body

        const patient = await Patients.findByIdAndUpdate(id, {firstName, lastName, docAssigned, nurseAssigned, diagonize, reportOfDc, nextOfKin, contactOfNextOfKin})

        return res.status(200).json({msg: "patient updated successfully"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    
} 
})


// deleting

app.delete("/patientss/:id", async (req, res) =>{
    try {
        const {id} = req.params

        const patientToDelete = await Patients.findById(id)

        if(!patientToDelete)
        return res.status(404).json({msg: "this patient doesn't exist"})

        const deletedPatient = await Patients.findByIdAndDelete(id)
        return res.status(200).json({msg: "patient deleted successfuly"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }

}) 