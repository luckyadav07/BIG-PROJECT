import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getInitials } from "../../utils/formatters.js";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import useUIStore from "../../store/uiStore.js";

function ProfilePage() {
  const { user } = useAuth();
  const addToast = useUIStore((s) => s.addToast);
  const [skills, setSkills] = useState(["React", "JavaScript", "CSS"]);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast("Profile updated successfully!", "success");
    }, 1000);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="mx-auto h-28 w-28 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-3xl font-bold text-accent mb-4">
            {getInitials(user?.name)}
          </div>
          <h2 className="text-xl font-bold text-white">{user?.name}</h2>
          <p className="text-gray-400 text-sm mt-1">Software Engineer</p>
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-1">Profile Completion</p>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[95%] accent-gradient rounded-full" />
            </div>
            <p className="text-sm text-accent mt-1 font-semibold">95%</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={user?.name} />
              <Input label="Email" type="email" defaultValue={user?.email} disabled />
              <Input label="Phone" placeholder="+91 98765 43210" />
              <Input label="Location" placeholder="Bangalore, India" />
            </div>
            <Button className="mt-4" size="sm" loading={saving} onClick={handleSave}>Save</Button>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Professional Info</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Current Role" defaultValue="Software Engineer" />
              <Input label="Years of Experience" defaultValue="2" />
              <Input label="Industry" defaultValue="Technology" />
            </div>
            <Button className="mt-4" size="sm" onClick={handleSave}>Save</Button>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Skills</h3>
            <div className="flex gap-2 mb-3">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add skill..." className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent" />
              <Button size="sm" variant="outline" onClick={addSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent">
                  {s}
                  <button onClick={() => setSkills(skills.filter((sk) => sk !== s))} className="text-accent/60 hover:text-accent">&times;</button>
                </span>
              ))}
            </div>
            <Button className="mt-4" size="sm" onClick={handleSave}>Save</Button>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Resume</h3>
            <p className="text-sm text-gray-400 mb-3">Last uploaded: June 15, 2026</p>
            <div className="flex gap-3">
              <Button size="sm" variant="outline">Upload New Resume</Button>
              <Button size="sm" variant="secondary">Download Current</Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Social Links</h3>
            <div className="space-y-3">
              <Input label="LinkedIn" placeholder="https://linkedin.com/in/..." />
              <Input label="GitHub" placeholder="https://github.com/..." />
              <Input label="Portfolio" placeholder="https://..." />
            </div>
            <Button className="mt-4" size="sm" onClick={handleSave}>Save</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
