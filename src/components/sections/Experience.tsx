import { motion } from 'framer-motion';
import { Briefcase, Star, TrendingUp } from 'lucide-react';

// Dynamic experience array
const experiences = [
	{
		role: 'Frontend Developer',
		company: 'WEESHR',
		impact: 'Built a scalable dashboard used by 10,000+ users, increasing user engagement by 30%',
		icon: <Briefcase className="w-7 h-7 text-purple-500" />,
	},
	{
		role: 'Full Stack Engineer',
		company: 'Remote',
		impact: `Developed an academic record system Desktop Application using Electron, Nextjs and Sqlite.
		 Implemented GitHub releases for Windows, Linux and MacOS`,
		icon: <TrendingUp className="w-7 h-7 text-blue-500" />,
	},
	{
		role: 'Full Stack Software Developer',
		company: 'Remote',
		impact: `Reduced browser lag by 30%-40% with a Python proxy server for large Excel
operations.
Automated 15-33 daily WhatsApp reminders for subscription renewals using
Supabase cron jobs.`,
		icon: <Star className="w-7 h-7 text-yellow-400" />,
	},
];

export default function Experience() {
	return (
		<section id="experience" className="relative flex flex-col items-center py-24 px-6 bg-gradient-to-b from-background via-muted/10 to-background">
			<div className="max-w-4xl w-full mx-auto">
				<div className="text-center mb-12">
					<span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-4">
						Experience / Timeline
					</span>
					<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-600 via-green-600 to-green-600 bg-clip-text text-transparent">
						My Experience
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Credibility through real impact. Here’s what I’ve shipped and improved.
					</p>
				</div>

				{/* Vertical Timeline */}
				<div className="relative">
					<div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 opacity-30 rounded-full" />
					<ol className="relative z-10 space-y-12">
						{experiences.map((exp, idx) => (
							<motion.li
								key={exp.role + exp.company}
								initial={{ opacity: 0, x: 40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring' }}
								viewport={{ once: true }}
								className="flex items-start gap-6 group"
							>
								<div className="flex flex-col items-center">
									<div className="rounded-full bg-background border-2 border-purple-300 shadow-md p-2 mb-2 group-hover:scale-110 transition-transform">
										{exp.icon}
									</div>
									{idx < experiences.length - 1 && (
										<div className="w-1 h-8 bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 opacity-30 rounded-full" />
									)}
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-1 text-foreground/90">{exp.role} <span className="text-muted-foreground font-normal">@ {exp.company}</span></h3>
									<p className="text-base text-muted-foreground max-w-xl font-medium">{exp.impact}</p>
								</div>
							</motion.li>
						))}
					</ol>
				</div>
			</div>
			{/* Subtle bottom gradient fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
		</section>
	);
}
