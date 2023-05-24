//Importing all the libraries
const express = require("express");
const path = require("path")
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const MongoClient= require('mongodb').MongoClient;
const assert = require('assert');
const { google } = require('googleapis');
const multer = require('multer');
const streamifier = require('streamifier');
const cors = require('cors');
const upload = multer();
const credentials = require('./client.json');
const folderId = '1FyD8RY2jXh4zJoCivCqsqcSWKCOcr93r';

dotenv.config();

const app = express();
const dbName = "Yearbook2023"
var Router   = require('router')
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'Client','build')))  //Joining build folder
var router = Router()
app.use('/', router);
const client = new MongoClient(process.env.url);
mongoose.connect(                                              //Connecting MongoDB
  process.env.url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected")
);

app.get("*",async(req,res)=>{
    res.sendFile(path.join(__dirname,"Client","build","index.html"))
  });


//Declaring Schemas
  const responseSchema = {
    Email:String,
    FEmail:String,
    Message:String,
    Photo:String,
    Name:String,
    Profile_Biography:String,
    Profile_Pic:String,
    Your_Email_ID:String,
  };
  const juniorResponseSchema = {
    Email:String,
    FEmail:String,
    Message:String,
    Name:String
  };
  const profileseSchema = {
    Email:String,
    Name:String,
    Profile_Biography:String,
    Profile_Pic:String
  };
const confessionSchema = {
  Message:String
  };
const nameSchema = {
  Name:String
};  
const emailSchema = {
  Email:String
}; 


  const Response = mongoose.model("Response", responseSchema);
  const juniorResponse = mongoose.model("juniorResponse", responseSchema);
  const Confession = mongoose.model("Confession", confessionSchema);
  const Profile = mongoose.model("Profile", profileseSchema);
  const Name = mongoose.model("Name", nameSchema);
  const Email = mongoose.model("Email", nameSchema);

// routes to get responses from mongodb
  router.get("/Yearbook23/responses",async(req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('responses')
    collection.find({}).toArray(function(err,responses){
        assert.equal(err,null);
        res.json(responses);
    })
  })
  router.get("/Yearbook23/confession-responses",async(req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('confessions')
    collection.find({}).toArray(function(err,confessions){
        assert.equal(err,null);
        res.json(confessions);
    })
  })
  router.get("/Yearbook23/junior-responses",async(req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('juniorresponses')
    collection.find({}).toArray(function(err,juniorMessages){
        assert.equal(err,null);
        res.json(juniorMessages);
    })
  })
  router.get("/Yearbook23/profiles",async(req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('profiles')
    collection.find({}).toArray(function(err,profiles){
        assert.equal(err,null);
        res.json(profiles);
    })
  })
  router.get("/Yearbook23/names",async(req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('names')
    collection.find({}).toArray(function(err,names){
        assert.equal(err,null);
        res.json(names);
    })
  })
  router.get("/Yearbook23/mails",async(req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('emails')
    collection.find({}).toArray(function(err,emails){
        assert.equal(err,null);
        res.json(emails);
    })
  })

//Routes for adding responses, photos
  app.post("/Yearbook23/addresponse",function(req,res){  
    const message = req.body.message;                      // Getting all the data from the react-forms
    const mail = req.body.mailAddress;
    const FEmail = req.body.email;
    const name = req.body.name;
    const user = new Response({
      Email: mail,
      FEmail:FEmail,
      Message:message,
      Name:name
    });
  user.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User response saved successfully");
      }
    }); 
    res.redirect("/Yearbook23/students/"+FEmail+"/"+mail+"/"+name)  //Adding FEmail+ EMail+ name field so that after refreshing react can extract them from url
  })
  
  app.post("/Yearbook23/addConfession",function(req,res){  //for viewing customers
    const message = req.body.message;
    const user = new Confession({
      Message:message,
    });
  user.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User response saved successfully");
      }
    }); 
    res.redirect("/Yearbook23/Confessions")
  })
  app.post("/Yearbook23/addjuniorresponse",function(req,res){  //for viewing customers
    const message = req.body.message;
    const mail = req.body.mailAddress;
    const FEmail = req.body.email;
    const name = req.body.name;
    const user = new juniorResponse({
      Email: mail,
      FEmail:FEmail,
      Message:message,
      Name:name
    });
  user.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User response saved successfully");
      }
    }); 
    res.redirect("/Yearbook23/students/"+FEmail+"/"+mail+"/"+name)
  })

  //Function to check the size limit of file
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
  const checkFileSizeLimit = (req, res, next) => {
    if (req.headers['content-length'] > MAX_FILE_SIZE) {
      return res.status(400).json({ error: 'File size exceeds the limit' });
    }
    next();
  };
