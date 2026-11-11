/*
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
  Everything on the site is generated from the details below.

  - Add items inside the [ ] of projects or skills and that section appears
    on the site. While a list is empty, its section stays hidden.
  - Leave a link or optional field as "" and it will not be shown.

  Example project:
    { title: "Name", summary: "What it does and your part in it.", tags: ["Python"], link: "https://..." }

  Example skills group:
    { group: "Security", items: ["Networking", "Linux"] }
*/
window.PORTFOLIO = {
  name: "Diveshanand Theekoy",
  title: "IT & Cybersecurity Student",
  location: "Pamplemousses",
  intro: "Diploma in IT (Cybersecurity) student at Polytechnics Mauritius. Passionate about ethical hacking and intrusion prevention systems. Skilled in identifying vulnerabilities and building practical solutions.",

  // To show a job, replace null with:
  // { role: "Job title", organisation: "Company", since: "", summary: "" }
  current: null,

  // Most recent first. Add or remove { } blocks as needed.
  education: [
    {
      degree: "Diploma in IT (Cybersecurity)",
      school: "Polytechnics Mauritius, Cyber Tower 1 (10th floor), Ebene",
      // Shown under "Studying" at the top of the page.
      campus: "Polytechnics Mauritius, Cyber Tower 1, 10th floor, Ebene",
      period: "2024 to Present",
      details: "Studying information technology with a focus on cybersecurity. Developing skills in ethical hacking, intrusion prevention systems (IPS) and digital security practices."
    },
    {
      degree: "School Certificate (SC)",
      school: "Universal College, Riviere du Rempart",
      period: "2016 to 2023",
      details: "Credits in Mathematics, Additional Mathematics and Computer Science."
    }
  ],

  // Most recent first. Add or remove { } blocks as needed.
  experience: [
    {
      role: "Cashier and Fast Food Operator (part-time)",
      organisation: "Burger King, Grand Baie",
      period: "Jun 2026 to Present",
      summary: "Handle customer transactions accurately and efficiently. Prepare food to company standards and hygiene protocols."
    },
    {
      role: "Security Guard",
      organisation: "Mauriguard Ltd, Port Louis",
      period: "Oct 2023 to Feb 2024",
      summary: "Monitored premises to ensure safety and prevent unauthorised access."
    }
  ],

  // How many certificates each group shows before the "Show all" button.
  certificatesShown: 5,

  // Certificates in groups. Each group gets its own heading on the site.
  // type is shown as a small label (e.g. "Participation"); link adds a "Verify certificate" link.
  certifications: [
    {
      group: "Technology & Cybersecurity",
      items: [
        {
          title: "Capture the Flag: Hack the Campus",
          issuer: "Middlesex University",
          date: "Sep 2026",
          type: "Participation"
        },
        {
          title: "Game of Code",
          issuer: "Curtin Mauritius",
          date: "Jun 2026",
          type: "Participation"
        },
        {
          title: "Master Gemini",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-ZG39SC"
        },
        {
          title: "Master AI for PowerPoint",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-QNM42B"
        },
        {
          title: "Master AI for Microsoft 365",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-UQCJVY"
        },
        {
          title: "Master Claude AI for Excel",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-Y9T5PC"
        },
        {
          title: "AI Productivity System",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-GJCB3T"
        },
        {
          title: "Claude AI: Think Smarter, Work Faster",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-G9BC97"
        },
        {
          title: "Unlock Your Growth Mindset",
          issuer: "SuccessWise.ai",
          date: "Nov 2026",
          type: "Completion",
          link: "https://successwise.ai/certificate/SW-2026-2P2FQ2"
        }
      ]
    },
    {
      group: "Professional Development",
      items: [
        {
          title: "Burger King University (all courses)",
          issuer: "Restaurant Brands International (RBI)",
          date: "Aug 2026",
          type: "Completion"
        },
        {
          title: "Soft Skills Programme",
          issuer: "Polytechnics Mauritius & Economic Development Board",
          date: "Apr 2024",
          type: "Participation"
        },
        {
          title: "Youth Empowerment Programme",
          issuer: "Universal College & Art of Living Foundation",
          date: "May 2023",
          type: "Completion"
        }
      ]
    }
  ],

  projects: [
    {
      title: "Life Powered by Tech",
      summary: "A community map where people in Mauritius report flooded or blocked roads during cyclones and heavy rain, with photos. Built for the IET \"Life Powered by Tech\" hackathon. Security built in: database row-level security, secret keys kept on the server only, email and password login, and rate limiting based on a hashed IP address to stop spam.",
      tags: ["Next.js", "TypeScript", "Supabase", "Security"],
      link: "https://life-power-by-tech.vercel.app"
    },
    {
      title: "Enterprise network lab (Cisco Packet Tracer)",
      summary: "Built and configured Cisco router and switch networks: data and voice VLANs, VLAN trunking across three switches, CDP/LLDP device discovery, and NAT/PAT to give a private network internet access through a simulated ISP. Tested with show commands and pings, then assessed the security risks, such as discovery protocols leaking device details. Pair project, Polytechnics Mauritius (Nov 2025).",
      tags: ["Cisco Packet Tracer", "VLANs", "NAT/PAT", "CDP/LLDP", "Network security"],
      link: "",
      // Screenshots shown as a small gallery. Click one to enlarge it.
      images: [
        { src: "img/lab-nat.png", caption: "NAT/PAT: private network reaching a server through an ISP router" },
        { src: "img/lab-vlan-trunk.png", caption: "VLAN trunking across three switches" },
        { src: "img/lab-lldp.png", caption: "LLDP with data and voice VLANs for an IP phone" },
        { src: "img/lab-cdp.png", caption: "CDP neighbour discovery between two routers and a switch" }
      ]
    },
    {
      title: "Blackjack game",
      summary: "A full blackjack game in the browser: betting chips, hit, stand, double down, splitting pairs and insurance, with a six-deck shoe and keyboard shortcuts. Works on desktop and phone.",
      tags: ["React", "TypeScript", "Vite"],
      link: "https://blackjack-one-teal.vercel.app"
    }
  ],

  skills: [
    { group: "Cybersecurity", items: ["Ethical hacking", "Intrusion prevention (IPS)", "SQL injection prevention", "Capture the Flag"] },
    { group: "Programming", items: ["C programming (Code::Blocks)", "HTML", "SQL & MySQL"] },
    { group: "Networking", items: ["Cisco Packet Tracer", "Network design", "Configuration", "Troubleshooting"] }
  ],

  // Shown under "Personal skills" in the Skills section.
  personalSkills: [
    "Teamwork",
    "Calm under pressure",
    "Discipline and consistency",
    "Stamina and healthy lifestyle",
    "Customer service and communication",
    "Time management"
  ],

  contact: {
    email: "diveshtheekoy56@gmail.com",
    studentEmail: "dtheekoy.student2024@poly.ac.mu",
    phone: "5818 3194",
    linkedin: "https://www.linkedin.com/in/diveshanand-theekoy-b787a9327/",
    github: "https://github.com/diveshtheekoy19",
    tryhackme: "https://tryhackme.com/p/diveshtheekoy56"
  }
};
