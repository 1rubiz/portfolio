import { useEffect, useState } from 'react';
import { AnimatePresence, motion as framerMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin,
	//  Sun, Moon, Heart
	 } from 'lucide-react';

export default function Contact() {
const socials = [
	{ name: 'GitHub', url: 'https://github.com/1rubiz', icon: <Github className="w-5 h-5" /> },
	{ name: 'LinkedIn', url: 'https://linkedin.com/in/izekor-ruby', icon: <Linkedin className="w-5 h-5" /> },
];

	// const [theme, setTheme] = useState<'light' | 'dark'>("light");
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [sent, setSent] = useState(false);
	const [showModal, setShowModal] = useState(false);

	// function handleThemeToggle() {
	// 	setTheme(t => (t === 'light' ? 'dark' : 'light'));
	// 	document.documentElement.classList.toggle('dark');
	// }

	function setDarkMode() {
		// setTheme('dark');
		document.documentElement.classList.add('dark');
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setForm(f => ({ ...f, [e.target.name]: e.target.value }));
	}


	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSent(true);
		setShowModal(true);
	}

	// Email provider links
	const subject = encodeURIComponent(`Message from ${form.name}`);
	const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
	const to = "1izekorruby@gmail.com";
	const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
	const yahooUrl = `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}&body=${body}`;
	const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`;
	const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDarkMode();
    }, []);

	return (
		<section id="contact" className="relative flex flex-col items-center py-24 px-6 bg-gradient-to-b from-background via-muted/10 to-background">
			<div className="max-w-lg w-full mx-auto text-center mb-16">
				<span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-4">
					Contact
				</span>
				<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-600 via-green-600 to-green-600 bg-clip-text text-transparent">
					Let’s Connect
				</h2>
				<p className="text-lg text-muted-foreground mb-6">I’d love to hear from you. Reach out for work, collaboration, or just to say hi!</p>
				<motion.a
					href="mailto:your@email.com"
					whileHover={{ scale: 1.04 }}
					className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium shadow-md transition-all hover:shadow-lg hover:bg-purple-600/90 focus:outline-none mb-4"
				>
					<Mail className="w-5 h-5" /> 1izekorruby@gmail.com
				</motion.a>
				<div className="flex justify-center gap-4 mt-4 mb-8">
					{socials.map(s => (
						<motion.a
							key={s.name}
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.1 }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 border border-border/40 text-foreground transition-all hover:bg-muted/60 hover:border-purple-400/60"
						>
							{s.icon} {s.name}
						</motion.a>
					))}
				</div>
				{/* Optional Simple Form */}
				<form onSubmit={handleSubmit} className="bg-card/80 rounded-2xl p-6 shadow-md flex flex-col gap-4 items-center">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={form.name}
						onChange={handleChange}
						className="w-full px-4 py-2 rounded-md border border-border/40 bg-muted/20 focus:border-purple-400 outline-none transition-all"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={form.email}
						onChange={handleChange}
						className="w-full px-4 py-2 rounded-md border border-border/40 bg-muted/20 focus:border-purple-400 outline-none transition-all"
						required
					/>
					<textarea
						name="message"
						placeholder="Your Message"
						value={form.message}
						onChange={handleChange}
						className="w-full px-4 py-2 rounded-md border border-border/40 bg-muted/20 focus:border-purple-400 outline-none transition-all min-h-[100px]"
						required
					/>
					<motion.button
						type="submit"
						whileHover={{ scale: 1.04 }}
						className="px-6 py-2 rounded-full bg-green-700 text-white font-semibold shadow-md transition-all hover:bg-purple-700 focus:outline-none"
					>
						{sent ? 'Sent!' : 'Send Message'}
					</motion.button>
				</form>
				{/* Modal for email provider options */}
				<AnimatePresence>
					{showModal && (
						<framerMotion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
							onClick={() => setShowModal(false)}
						>
							<framerMotion.div
								initial={{ y: 40 }}
								animate={{ y: 0 }}
								exit={{ y: 40 }}
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								className="bg-card max-w-md w-full rounded-2xl p-8 shadow-2xl relative text-center"
								onClick={e => e.stopPropagation()}
							>
								<button
									className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl"
									onClick={() => setShowModal(false)}
									aria-label="Close"
								>
									×
								</button>
								<h3 className="text-xl font-bold mb-4">Choose your email provider</h3>
								<div className="flex flex-col gap-3 mb-2">
									<a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-red-500/80 text-white font-medium hover:bg-red-600 transition-all">Gmail</a>
									<a href={yahooUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-purple-500/80 text-white font-medium hover:bg-purple-600 transition-all">Yahoo Mail</a>
									<a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-blue-500/80 text-white font-medium hover:bg-blue-600 transition-all">Outlook</a>
									<a href={mailtoUrl} className="px-4 py-2 rounded bg-gray-500/80 text-white font-medium hover:bg-gray-600 transition-all">Other / Default</a>
								</div>
								<div className="text-xs text-muted-foreground mt-2">Your message will be pre-filled. Just hit send!</div>
							</framerMotion.div>
						</framerMotion.div>
					)}
				</AnimatePresence>
			</div>
			{/* Footer */}
			<footer className="w-full text-center py-6 border-t border-border/30 text-muted-foreground text-sm flex flex-col items-center gap-2">
				<div className="flex flex-col md:flex-row items-center gap-2 justify-center mb-1">
					<span>&copy; {new Date().getFullYear()} Ruby Izekor.</span>
					<span className="hidden sm:inline">|</span>
					<span>Built with React, Vite, TailwindCSS</span>
				</div>
				<div className="flex items-center gap-3 justify-center">
					{/* <button
						onClick={handleThemeToggle}
						className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted/30 border border-border/30 hover:bg-muted/50 transition-all"
						aria-label="Toggle theme"
					>
						{theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Theme
					</button> */}
					<span className="flex items-center gap-1 text-xs opacity-70">Made by Ruby Izekor</span>
				</div>
			</footer>
		</section>
	);
}
