import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getInitials } from "../../utils/formatters.js";
import Dropdown, { DropdownItem } from "../common/Dropdown.jsx";

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Dropdown
      align="right"
      trigger={
        <button
          type="button"
          className="focus-ring flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2.5 transition-all duration-200 hover:bg-[var(--sidebar-hover-bg)]"
          aria-label="User menu"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold text-white accent-gradient"
            aria-hidden
          >
            {getInitials(user?.name)}
          </div>
          <div className="hidden md:block text-left">
            <p
              className="text-sm font-medium leading-tight truncate max-w-[120px]"
              style={{ color: "var(--text-primary)" }}
            >
              {user?.name}
            </p>
            <p
              className="text-xs leading-tight truncate max-w-[120px]"
              style={{ color: "var(--text-muted)" }}
            >
              {user?.role === "admin" ? "Admin" : "Member"}
            </p>
          </div>
        </button>
      }
    >
      {(close) => (
        <>
          <div
            className="px-3 py-2.5 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p
              className="text-sm font-medium truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {user?.name}
            </p>
            <p
              className="text-xs truncate mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {user?.email}
            </p>
          </div>
          <DropdownItem
            icon={User}
            onClick={() => {
              close();
              navigate("/profile");
            }}
          >
            Profile
          </DropdownItem>
          {user?.role === "admin" && (
            <DropdownItem
              icon={Settings}
              onClick={() => {
                close();
                navigate("/admin");
              }}
            >
              Admin Panel
            </DropdownItem>
          )}
          <div
            className="my-1 border-t"
            style={{ borderColor: "var(--border-color)" }}
          />
          <DropdownItem icon={LogOut} onClick={handleLogout} danger>
            Logout
          </DropdownItem>
        </>
      )}
    </Dropdown>
  );
}

export default UserMenu;
