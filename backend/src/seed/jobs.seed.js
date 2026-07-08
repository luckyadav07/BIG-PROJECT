import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/job.models.js";

dotenv.config();

const jobs = [
  {
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹18 LPA",
    description: "Develop modern React applications and collaborate with UI/UX teams.",
    status: "active",
    skills: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Backend Developer",
    company: "Microsoft",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹22 LPA",
    description: "Develop scalable backend APIs using Node.js and Azure.",
    status: "active",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Software Engineer",
    company: "Amazon",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹28 LPA",
    description: "Design distributed systems and cloud-native applications.",
    status: "active",
    skills: ["Java", "Spring Boot", "AWS"],
  },
  {
    title: "Full Stack Developer",
    company: "Flipkart",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹16 LPA",
    description: "Build complete MERN stack applications.",
    status: "active",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "React Developer",
    company: "Razorpay",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹20 LPA",
    description: "Develop payment dashboard using React and TypeScript.",
    status: "active",
    skills: ["React", "Redux", "TypeScript"],
  },
  {
    title: "Node.js Developer",
    company: "PhonePe",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹19 LPA",
    description: "Develop high-performance backend services.",
    status: "active",
    skills: ["Node.js", "Express", "Redis"],
  },
  {
    title: "Frontend Engineer",
    company: "Adobe",
    location: "Noida",
    type: "Full-time",
    salary: "₹17 LPA",
    description: "Create responsive UI for enterprise software.",
    status: "active",
    skills: ["React", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Software Developer",
    company: "Atlassian",
    location: "Remote",
    type: "Full-time",
    salary: "₹25 LPA",
    description: "Build collaboration tools and cloud products.",
    status: "active",
    skills: ["Java", "React", "PostgreSQL"],
  },
  {
    title: "Backend Intern",
    company: "Paytm",
    location: "Noida",
    type: "Internship",
    salary: "₹40,000/month",
    description: "Assist backend engineers in API development.",
    status: "active",
    skills: ["Node.js", "MongoDB"],
  },
  {
    title: "Java Developer",
    company: "Oracle",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹21 LPA",
    description: "Develop enterprise Java applications.",
    status: "active",
    skills: ["Java", "SQL", "Spring"],
  },
  {
    title: "Machine Learning Engineer",
    company: "NVIDIA",
    location: "Pune",
    type: "Full-time",
    salary: "₹30 LPA",
    description: "Develop AI models for GPU acceleration.",
    status: "active",
    skills: ["Python", "TensorFlow", "PyTorch"],
  },
  {
    title: "DevOps Engineer",
    company: "Infosys",
    location: "Pune",
    type: "Full-time",
    salary: "₹14 LPA",
    description: "Manage CI/CD pipelines and cloud infrastructure.",
    status: "active",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
  {
    title: "Data Analyst",
    company: "Accenture",
    location: "Mumbai",
    type: "Full-time",
    salary: "₹12 LPA",
    description: "Analyze business data using SQL and Power BI.",
    status: "active",
    skills: ["SQL", "Power BI", "Excel"],
  },
  {
    title: "Python Developer",
    company: "Zoho",
    location: "Chennai",
    type: "Full-time",
    salary: "₹11 LPA",
    description: "Develop backend services in Python.",
    status: "active",
    skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    title: "Cloud Engineer",
    company: "IBM",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹18 LPA",
    description: "Deploy enterprise cloud infrastructure.",
    status: "active",
    skills: ["AWS", "Terraform", "Docker"],
  },
  {
    title: "Android Developer",
    company: "Swiggy",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹17 LPA",
    description: "Develop Android applications using Kotlin.",
    status: "active",
    skills: ["Kotlin", "Android", "Firebase"],
  },
  {
    title: "iOS Developer",
    company: "Apple",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹32 LPA",
    description: "Develop native iOS applications.",
    status: "active",
    skills: ["Swift", "UIKit", "iOS"],
  },
  {
    title: "QA Automation Engineer",
    company: "TCS",
    location: "Delhi",
    type: "Full-time",
    salary: "₹10 LPA",
    description: "Automate software testing pipelines.",
    status: "active",
    skills: ["Selenium", "Java", "TestNG"],
  },
  {
    title: "Cyber Security Analyst",
    company: "Wipro",
    location: "Mumbai",
    type: "Full-time",
    salary: "₹15 LPA",
    description: "Monitor and secure enterprise networks.",
    status: "active",
    skills: ["Networking", "Linux", "Security"],
  },
  {
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Remote",
    type: "Contract",
    salary: "₹13 LPA",
    description: "Design modern user interfaces and experiences.",
    status: "active",
    skills: ["Figma", "Adobe XD", "UI Design"],
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    await Job.deleteMany({});

    console.log("🗑 Old Jobs Deleted");

    await Job.insertMany(jobs);

    console.log(`🎉 ${jobs.length} Jobs Inserted Successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error Seeding Jobs:", error);
    process.exit(1);
  }
};

seedJobs();