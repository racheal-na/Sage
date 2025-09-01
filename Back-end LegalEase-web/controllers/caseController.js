const Case = require('../models/Case');
const Notification =require('../models/Notification');


exports.getCases= async (req,res)=>{
    try{
        let cases;
        if(req.user.userType==='lawyer'){
            cases = await Case.find({lawyer: req.user.id})
            .populate('client','name email')
            .populate('documents')
            .populate('appointments');
        }else{
            cases = await Case.find({client: req.user.id})
            .populate('lawyer','name email')
            .populate('documents')
            .populate('appointments');
        }
        res.json(cases);
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
};
 exports.getCase = async(req,res)=>{
    try{
        const caseItem = await Case.findById(req.params.id)
        .populate('client','name email')
        .populate('lawyer','name email userType')
        .populate('document')
        .populate('appointments')
        .populate('notes.createsBy','name');

        if(req.user.userType==='client' && caseItem.client._id.toString() !==req.user.id){
            return res.status(403).json({message: 'Access denied'});
        }
        
        if(req.user.userType==='lawyer' && caseItem.lawyer._id.toString() !==req.user.id){
            return res.status(403).json({message: 'Access denied'});
        }
        res.json(caseItem);
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
 };
 exports.createCase = async (req,res)=>{
    try{
        const {title, description,caseType,clientId}=req.body;
        const newCase = await Case.create({
            title,
            description,
            caseType,
            client: clientId,
            lawyer: req.user.id
        });
       await newCase.populate('client','name email');
       await newCase.populate('lawyer','name email userType');
       
       await User.findByIdAndUpdate(clientId,{
        $push: {cases: newCase._id}
       });
       await Notification.create({
        title:'New Case Created',
        message:`A new case "${title}" has been created for you.`,
        type:'case',
        recipient: clientId,
        relatedEnitity: newCase._id,
        onModel: 'Case'
  });
  res.status(201).json(newCase);
    } catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
 };
 exports.updateCase = async (req,res)=>{
    try{
        let caseItem = await Case.findById(req.params.id);

        if(!caseItem){
            return res.status(404).json({message: 'Case not found'})
        }
        if(req.user.userType==='client' && caseItem.client._id.toString() !==req.user.id){
            return res.status(403).json({message: 'Access denied'});
        }
    if(req.user.userType==='lawyer' && caseItem.lawyer._id.toString() !==req.user.id){
            return res.status(403).json({message: 'Access denied'});
        }
        caseItem.notes.push({
            content,
            createdBy: req.user.id
        });
        await caseItem.save();
        await caseItem.populate('notes.createdBy','name');

        const recipient = req.user.userType === 'client'? caseItem.lawyer: caseItem.client;

        await Notification.create({
        title:'New Case Created',
        message:`A new case "${title}" has been created for you.`,
        type:'case',
        recipient,
        relatedEnitity: caseItem._id,
        onModel: 'Case'
  });
   res.json(caseItem.notes);
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'})
    }
 };

 exports.deleteCase = async (req,res)=>{
    try{
        const caseItem = await Case.findById(req,params.id);
      if(!caseItem){
            return res.status(404).json({message: 'Case not found'})
        }
       if(caseItem.lawyer.toString() !==req.user.id){
            return res.status(403).json({message: 'Access denied'});
       } 
   await User.findByIdAndUpdate(caseItem.client,{
    $pull:{cases:caseItem._id}
   });  
   await User.findByIdAndUpdate(caseItem.lawyer,{
    $pull:{cases:caseItem._id}
   });   
   await Case.findByIdAndUpdate(req.params.id) 
   res.json({message: 'Case removed'})
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'})
    }
 };
 // Add this at the bottom of caseController.js

exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;

    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Permission check
    if (
      req.user.userType === 'client' &&
      caseItem.client.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (
      req.user.userType === 'lawyer' &&
      caseItem.lawyer.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Push new note
    caseItem.notes.push({
      content,
      createdBy: req.user.id,
    });

    await caseItem.save();
    await caseItem.populate('notes.createdBy', 'name');

    res.status(201).json(caseItem.notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
