const express=require('express');
const app=express();
const Joi=require('joi');
const bodyParser=require('body-parser')
app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))

const personne=[]
app.get('/api/person',(req,res)=>{
    res.status(200).send(personne)
})

app.get('/api/person/:id',(req,res)=>{
  const trouver= personne.find(p=>p.id===parseInt(req.params.id))
if(!trouver)res.status(404).send('person not found');
 res.status(200).send(trouver)
})

app.post('/api/person',(req,res)=>{

const result=validateInput(req.body)

if(result.error)return res.status(404).send(result.error.details[0].message)
    
    const newPerson={
        id:personne.length +1,
        name:req.body.name,
        surname:req.body.surname,
        age:req.body.age
    }

personne.push(newPerson);
    res.status(201).send(newPerson);
})

app.put('/api/person/:id',(req,res)=>{
    const result=validateInput(req.body)
    if(result.error){
        res.status(404).send(result.error.details[0].message)
    }
    
    const user=personne.find(u=>u.id===parseInt(req.params.id));
    if(!user) return res.status(404).send('user not found')
    user.name=req.body.name;
    user.surname=req.body.surname;
res.send(user)
})
app.delete('/api/person/:id',(req,res)=>{
    const delPerson=personne.find(user=>user.id===parseInt(req.params.id))
    if(!delPerson) return res.status(404).send('person not found');
    const index=personne.indexOf(delPerson);
    personne.splice(index,1)
    res.status(200).send(delPerson)
})
function validateInput(person){
    const schema={
        name:Joi.string().min(2).required(),
        surname:Joi.string().min(1).required(),
        age:Joi.number().required()
    }
   return Joi.validate(person,schema);
}
app.listen(4000,()=>console.log('the server is running on port 4000'))
