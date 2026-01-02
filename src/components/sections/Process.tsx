import { motion } from 'framer-motion';
import { Lightbulb, Settings, CheckCircle, ArrowRight, Star } from 'lucide-react';

// Dynamic process/philosophy steps
const processSteps = [
	{
		title: 'How I Approach Problems',
		description: 'I break down complex challenges into clear, actionable steps. I start with the “why”, then map out the “how” with research, prototyping, and feedback loops.',
		icon: <Lightbulb className="w-7 h-7 text-yellow-400" />,
	},
	{
		title: 'Making Technical Decisions',
		description: 'I weigh trade-offs, prioritize maintainability, and validate choices with real-world constraints. I document decisions and revisit them as projects evolve.',
		icon: <Settings className="w-7 h-7 text-blue-500" />,
	},
	{
		title: 'Defining Quality',
		description: 'Quality means code that’s robust, readable, and resilient. I value clear tests, thoughtful architecture, and a great developer experience.',
		icon: <CheckCircle className="w-7 h-7 text-green-500" />,
	},
	{
		title: 'Continuous Improvement',
		description: 'I reflect on outcomes, gather feedback, and iterate. Every project is a chance to learn and raise the bar.',
		icon: <Star className="w-7 h-7 text-purple-500" />,
	},
];

export default function Process() {
	return (
		<section id="process" className="relative flex flex-col items-center py-12 md:py-24 px-6 bg-gradient-to-b from-background via-muted/10 to-background">
			<div className="max-w-4xl w-full mx-auto">
				<div className="text-center mb-12">
					<span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-4">
						Process / Philosophy
					</span>
					<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-600 via-green-600 to-green-600 bg-clip-text text-transparent">
						How I Think
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Most devs skip this. Don’t. Here’s how I approach problems, make decisions, and define quality.
					</p>
				</div>

				{/* Timeline / Flow Diagram */}
				<div className="relative">
					<div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 opacity-30 rounded-full" />
					<ol className="relative z-10 space-y-12">
						{processSteps.map((step, idx) => (
							<motion.li
								key={step.title}
								initial={{ opacity: 0, x: 40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring' }}
								viewport={{ once: true }}
								className="flex items-start gap-6 group"
							>
								<div className="flex flex-col items-center">
									<div className="rounded-full bg-background border-2 border-purple-300 shadow-md p-2 mb-2 group-hover:scale-110 transition-transform">
										{step.icon}
									</div>
									{idx < processSteps.length - 1 && (
										<ArrowRight className="w-5 h-5 text-muted-foreground/40 mt-2 rotate-90" />
									)}
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-1 text-foreground/90">{step.title}</h3>
									<p className="text-base text-muted-foreground max-w-xl">{step.description}</p>
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