// Authenticate with Google Drive API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  const drive = google.drive({ version: 'v3', auth });
  
  // Handle file upload
  app.post('/upload',checkFileSizeLimit, upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
  
      // Create file metadata
      const fileMetadata = {
        name: file.originalname,
        parents: [folderId],
      };
  
      // Convert file buffer to readable stream
      const media = {
        mimeType: file.mimetype,
        body: streamifier.createReadStream(file.buffer),
      };
  
      // Upload the file to Google Drive
      const response = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'webViewLink',
      });
  
      const webViewLink = response.data.webViewLink;
  
      const fileId = webViewLink.match(/\/d\/(.+?)\//)[1];  ///Extracting folder-id from url
      res.json({ fileId });
    } catch (error) {
      console.error('Error uploading photo to Google Drive:', error);
      res.status(500).json({ error: 'Failed to upload photo' });
    }
  });

  //:email is there to get the email from react but is unncessary as done it in while uploading profiles
  app.post('/uploadMessageImg/:email',checkFileSizeLimit, upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      // const FEmail = req.body.email;
      const FEmail = req.params.email;
      const email = req.body.email;
  
      // Create file metadata
      const fileMetadata = {
        name: file.originalname,
        parents: ['1XcqE1r-jn395tkShm4kV9S-NjAwykYKl'],
      };
  
      // Convert file buffer to readable stream
      const media = {
        mimeType: file.mimetype,
        body: streamifier.createReadStream(file.buffer),
      };
  
      // Upload the file to Google Drive
      const response = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'webViewLink',
      });
  
      const webViewLink = await response.data.webViewLink;
      const fileId = webViewLink.match(/\/d\/(.+?)\//)[1];
      const link = "https:\/\/drive.google.com\/uc?id="+fileId
      const user = new Response({
         Photo:link,
         FEmail:FEmail
      });
    user.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User response saved successfully");
        res.redirect("/Yearbook23/students"+email)
      }
    }); 
    } catch (error) {
      console.error('Error uploading photo to Google Drive:', error);
      res.status(500).json({ error: 'Failed to upload photo' });
    }
  });
//Adding profiles of people
  app.post('/addProfile',checkFileSizeLimit, upload.single('file'), async (req, res) => {
    try {
      const file = req.file;                                       //Getting all the data from react-forms
      const Name = req.body.name;
    const bio = req.body.bio;
    const email = req.body.email;
  
      // Create file metadata
      const fileMetadata = {
        name: file.originalname,
        parents: ['1GvipI_NgE0J7-_1FzW_cFBgXx7oemrcF'], //folder-id
      };
  
      // Convert file buffer to readable stream
      const media = {
        mimeType: file.mimetype,
        body: streamifier.createReadStream(file.buffer),
      };
  
      // Upload the file to Google Drive
      const response = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'webViewLink',
      });
  
      const webViewLink = await response.data.webViewLink;
      const fileId = webViewLink.match(/\/d\/(.+?)\//)[1];
      const link = "https:\/\/drive.google.com\/uc?id="+fileId
      const user = new Profile({
        Name:Name,
        Email:email,
        Profile_Biography:bio,
        Profile_Pic:link,
      });
      const user2 = new Response({
        Name:Name,
        Your_Email_ID:email,
        Profile_Biography:bio,
        Profile_Pic:link,
      });
    user.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User response saved successfully");
      }
    }); 
    user2.save(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User response saved successfully");
      }
    }); 
    res.redirect("/Yearbook23")
    
    } catch (error) {
      console.error('Error uploading photo to Google Drive:', error);
      res.status(500).json({ error: 'Failed to upload photo' });
    }
  });

//For getting all the photos from specific google drive
router.get('/Yearbook23/photos', (req, res) => {
  const folderId = '183S7-HWbc2huCyoC50A4_MLEqmIkpouP';

  drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(name, webViewLink, thumbnailLink)',
  }, (err, response) => {
    if (err) {
      console.error('Error fetching photos from Google Drive:', err);
      res.status(500).json({ error: 'Failed to fetch photos' });
      return;
    }

    const photos = response.data.files;
    res.json(photos);
  });
});


const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
