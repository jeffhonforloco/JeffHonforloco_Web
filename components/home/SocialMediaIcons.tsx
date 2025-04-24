
import React from 'react';
import { 
  Facebook, Twitter, Instagram, Youtube, 
  Linkedin, Globe, MessagesSquare
} from 'lucide-react';
import TiktokIcon from '../icons/TiktokIcon';
import PinterestIcon from '../icons/PinterestIcon';

const socialLinks = [
  { 
    name: "Facebook", 
    icon: <Facebook className="h-6 w-6" />, 
    url: "https://www.facebook.com/people/Jeff-Honforloco/61551819509232/",
    color: "bg-blue-600 hover:bg-blue-700"
  },
  { 
    name: "Instagram", 
    icon: <Instagram className="h-6 w-6" />, 
    url: "https://www.instagram.com/jeffhonforloco",
    color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600"
  },
  { 
    name: "TikTok", 
    icon: <TiktokIcon className="h-6 w-6" />, 
    url: "https://www.tiktok.com/@jeffhonforloco",
    color: "bg-black hover:bg-gray-900"
  },
  { 
    name: "X (Twitter)", 
    icon: <Twitter className="h-6 w-6" />, 
    url: "https://x.com/jeffhonforloco",
    color: "bg-black hover:bg-gray-900"
  },
  { 
    name: "YouTube", 
    icon: <Youtube className="h-6 w-6" />, 
    url: "https://www.youtube.com/@jeffhonforloco",
    color: "bg-red-600 hover:bg-red-700"
  },
  { 
    name: "LinkedIn", 
    icon: <Linkedin className="h-6 w-6" />, 
    url: "https://www.linkedin.com/in/jeffhonforloco/",
    color: "bg-blue-700 hover:bg-blue-800"
  },
  { 
    name: "Pinterest", 
    icon: <PinterestIcon className="h-6 w-6" />, 
    url: "https://www.pinterest.com/jeffhonforloco/",
    color: "bg-red-500 hover:bg-red-600"
  },
  { 
    name: "BlueSky", 
    icon: <Globe className="h-6 w-6" />, 
    url: "https://bsky.app/profile/jeffhonforloco.bsky.social",
    color: "bg-sky-500 hover:bg-sky-600"
  },
  { 
    name: "Reddit", 
    icon: <MessagesSquare className="h-6 w-6" />, 
    url: "https://www.reddit.com/user/jeffhonforloco/",
    color: "bg-orange-600 hover:bg-orange-700"
  },
  { 
    name: "Threads", 
    icon: <MessagesSquare className="h-6 w-6" />, 
    url: "https://www.threads.net/@jeffhonforloco",
    color: "bg-black hover:bg-gray-900"
  },
  { 
    name: "Tumblr", 
    icon: <MessagesSquare className="h-6 w-6" />, 
    url: "https://www.tumblr.com/jeffhonforloco",
    color: "bg-indigo-600 hover:bg-indigo-700"
  }
];

const SocialMediaIcons: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Connect With Me</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Follow my journey across all social media platforms
          </p>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4 max-w-5xl mx-auto">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all duration-300 hover:scale-105 shadow-md`}
              aria-label={`Follow on ${social.name}`}
            >
              {social.icon}
              <span className="text-xs font-medium mt-2 hidden sm:inline">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaIcons;
