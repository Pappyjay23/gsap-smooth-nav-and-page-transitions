"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export default function Home() {
	useGSAP(() => {
		const homeText = new SplitText("#home h1", { type: "chars" });

		gsap.fromTo(
			homeText.chars,
			{
				y: 400,
			},
			{
				y: 0,
				duration: 1,
				ease: "power4.out",
				delay: 1.2,
				stagger: 0.075,
			}
		);
	});

	return (
		<div className='min-h-screen flex justify-center items-center' id='home'>
			<h1 className='text-[5rem] lg:text-[15rem] font-bold uppercase tracking-tighter [clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%)]'>
				Home
			</h1>
		</div>
	);
}
