import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    await User.deleteMany({});

    console.log("🗑 Old Users Deleted");

    const password = await bcrypt.hash("12345678", 10);

    const users = [
      {
        name: "Admin User",
        email: "admin@jobreach.ai",
        password,
        role: "admin",
        phone: "9999999999",
        skills: ["React", "Node.js", "MongoDB"],
        isActive: true,
      },

      {
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        password,
        role: "user",
        phone: "9876543201",
        skills: ["React", "JavaScript", "HTML", "CSS"],
        isActive: true,
      },

      {
        name: "Priya Verma",
        email: "priya@gmail.com",
        password,
        role: "user",
        phone: "9876543202",
        skills: ["Node.js", "Express", "MongoDB"],
        isActive: true,
      },

      {
        name: "Amit Kumar",
        email: "amit@gmail.com",
        password,
        role: "user",
        phone: "9876543203",
        skills: ["Java", "Spring Boot"],
        isActive: true,
      },

      {
        name: "Sneha Gupta",
        email: "sneha@gmail.com",
        password,
        role: "user",
        phone: "9876543204",
        skills: ["Python", "Django"],
        isActive: true,
      },

      {
        name: "Rohan Singh",
        email: "rohan@gmail.com",
        password,
        role: "user",
        phone: "9876543205",
        skills: ["AWS", "Docker"],
        isActive: true,
      },

      {
        name: "Ananya Patel",
        email: "ananya@gmail.com",
        password,
        role: "user",
        phone: "9876543206",
        skills: ["React", "Redux"],
        isActive: true,
      },

      {
        name: "Karan Mehta",
        email: "karan@gmail.com",
        password,
        role: "user",
        phone: "9876543207",
        skills: ["MongoDB", "Node.js"],
        isActive: true,
      },

      {
        name: "Neha Kapoor",
        email: "neha@gmail.com",
        password,
        role: "user",
        phone: "9876543208",
        skills: ["UI/UX", "Figma"],
        isActive: true,
      },

      {
        name: "Arjun Nair",
        email: "arjun@gmail.com",
        password,
        role: "user",
        phone: "9876543209",
        skills: ["Flutter", "Firebase"],
        isActive: true,
      },

      {
        name: "Vikram Joshi",
        email: "vikram@gmail.com",
        password,
        role: "user",
        phone: "9876543210",
        skills: ["Kotlin", "Android"],
        isActive: true,
      },

      {
        name: "Pooja Sharma",
        email: "pooja@gmail.com",
        password,
        role: "user",
        phone: "9876543211",
        skills: ["Swift", "iOS"],
        isActive: true,
      },

      {
        name: "Harsh Agarwal",
        email: "harsh@gmail.com",
        password,
        role: "user",
        phone: "9876543212",
        skills: ["C++", "DSA"],
        isActive: true,
      },

      {
        name: "Ayesha Khan",
        email: "ayesha@gmail.com",
        password,
        role: "user",
        phone: "9876543213",
        skills: ["SQL", "Power BI"],
        isActive: true,
      },

      {
        name: "Manish Yadav",
        email: "manish@gmail.com",
        password,
        role: "user",
        phone: "9876543214",
        skills: ["DevOps", "Docker", "Linux"],
        isActive: true,
      },

      {
        name: "Sakshi Jain",
        email: "sakshi@gmail.com",
        password,
        role: "user",
        phone: "9876543215",
        skills: ["Angular", "TypeScript"],
        isActive: true,
      },

      {
        name: "Deepak Mishra",
        email: "deepak@gmail.com",
        password,
        role: "user",
        phone: "9876543216",
        skills: ["PHP", "Laravel"],
        isActive: true,
      },

      {
        name: "Nikhil Arora",
        email: "nikhil@gmail.com",
        password,
        role: "user",
        phone: "9876543217",
        skills: ["Python", "Machine Learning"],
        isActive: true,
      },

      {
        name: "Ishita Roy",
        email: "ishita@gmail.com",
        password,
        role: "user",
        phone: "9876543218",
        skills: ["TensorFlow", "AI"],
        isActive: true,
      },

      {
        name: "Aditya Sinha",
        email: "aditya@gmail.com",
        password,
        role: "user",
        phone: "9876543219",
        skills: ["Cyber Security"],
        isActive: true,
      },

      {
        name: "Meera Iyer",
        email: "meera@gmail.com",
        password,
        role: "user",
        phone: "9876543220",
        skills: ["Networking", "Linux"],
        isActive: true,
      },

      {
        name: "Yash Malhotra",
        email: "yash@gmail.com",
        password,
        role: "user",
        phone: "9876543221",
        skills: ["React", "Next.js"],
        isActive: true,
      },

      {
        name: "Divya Arora",
        email: "divya@gmail.com",
        password,
        role: "user",
        phone: "9876543222",
        skills: ["Vue.js", "JavaScript"],
        isActive: true,
      },

      {
        name: "Sourabh Jain",
        email: "sourabh@gmail.com",
        password,
        role: "user",
        phone: "9876543223",
        skills: ["Go", "Microservices"],
        isActive: true,
      },

      {
        name: "Kunal Pal",
        email: "kunal@gmail.com",
        password,
        role: "user",
        phone: "9876543224",
        skills: ["Java", "React", "DSA", "Node.js"],
        isActive: true,
      },
    ];

    await User.insertMany(users);

    console.log(`🎉 ${users.length} Users Inserted Successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error Seeding Users:", error);
    process.exit(1);
  }
};

seedUsers();