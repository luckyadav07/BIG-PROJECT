import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getInitials } from "../../utils/formatters.js";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import useUIStore from "../../store/uiStore.js";
import { uploadResume } from "../../services/resumeService.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Briefcase, Building, 
  Sparkles, Plus, X, UploadCloud, Link as LinkIcon, Globe, 
  FileText, CheckCircle2, AlertTriangle, Activity
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function ProfilePage() {
  const { user } = useAuth();
  const showToast = useUIStore((s) => s.showToast);
  const [skills, setSkills] = useState(["React", "JavaScript", "CSS", "Node.js", "Tailwind CSS"]);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  // States for other input values so they are interactive
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Bangalore, India");
  const [role, setRole] = useState("Software Engineer");
  const [experience, setExperience] = useState("2");
  const [industry, setIndustry] = useState("Technology");
  
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/lucky-adav");
  const [github, setGithub] = useState("https://github.com/luckyadav07");
  const [portfolio, setPortfolio] = useState("https://luckyadav.dev");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast({ message: "Profile updated successfully!", type: "success" });
    }, 1000);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (s) => {
    setSkills(skills.filter((sk) => sk !== s));
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast({ message: "Please upload a PDF file.", type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast({ message: "Resume must be smaller than 5 MB.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      setResumeData(null);

      const data = await uploadResume(formData);

      setResume(file);
      setResumeData(data);

      showToast({ message: "Resume uploaded successfully!", type: "success" });
    } catch (err) {
      console.error(err);
      showToast({ message: "Resume upload failed", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
          <User className="text-accent" />
          My Profile Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          Manage your professional details, skills, social profiles, and parsed resume analyses.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-3 gap-6 items-start"
      >
        {/* Left Side: Profile Banner & Stats */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Avatar Banner Card */}
          <motion.div variants={itemVariants}>
            <Card className="text-center border border-white/5 relative overflow-hidden p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="mx-auto h-24 w-24 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-3xl font-extrabold text-accent-light mb-4 shadow-sm relative group overflow-hidden">
                {getInitials(user?.name)}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-[10px] uppercase font-bold text-white tracking-wider">Edit</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight">{user?.name}</h2>
              <p className="text-gray-400 text-sm font-semibold mt-1 flex items-center justify-center gap-1.5">
                <Briefcase size={13} className="text-accent-light" />
                {role}
              </p>
              
              <div className="mt-6 border-t border-white/5 pt-5 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-2">
                  <span>Profile Completion</span>
                  <span className="text-accent-light font-extrabold">95%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full accent-gradient rounded-full" 
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Stats Panel */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-5">
              <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-1.5">
                <Activity size={15} className="text-accent-light" />
                Application Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] uppercase font-extrabold text-gray-500 tracking-wider">Applied</span>
                  <p className="text-xl font-black text-white mt-1">12</p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] uppercase font-extrabold text-gray-500 tracking-wider">Interviews</span>
                  <p className="text-xl font-black text-emerald-400 mt-1">3</p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] uppercase font-extrabold text-gray-500 tracking-wider">Saved Jobs</span>
                  <p className="text-xl font-black text-white mt-1">8</p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <span className="text-[10px] uppercase font-extrabold text-gray-500 tracking-wider">Audit Score</span>
                  <p className="text-xl font-black text-accent-light mt-1">84</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity Log */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-5">
              <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-1.5">
                <Activity size={15} className="text-accent-light" />
                Profile Timeline
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Applied to Frontend Developer", desc: "Google • 2 hours ago", accent: "bg-blue-500" },
                  { title: "Analyzed Resume Auditing", desc: "LUCKY resume.pdf • 1 day ago", accent: "bg-emerald-500" },
                  { title: "Completed Career Coach Chat", desc: "Interview prep guidelines • 2 days ago", accent: "bg-purple-500" }
                ].map((act, idx) => (
                  <div key={idx} className="flex gap-3 text-xs text-left relative">
                    {idx < 2 && (
                      <div className="absolute left-[5px] top-3.5 bottom-0 w-[1px] bg-white/5" />
                    )}
                    <span className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1 ${act.accent}`} />
                    <div>
                      <p className="font-bold text-white">{act.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Right Side: Inputs & Information */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-6">
              <h3 className="font-bold text-base text-white mb-5 pb-2 border-b border-white/5 flex items-center gap-2">
                <User size={16} className="text-accent" />
                Personal Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={user?.name} />
                <Input label="Email Address" type="email" defaultValue={user?.email} disabled />
                <Input 
                  label="Contact Phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+91 98765 43210" 
                />
                <Input 
                  label="Contact Location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="Bangalore, India" 
                />
              </div>
              <Button className="mt-5 font-bold" size="sm" loading={saving} onClick={handleSave}>
                Save Changes
              </Button>
            </Card>
          </motion.div>

          {/* Professional Information */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-6">
              <h3 className="font-bold text-base text-white mb-5 pb-2 border-b border-white/5 flex items-center gap-2">
                <Briefcase size={16} className="text-accent" />
                Professional Credentials
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input 
                  label="Current Title Role" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                />
                <Input 
                  label="Years of Experience" 
                  value={experience} 
                  onChange={(e) => setExperience(e.target.value)} 
                />
                <Input 
                  label="Industry Segment" 
                  value={industry} 
                  onChange={(e) => setIndustry(e.target.value)} 
                />
              </div>
              <Button className="mt-5 font-bold" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </Card>
          </motion.div>

          {/* Skills Checklist Card */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-6">
              <h3 className="font-bold text-base text-white mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                Technical Capabilities
              </h3>
              <div className="flex gap-2.5 mb-4">
                <input 
                  value={skillInput} 
                  onChange={(e) => setSkillInput(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} 
                  placeholder="Type new skill tag..." 
                  className="flex-1 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200" 
                  style={{ background: "rgba(255, 255, 255, 0.01)" }}
                />
                <Button size="sm" variant="outline" onClick={addSkill} className="font-bold px-4 flex items-center gap-1">
                  <Plus size={14} /> Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {skills.map((s) => (
                    <motion.span 
                      key={s} 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold text-accent-light hover:bg-white/10 transition-colors"
                    >
                      {s}
                      <button 
                        onClick={() => removeSkill(s)} 
                        className="text-gray-500 hover:text-white transition duration-200 cursor-pointer ml-1 text-sm leading-none"
                      >
                        &times;
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              
              <Button className="mt-5 font-bold" size="sm" onClick={handleSave}>
                Save Skills
              </Button>
            </Card>
          </motion.div>

          {/* Resume Upload Card */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="font-bold text-base text-white mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
                <FileText size={16} className="text-accent" />
                Resume Document
              </h3>

              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.005] hover:border-accent/20 transition-all duration-200 relative mb-5">
                <input
                  type="file"
                  id="profile-resume-upload"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                
                <UploadCloud size={32} className="text-gray-500 mb-3" />
                
                <button
                  type="button"
                  onClick={() => document.getElementById("profile-resume-upload").click()}
                  className="rounded-lg bg-accent text-white font-bold text-xs px-4 py-2 hover:bg-accent-light transition cursor-pointer mb-2"
                >
                  Choose PDF Resume
                </button>
                
                <span className="text-[10px] text-gray-500">PDF formats up to 5 MB.</span>
              </div>

              {resume && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-4">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>Uploaded document: <strong className="text-white">{resume.name}</strong></span>
                </div>
              )}

              {uploading && (
                <div className="flex items-center gap-2 text-xs font-semibold text-yellow-400 mb-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-3.5 w-3.5 border-2 border-yellow-400 border-t-transparent rounded-full"
                  />
                  <span>Parsing and scanning document metadata...</span>
                </div>
              )}

              {/* Parsed Resume Details Dashboard */}
              <AnimatePresence>
                {resumeData?.analysis && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-5 pt-3 overflow-hidden"
                  >
                    <div className="rounded-2xl bg-blue-500/5 border border-blue-500/15 p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                      <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-blue-400" />
                        Extracted Metrics
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] uppercase font-bold text-gray-500">Skills</p>
                          <p className="text-xl font-black text-white mt-1">
                            {resumeData.analysis.skills?.length || 0}
                          </p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] uppercase font-bold text-gray-500">Projects</p>
                          <p className="text-xl font-black text-white mt-1">
                            {resumeData.analysis.projects || 0}
                          </p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] uppercase font-bold text-gray-500">Exp (Yrs)</p>
                          <p className="text-xl font-black text-white mt-1">
                            {resumeData.analysis.experience || 0}
                          </p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] uppercase font-bold text-gray-500">Education</p>
                          <p className="text-xl font-black text-white mt-1">
                            {resumeData.analysis.education?.length || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Personal Info Details */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <h4 className="font-bold text-xs text-white mb-2.5">Personal Details</h4>
                        <div className="space-y-1.5 text-xs text-gray-300">
                          <p><strong className="text-gray-500 font-semibold">Name:</strong> {resumeData.analysis.name || "N/A"}</p>
                          <p><strong className="text-gray-500 font-semibold">Email:</strong> {resumeData.analysis.email || "N/A"}</p>
                          <p><strong className="text-gray-500 font-semibold">Phone:</strong> {resumeData.analysis.phone || "N/A"}</p>
                        </div>
                      </div>

                      {/* Education Summary */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <h4 className="font-bold text-xs text-white mb-2.5">Education summary</h4>
                        <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1">
                          {(resumeData.analysis.education || []).map((edu, index) => (
                            <li key={index} className="leading-relaxed">{edu}</li>
                          ))}
                          {(!resumeData.analysis.education || resumeData.analysis.education.length === 0) && (
                            <span className="text-gray-500">No education blocks found.</span>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Strengths */}
                      <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.005] hover:border-emerald-500/20 transition-colors">
                        <h4 className="font-bold text-xs text-emerald-400 mb-3 flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> Resume Strengths
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-300 leading-normal">
                          <li className="flex items-start gap-1.5">✅ <span className="mt-0.5">Contact information detected</span></li>
                          <li className="flex items-start gap-1.5">✅ <span className="mt-0.5">Technical skills are clearly listed</span></li>
                          <li className="flex items-start gap-1.5">✅ <span className="mt-0.5">Projects section included</span></li>
                          <li className="flex items-start gap-1.5">✅ <span className="mt-0.5">Education section found</span></li>
                          {resumeData.analysis.experience > 0 && (
                            <li className="flex items-start gap-1.5">✅ <span className="mt-0.5">Experience section available</span></li>
                          )}
                        </ul>
                      </div>

                      {/* AI Suggestions */}
                      <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.005] hover:border-amber-500/20 transition-colors">
                        <h4 className="font-bold text-xs text-amber-400 mb-3 flex items-center gap-1.5">
                          <AlertTriangle size={13} /> AI Suggestions
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-300">
                          <li className="flex items-start gap-2"><span>•</span> <span>Add a professional summary at the top.</span></li>
                          <li className="flex items-start gap-2"><span>•</span> <span>Quantify project achievements with numbers.</span></li>
                          <li className="flex items-start gap-2"><span>•</span> <span>Tailor resume for each job application.</span></li>
                          {resumeData.analysis.missingSkills?.length > 0 && (
                            <li className="flex items-start gap-2">
                              <span>•</span> 
                              <span>
                                Consider learning: <strong className="text-amber-300 font-semibold">{resumeData.analysis.missingSkills.slice(0, 3).join(", ")}</strong>
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Social Profiles */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 p-6">
              <h3 className="font-bold text-base text-white mb-5 pb-2 border-b border-white/5 flex items-center gap-2">
                <Globe size={16} className="text-accent" />
                Social Profiles
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 relative">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                    <LinkIcon size={16} />
                  </div>
                  <Input 
                    label="LinkedIn Profile" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)} 
                    placeholder="https://linkedin.com/in/..." 
                    className="flex-1 !m-0"
                  />
                </div>

                <div className="flex items-center gap-3 relative">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                    <LinkIcon size={16} />
                  </div>
                  <Input 
                    label="GitHub Account" 
                    value={github} 
                    onChange={(e) => setGithub(e.target.value)} 
                    placeholder="https://github.com/..." 
                    className="flex-1 !m-0"
                  />
                </div>

                <div className="flex items-center gap-3 relative">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                    <Globe size={16} />
                  </div>
                  <Input 
                    label="Portfolio URL" 
                    value={portfolio} 
                    onChange={(e) => setPortfolio(e.target.value)} 
                    placeholder="https://..." 
                    className="flex-1 !m-0"
                  />
                </div>
              </div>
              <Button className="mt-5 font-bold" size="sm" onClick={handleSave}>
                Save Profiles
              </Button>
            </Card>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
