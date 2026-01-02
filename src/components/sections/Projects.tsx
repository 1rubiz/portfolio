import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Code2, MonitorSmartphone } from 'lucide-react';

// Example project data structure
const projects = [
	{
		name: 'Weeshr',
		featured: true,
		role: 'Frontend Developer',
		problem: 'Real-time data dashboards for admins and vendors.',
		tech: ['Vue.js', 'TailwindCSS', 'ShadcnUI', 'Pinia', 'Responsive Design'],
		result: 'Built a scalable dashboard used by 10,000+ users, increasing user engagement by 30%',
		caseStudy: {
			one: 'Built a scalable dashboard used by 10,000+ users, increasing user engagement by 30%',
			'two': 'Implemented user authentication and role-based access control.',
			'three': 'Built interactive data visualizations using Chart.js.',
			'four': 'Optimized frontend performance, reducing load times by 40%.',
		}
	},
	{
		name: 'Remote',
		featured: true,
		role: 'Full Stack Software Developer ',
		problem: 'Subscription reminders and stock management for small businesses.',
		tech: ['Nextjs', 'Shadcn', 'Supabase', 'Python', 'SQLite'],
		result: 'Automated 15-33 daily WhatsApp reminders for subscription renewals using Supabase cron jobs.',
		caseStudy: {
			'one': 'Reduced browser lag by 30%-40% with a Python proxy server for large Excel operations.',
			'two': 'Automated 15-33 daily WhatsApp reminders for subscription renewals using Supabase cron jobs.',
			'three': 'Implemented transaction validation and audit logging for stock management, ensuring data consistency.',
			'four': 'Chained table data using foreign keys, reducing redundant database queries and improving API performance.',
			'five': 'Assisted in database design and management using SQL for data storage solutions.',
		}
	},
	{
		name: 'Remote',
		featured: true,
		role: 'Software Engineer',
		problem: 'Local first record system for academic institutions.',
		tech: ['Next.js', 'TailwindCSS', 'Electron', 'SQLite', 'GitHub Releases'],
		result: 'Developed an academic record system Desktop Application using Electron, Nextjs and Sqlite.',
		caseStudy: {
			'one': 'Developed an academic record system Desktop Application using Electron, Nextjs and Sqlite.',
			'two': 'Implemented GitHub releases for Windows, Linux and MacOS.',
			'three': 'Designed database to store application data using SQLite3.',
		}
	},
	// {
	// 	name: 'API Gateway',
	// 	featured: false,
	// 	problem: 'Unified API for multiple microservices.',
	// 	tech: ['NestJS', 'TypeScript', 'Redis'],
	// 	result: 'Reduced integration time for new clients by 50%.',
	// 	caseStudy: {
	// 		'one': '',
	// 		'two': '',
	// 		'three': '',
	// 		'four': '',
	// 		// problem: 'Clients needed to integrate with 5+ services.',
	// 		// constraints: 'High throughput, zero downtime.',
	// 		// decisions: 'Used NestJS for structure, Redis for caching.',
	// 		// outcome: 'Stable, scalable gateway in production.',
	// 		// improve: 'Add GraphQL support.'
	// 	}
	// },
];

