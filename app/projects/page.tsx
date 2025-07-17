"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

const Projects = () => {
	const images = [
		"https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1742647230923-292e4e1e10c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1743385779331-15e7e53c2253?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1737644467636-6b0053476bb2?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1749402050137-1b203b0b01c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	];

	useGSAP(() => {
		const projectsText = new SplitText("#projects h1", { type: "chars" });
		const projectImages = document.querySelectorAll(
			"#projects .image-container"
		);

		gsap.fromTo(
			projectsText.chars,
			{
				y: 400,
			},
			{
				y: 0,
				duration: 1,
				ease: "power4.out",
				delay: 1,
				stagger: 0.075,
			}
		);

		gsap.fromTo(
			projectImages,
			{
				opacity: 0,
				y: 100,
			},
			{
				opacity: 1,
				y: 0,
				duration: 2,
				ease: "power4.out",
				delay: 1.5,
				stagger: 0.075,
			}
		);
	});

	return (
		<div className='min-h-screen py-10' id='projects'>
			<h1 className='text-[4rem] lg:text-[15rem] font-bold uppercase tracking-tighter [clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%)] text-center mt-10'>
				Projects
			</h1>
			<div className='flex justify-center items-center mt-10 w-[60%] mx-auto flex-wrap gap-10'>
				{images.map((image, index) => (
					<div
						key={index}
						className='w-[400px] h-[400px] lg:h-[600px] relative rounded-[20px] overflow-hidden image-container bg-transparent backdrop-blur-3xl'>
						<Image
							src={image}
							alt=''
							fill
							className='object-top object-cover'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Projects;
