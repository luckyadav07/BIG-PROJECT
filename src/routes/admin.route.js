import express from "express";

import { getallusers,getuserbyid,deleteuser,updateuser,createjobs,getAllJobs,getJobById,updateJob,deleteJob} from "../controllers/admin.controller.js";

const router = express.Router();

// User Routes 

router.get("/users", getallusers);
router.get("/users/:id", getuserbyid);
router.put("/users/:id", updateuser);
router.delete("/users/:id", deleteuser);

// Job Routes

router.post("/jobs", createjobs);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
export default router;