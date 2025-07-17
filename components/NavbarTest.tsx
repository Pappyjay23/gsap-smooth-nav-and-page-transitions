"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NavbarTest = () => {
	const router = useTransitionRouter();

	const pageAnimation = () => {
		document.documentElement.animate(
			[
				{
					transform: "translateY(0)",
				},
				{
					transform: "translateY(-10%)",
				},
			],
			{
				duration: 1500,
				fill: "forwards",
				easing: "ease-in-out",
				pseudoElement: "::view-transition-old(root)",
			}
		);

		document.documentElement.animate(
			[
				{
					transform: "translateY(100%)",
				},
				{
					transform: "translateY(0)",
				},
			],
			{
				duration: 1500,
				fill: "forwards",
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			}
		);
	};

	const [showMenuTest, setShowMenuTest] = useState(false);

	const toggleMenu = () => {
		setShowMenuTest((prev) => !prev);
	};

	const tl = useRef<gsap.core.Timeline | null>(null);

	useGSAP(() => {
		const menuOverlayLinks = document.querySelectorAll(
			".nav-test .menu-overlay-link"
		);

		gsap.set(".nav-test .menu-overlay", {
			translateY: "-100%",
		});

		gsap.set(menuOverlayLinks, {
			translateY: "400px",
		});

		tl.current = gsap
			.timeline({ paused: true })
			.to(".nav-test .menu-overlay", {
				translateY: "0",
				duration: 1,
				ease: "power4.inOut",
			})
			.to(
				menuOverlayLinks,
				{
					translateY: "0",
					duration: 1.5,
					stagger: 0.075,
					ease: "power4.inOut",
				},
				"-=0.3"
			);
	});

	useEffect(() => {
		if (showMenuTest) {
			tl.current?.play();
		} else {
			tl.current?.reverse();
		}
	}, [showMenuTest]);

	return (
		<div className='nav-test'>
			<nav className='p-4 text-white flex items-center justify-between'>
				<Link
					href='/'
					onClick={(e) => {
						e.preventDefault();
						router.push("/", {
							onTransitionReady: pageAnimation,
						});
					}}
					className='font-bold'>
					Home
				</Link>
				<div className='flex items-center gap-4'>
					<Link
						href='/about'
						onClick={(e) => {
							e.preventDefault();
							router.push("/about", {
								onTransitionReady: pageAnimation,
							});
						}}
						className='font-bold'>
						About
					</Link>
					<Link
						href='/projects'
						onClick={(e) => {
							e.preventDefault();
							router.push("/projects", {
								onTransitionReady: pageAnimation,
							});
						}}
						className='font-bold'>
						Projects
					</Link>
					<Link
						href='/'
						onClick={(e) => {
							e.preventDefault();
							toggleMenu();
						}}
						className='font-bold'>
						Menu
					</Link>
				</div>
			</nav>
			<div className='menu-overlay fixed top-0 left-0 p-4 bg-[#c5fb45] w-full h-screen z-10 text-black -translate-y-full'>
				<div className='flex justify-between items-center'>
					<p>Menu</p>
					<div onClick={toggleMenu} className='text-3xl cursor-pointer'>
						❌
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<div className='flex overflow-hidden'>
						<Link
							href='/'
							onClick={(e) => {
								e.preventDefault();
								router.push("/");
                                toggleMenu()
							}}
							className='menu-overlay-link font-bold uppercase text-[4rem] lg:text-[7rem] tracking-tighter'>
							Home
						</Link>
					</div>
					<div className='flex overflow-hidden'>
						<Link
							href='/'
							onClick={(e) => {
								e.preventDefault();
								router.push("/");
                                toggleMenu()
							}}
							className='menu-overlay-link font-bold uppercase text-[4rem] lg:text-[7rem] tracking-tighter'>
							Home
						</Link>
					</div>
					<div className='flex overflow-hidden'>
						<Link
							href='/'
							onClick={(e) => {
								e.preventDefault();
								router.push("/");
                                toggleMenu()
							}}
							className='menu-overlay-link font-bold uppercase text-[4rem] lg:text-[7rem] tracking-tighter'>
							Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavbarTest;
