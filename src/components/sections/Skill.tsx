import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
	Settings,
	MonitorSmartphone,
	Terminal,
} from 'lucide-react';
import { IconBrandCss3, IconBrandGit, IconBrandGithub, IconBrandHtml5, IconBrandJavascript, IconBrandNextjs, IconBrandNodejs, IconBrandPython, IconBrandReact, IconBrandTailwind, IconBrandVue } from '@tabler/icons-react';

const skills = [
	{
		group: 'Frontend',
		items: [
			{ name: 'React', icon: <IconBrandReact className="text-blue-500" /> },
			{ name: 'Vue', icon: <IconBrandVue className="text-green-500" /> },
			{ name: 'HTML', icon: <IconBrandHtml5 className="text-green-500" /> },
			{ name: 'CSS', icon: <IconBrandCss3 className="text-green-500" /> },
			{ name: 'Next.js', icon: <IconBrandNextjs className="text-black dark:text-white" /> },
			{ name: 'TailwindCSS', icon: <IconBrandTailwind className="text-sky-400" /> },
			{ name: 'JavaScript', icon: <IconBrandJavascript className="text-orange-600" /> },
			{ name: 'Responsive Design', icon: <MonitorSmartphone className="text-purple-500" /> },
		],
	},
	{
		group: 'Backend',
		items: [
			{ name: 'Node.js', icon: <IconBrandNodejs className="text-green-700" /> },
			{ name: 'Express', icon: <Terminal className="text-gray-700" /> },
			{ name: 'NestJS', icon: <i className="devicon-nestjs-original"></i> },
			{ name: 'Java', icon: <i className="devicon-java-plain colored"></i> },
			{ name: 'C', icon: <i className="devicon-c-original"></i> },
			{ name: 'Python', icon: <IconBrandPython className="text-yellow-500" /> },
			{ name: 'Supabase', icon: <i className="devicon-supabase-plain colored"></i> },
			{ name: 'MongoDB', icon: <i className="devicon-mongodb-plain colored"></i> },
			{ name: 'SQLIte', icon: <i className="devicon-sqlite-plain colored"></i> },
			{ name: 'PostgreSQL', icon: <i className="devicon-postgresql-plain colored"></i> },
		],
	},
	{
		group: 'Tooling',
		items: [
			{ name: 'Git', icon: <IconBrandGit className="text-black dark:text-white" /> },
			{ name: 'GitHub', icon: <IconBrandGithub className="text-black dark:text-white" /> },
			{ name: 'Version Control', icon: <Settings className="text-gray-500" /> },
			{ name: 'Linux', icon: <i className="devicon-linux-plain"></i> },
			{ name: 'JSON', icon: <i className="devicon-json-plain"></i> },
			{name: 'Mongoose', icon: <i className="devicon-mongoose-original"></i> },
		],
	},
];

// const cares = [
// 	{ icon: <Sparkles className="text-purple-500" />, label: 'Developer Experience' },
// 	{ icon: <Zap className="text-yellow-500" />, label: 'Performance' },
// 	{ icon: <BarChart3 className="text-blue-500" />, label: 'Architecture' },
// ];

export default function Skill() {
	const sectionRef = useRef<HTMLElement>(null);
	return (
		<section
			ref={sectionRef}
			id="skills"
			className="relative flex flex-col items-center md:py-24 px-6 overflow-hidden bg-linear-to-b from-background via-muted/10 to-background"
		>
			<div className="max-w-5xl w-full mx-auto">
				<div className="text-center mb-12">
					<span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-4">
						Skills / Toolbox
					</span>
					<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-linear-to-r from-purple-600 via-green-600 to-green-600 bg-clip-text text-transparent">
						My Toolbox
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						A focused set of tools and languages I use to build, not a laundry list.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 mb-16">
					{skills.map((group) => (
						<motion.div
							key={group.group}
							whileHover={{ scale: 1.04, boxShadow: '0 0 24px 4px rgba(168,85,247,0.15)' }}
							className="group bg-card/80 border border-border rounded-2xl p-8 shadow-lg transition-all duration-300 hover:border-purple-400/60 hover:shadow-purple-400/20 relative overflow-hidden"
						>
							<h3 className="text-xl font-semibold mb-4 text-foreground/90">
								{group.group}
							</h3>
							<div className="flex flex-wrap gap-4">
								{group.items.map((skill) => (
									<div
										key={skill.name}
										className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 border border-transparent group-hover:border-purple-300/40 transition-all duration-200 hover:scale-110 hover:bg-purple-50/20 hover:shadow-lg hover:shadow-purple-400/10"
									>
										<span className="w-8 h-8 flex items-center justify-center">{skill.icon}</span>
										<span className="text-xs font-medium text-muted-foreground">{skill.name}</span>
									</div>
								))}
							</div>
							{/* Glow border animation */}
							<div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-purple-400/0 group-hover:border-purple-400/60 group-hover:shadow-[0_0_32px_4px_rgba(168,85,247,0.15)] transition-all duration-300" />
						</motion.div>
					))}
				</div>

				{/* <div className="mt-8 text-center">
					<h4 className="text-lg font-semibold mb-4 text-foreground/80">Things I care about</h4>
					<div className="flex flex-wrap justify-center gap-4">
						{cares.map((item) => (
							<motion.div
								key={item.label}
								whileHover={{ scale: 1.08, boxShadow: '0 0 24px 4px rgba(236,72,153,0.15)' }}
								className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted/40 border border-border/50 hover:border-pink-400/60 transition-all duration-200 shadow-sm hover:shadow-pink-400/10"
							>
								{item.icon}
								<span className="text-sm font-medium text-muted-foreground">{item.label}</span>
							</motion.div>
						))}
					</div>
				</div> */}
			</div>
			{/* Subtle bottom gradient fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
		</section>
	);
}
