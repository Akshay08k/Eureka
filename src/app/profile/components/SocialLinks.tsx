import { FiSave } from "react-icons/fi";
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa6";
import { useState } from "react";
import InputField from "./InputField";

const SocialLinks = () => {
  const [links, setLinks] = useState({
    github: "",
    twitter: "",
    linkedin: "",
    website: "",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-black dark:text-gray-300">
          Social Links
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Connect your social media accounts
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="GitHub"
            type="url"
            value={links.github}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinks((prev) => ({ ...prev, github: e.target.value }))
            }
            placeholder="https://github.com/username"
            icon={FaGithub}
          />
          <InputField
            label="Twitter"
            type="url"
            value={links.twitter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinks((prev) => ({ ...prev, twitter: e.target.value }))
            }
            placeholder="https://twitter.com/username"
            icon={FaTwitter}
          />
          <InputField
            label="LinkedIn"
            type="url"
            value={links.linkedin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinks((prev) => ({ ...prev, linkedin: e.target.value }))
            }
            placeholder="https://linkedin.com/in/username"
            icon={FaLinkedin}
          />
          <InputField
            label="Portfolio"
            type="url"
            value={links.website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinks((prev) => ({ ...prev, website: e.target.value }))
            }
            placeholder="https://yourportfolio.com"
            icon={FaGlobe}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="flex items-center px-6 py-3 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#6C63FF" }}
          >
            <FiSave className="w-4 h-4 mr-2" />
            Save Social Links
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
