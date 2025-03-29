const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { addData, upload,getAllData,getData,editData,deleteData} = require("../controllers/data.controller.js");

const router = express.Router();

router.post("/adddata", upload.single("file"), addData);
router.get("/getusers",getAllData)
router.get("/getuser/:id",getData)
router.put("/:id",upload.single('file'),editData)
router.delete("/:id",deleteData)


module.exports = router;
