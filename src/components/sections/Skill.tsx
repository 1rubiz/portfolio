import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
	Code2,
	Braces,
	Server,
	Settings,
	Github,
	Database,
	Sparkles,
	Zap,
	Layers,
	MonitorSmartphone,
	Terminal,
	Wrench,
	BarChart3,
} from 'lucide-react';

const skills = [
	{
		group: 'Frontend',
		items: [
			{ name: 'React', icon: <Database className="w-7 h-7" /> },
			{ name: 'Vue', icon: <Layers className="text-green-500" /> },
			{ name: 'Next.js', icon: <MonitorSmartphone className="text-black dark:text-white" /> },
			{ name: 'TailwindCSS', icon: <Wrench className="text-sky-400" /> },
		],
	},
	{
		group: 'Backend',
		items: [
			{ name: 'Node.js', icon: <Server className="text-green-700" /> },
			{ name: 'Express', icon: <Terminal className="text-gray-700" /> },
			{ name: 'NestJS', icon: <Braces className="text-rose-500" /> },
			{ name: 'Java', icon: <Code2 className="text-orange-600" /> },
			{ name: 'C', icon: <Braces className="text-blue-600" /> },
			{ name: 'Python', icon: <Braces className="text-yellow-500" /> },
		],
	},
	{
		group: 'Tooling',
		items: [
			{ name: 'GitHub', icon: <Github className="text-black dark:text-white" /> },
			{ name: 'Version Control', icon: <Settings className="text-gray-500" /> },
		],
	},
];

const cares = [
	{ icon: <Sparkles className="text-purple-500" />, label: 'Developer Experience' },
	{ icon: <Zap className="text-yellow-500" />, label: 'Performance' },
	{ icon: <BarChart3 className="text-blue-500" />, label: 'Architecture' },
];

export default function Skill() {
	const sectionRef = useRef<HTMLElement>(null);
	return (
		<section
			ref={sectionRef}
			id="skills"
			className="relative min-h-screen flex flex-col items-center py-24 px-6 overflow-hidden bg-linear-to-b from-background via-muted/10 to-background"
		>
			<div className="max-w-5xl w-full mx-auto">
				<div className="text-center mb-12">
					<span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-4">
						Skills / Toolbox (Confidence, Not Noise)
					</span>
					<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
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

				<div className="mt-8 text-center">
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
				</div>
			</div>
			{/* Subtle bottom gradient fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
		</section>
	);
}
