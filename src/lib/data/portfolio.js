export const bio = {
  name: 'Abdulkareem Rukayat',
  title: 'Frontend Developer',
  tagline: 'I build fast, beautiful, and accessible web experiences.',
  about: `I'm a frontend developer with a passion for crafting clean, responsive user interfaces. 
  I work with React, JavaScript, Tailwind CSS, and HTML/CSS to build products that are both 
  functional and delightful to use. I care deeply about performance, accessibility, and 
  the details that make an interface feel polished.`,
  email: 'abdulkareemrukayat18@gmail.com',
  github: 'https://github.com/adebimpe01',
  linkedin: 'https://www.linkedin.com/in/abdulkareem-rukayat-b743a6247/',
  twitter: 'https://x.com/@abdulkareemru19',
  resume: '/resume.pdf',
};

export const skills = [
  { name: 'React', level: 90, category: 'framework' },
  { name: 'JavaScript', level: 88, category: 'language' },
  { name: 'HTML', level: 95, category: 'language' },
  { name: 'CSS', level: 92, category: 'language' },
  { name: 'Tailwind CSS', level: 90, category: 'styling' },
  { name: 'TypeScript', level: 72, category: 'language' },
  { name: 'Git', level: 80, category: 'tool' },
  { name: 'Figma', level: 70, category: 'tool' },
  { name: 'REST APIs', level: 82, category: 'tool' },
  { name: 'Responsive Design', level: 93, category: 'skill' },
];

export const projects = [
  {
    id: 1,
    title: 'Ecommerce',
    description: 'A fully responsive e-commerce frontend featuring product listing, cart management, and a smooth checkout flow. Built with React and Tailwind CSS for a clean, modern shopping experience.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/adebimpe01/react-ecommerce-frontend',
    live: 'https://ecommerce-frontend-three-blush.vercel.app/',
    color: '#00f5d4',
    featured: true,
  },
  {
    id: 2,
    title: 'Todo App',
    description: 'A clean and intuitive todo application for managing daily tasks. Features include adding, completing, and deleting tasks with a minimal UI built using vanilla HTML, CSS and JavaScript.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/adebimpe01/hng-todo-task0',
    live: 'https://hng-todo-task0.vercel.app/',
    color: '#7c3aed',
    featured: true,
  },
  {
    id: 3,
    title: 'Invoice',
    description: 'An invoice management app that lets users create, view, and track invoices. Built with React and Tailwind CSS with a focus on clean data presentation and usability.',
    tech: ['React', 'Tailwind CSS'],
    github: 'https://github.com/adebimpe01/invoive',
    live: 'https://invoive-pied.vercel.app/',
    color: '#f77f00',
    featured: false,
  },
  {
    id: 4,
    title: 'Color Palette Generator',
    description: 'A fun and useful tool that generates harmonious color palettes instantly. Users can explore and copy color codes for use in their design and development projects.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/adebimpe01/color-palette-generator',
    live: 'https://color-palette-generator-green-eight.vercel.app/',
    color: '#f72585',
    featured: false,
  },
];

export const aiContext = `
You are an AI assistant for Abdulkareem Rukayat's developer portfolio.

About Rukayat:
- Frontend Developer
- Skills: React, JavaScript, HTML, CSS, Tailwind CSS, TypeScript (basic), Git, Figma, REST APIs
- Passionate about building fast, accessible, and beautiful user interfaces
- Email: abdulkareemrukayat18@gmail.com
- GitHub: https://github.com/adebimpe01
- LinkedIn: https://www.linkedin.com/in/abdulkareem-rukayat-b743a6247/

Projects:
1. Ecommerce - Responsive e-commerce frontend (React, Tailwind CSS, JavaScript)
2. Todo App - Task management app (HTML, CSS, JavaScript)
3. Invoice - Invoice management app (React, Tailwind CSS)
4. Color Palette Generator - Color tool (HTML, CSS, JavaScript)

Answer questions about Rukayat's skills, projects, and experience in a friendly, professional tone.
Keep answers concise (2-4 sentences). If asked something you don't know, say so honestly.
Don't make up information not provided here.
`;