export default function Projects() {
	const [openIdx, setOpenIdx] = useState<number | null>(null);
	const [showAll, setShowAll] = useState(false);

	const featured = projects.filter(p => p.featured);
	const others = projects.filter(p => !p.featured);

	return (
		<section id="experience" className="relative flex flex-col items-center py-24 px-6 bg-linear-to-b from-background via-muted/10 to-background">
			<div className="max-w-5xl w-full mx-auto">
				<div className="text-center mb-12">
					<span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-4">
						Projects / Case Studies
					</span>
					<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-linear-to-r from-purple-600 via-green-600 to-green-600 bg-clip-text text-transparent">
						My Experiences
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Proving I can ship, think, and finish. Click a card for a deep dive.
					</p>
				</div>

				{/* Featured Projects */}
				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{featured.map((proj, idx) => (
						<motion.div
							key={proj.name}
							whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(168,85,247,0.12)' }}
							className="group bg-card/80 border border-border rounded-2xl p-8 shadow-lg transition-all duration-300 cursor-pointer hover:border-purple-400/60 hover:shadow-purple-400/20 relative overflow-hidden"
							onClick={() => setOpenIdx(idx)}
						>
							<h3 className="text-2xl font-semibold mb-2 text-foreground/90 flex items-center gap-2">
								<Layers className="w-5 h-5 text-purple-500" /> {proj.name}
							</h3>
							<p className="text-base text-muted-foreground mb-2">{proj.problem}</p>
							<div className="flex flex-wrap gap-2 mb-2">
								{proj.tech.map(t => (
									<span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-muted/40 text-xs font-medium text-muted-foreground border border-border/40">
										<Code2 className="w-3 h-3 text-purple-400" /> {t}
									</span>
								))}
							</div>
							<div className="text-sm text-foreground/80 font-medium">{proj.result}</div>
						</motion.div>
					))}
				</div>

				{/* Other Projects Collapsible */}
				{others.length > 0 && (
					<div className="text-center mb-8">
						<button
							className="px-6 py-2 rounded-full bg-muted/60 hover:bg-muted/80 text-foreground font-medium border border-border/40 transition-all"
							onClick={() => setShowAll(v => !v)}
						>
							{showAll ? 'Hide' : 'Show'} More Projects
						</button>
					</div>
				)}
				<AnimatePresence>
					{showAll && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className="grid md:grid-cols-2 gap-8 mb-8 overflow-hidden"
						>
							{others.map((proj, idx) => (
								<motion.div
									key={proj.name}
									whileHover={{ y: -6, scale: 1.02, boxShadow: '0 6px 24px 0 rgba(236,72,153,0.10)' }}
									className="group bg-card/70 border border-border rounded-2xl p-6 shadow-md transition-all duration-300 cursor-pointer hover:border-pink-400/60 hover:shadow-pink-400/20 relative overflow-hidden"
									onClick={() => setOpenIdx(featured.length + idx)}
								>
									<h4 className="text-xl font-semibold mb-1 text-foreground/90 flex items-center gap-2">
										<MonitorSmartphone className="w-4 h-4 text-pink-500" /> {proj.name}
									</h4>
									<p className="text-sm text-muted-foreground mb-1">{proj.problem}</p>
									<div className="flex flex-wrap gap-2 mb-1">
										{proj.tech.map(t => (
											<span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-muted/30 text-xs font-medium text-muted-foreground border border-border/30">
												<Code2 className="w-3 h-3 text-pink-400" /> {t}
											</span>
										))}
									</div>
									<div className="text-xs text-foreground/80 font-medium">{proj.result}</div>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Modal for Case Study */}
				<AnimatePresence>
					{openIdx !== null && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
							onClick={() => setOpenIdx(null)}
						>
							<motion.div
								initial={{ scale: 0.95, y: 40 }}
								animate={{ scale: 1, y: 0 }}
								exit={{ scale: 0.95, y: 40 }}
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								className="bg-card max-w-lg w-full rounded-2xl p-8 shadow-2xl relative"
								onClick={e => e.stopPropagation()}
							>
								<button
									className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl"
									onClick={() => setOpenIdx(null)}
									aria-label="Close"
								>
									×
								</button>
								{(() => {
									const proj = projects[openIdx!];
									return (
										<div>
											<h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
												<Layers className="w-5 h-5 text-purple-500" /> {proj.name}
											</h3>
											<div className="mb-4 text-base text-muted-foreground">{proj.problem}</div>
											<div className="mb-4 flex flex-wrap gap-2">
												{proj.tech.map(t => (
													<span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-muted/40 text-xs font-medium text-muted-foreground border border-border/40">
														<Code2 className="w-3 h-3 text-purple-400" /> {t}
													</span>
												))}
											</div>
											<div className="mb-6 text-sm text-foreground/90 font-medium">{proj.result}</div>
											<div className="space-y-3 text-sm">
												<div><span className="font-semibold">1:</span> {proj.caseStudy.one}</div>
												<div><span className="font-semibold">2:</span> {proj.caseStudy.two}</div>
												<div><span className="font-semibold">3:</span> {proj.caseStudy.three}</div>
												{proj.caseStudy.four && <div><span className="font-semibold">4:</span> {proj.caseStudy.four}</div>}
												{proj.caseStudy.five && <div><span className="font-semibold">5:</span> {proj.caseStudy.five}</div>}
											</div>
										</div>
									);
								})()}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			{/* Subtle bottom gradient fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
		</section>
	);
}