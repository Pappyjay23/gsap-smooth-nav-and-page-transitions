"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
	const router = useTransitionRouter();
	const pathname = usePathname();

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
				easing: "ease-in-out",
				// easing: "cubic-bezier(0.87, 0, 0.13, 1)",
				fill: "forwards",
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
				easing: "ease-in-out",
				fill: "forwards",
				pseudoElement: "::view-transition-new(root)",
			}
		);
	};

	const isSameRoute = (path: string) => {
		return pathname === path;
	};

	const tl = useRef<gsap.core.Timeline | undefined>(undefined);
	useGSAP(() => {
		const navLinks = document.getElementsByClassName("nav-link");
		const menuOverlayLinks = document.querySelectorAll(
			".menu-overlay .menu-overlay-link"
		);

		gsap.fromTo(
			navLinks,
			{
				y: 100,
			},
			{
				y: 0,
				duration: 1,
				ease: "power4.out",
				delay: 0.75,
				stagger: 0.075,
			}
		);

		gsap.set(".menu-overlay", {
			y: "-100%",
		});

		gsap.set(menuOverlayLinks, {
			y: 400,
		});

		tl.current = gsap
			.timeline({ paused: true })
			.to(".menu-overlay", {
				y: 0,
				duration: 1, // shorter duration for faster start
				ease: "power4.inOut",
			})
			.to(
				menuOverlayLinks,
				{
					y: 0,
					duration: 1.3,
					ease: "power4.inOut",
					stagger: 0.075,
				},
				"-=0.3" // overlap the start with the overlay animation
			);
	});

	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu((prev) => !prev);
	};

	useEffect(() => {
		if (showMenu) {
			tl.current?.play();
		} else {
			tl.current?.reverse();
		}
	}, [showMenu]);

	return (
		<>
			<nav className='sticky top-0 left-0 w-full flex items-center justify-between p-4 text-black dark:text-white text-sm z-10 backdrop-blur-lg [clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%)]'>
				<Link
					className='nav-link'
					href='/'
					onClick={(e) => {
						e.preventDefault();
						if (isSameRoute("/")) return;
						router.push("/", {
							onTransitionReady: pageAnimation,
						});
					}}>
					Home
				</Link>
				<div className='flex items-center gap-4'>
					<Link
						className='nav-link'
						href='/about'
						onClick={(e) => {
							e.preventDefault();
							if (isSameRoute("/about")) return;
							router.push("/about", {
								onTransitionReady: pageAnimation,
							});
						}}>
						About
					</Link>
					<Link
						className='nav-link'
						href='/projects'
						onClick={(e) => {
							e.preventDefault();
							if (isSameRoute("/projects")) return;
							router.push("/projects", {
								onTransitionReady: pageAnimation,
							});
						}}>
						Projects
					</Link>
					<Link
						className='nav-link'
						href=''
						onClick={(e) => {
							e.preventDefault();
							toggleMenu();
						}}>
						Menu
					</Link>
				</div>
			</nav>

			{/* Menu Overlay */}
			<div
				id='menu-overlay'
				className={`menu-overlay fixed top-0 left-0 w-full h-dvh bg-[#c5fb45] z-20 text-black p-4 translate-y-[-100%]`}>
				<div className='flex justify-between items-center'>
					<p>Menu</p>
					<div className='text-4xl cursor-pointer' onClick={toggleMenu}>
						❌
					</div>
				</div>
				<nav className='flex flex-col'>
					<div className='[clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%)] flex'>
						<Link
							className='menu-overlay-link uppercase text-[4rem] lg:text-[7rem] font-bold tracking-tighter'
							href='/'
							onClick={(e) => {
								e.preventDefault();
								router.push("/");
								toggleMenu();
							}}>
							Home
						</Link>
					</div>
					<div className='[clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%)]'>
						<Link
							className='menu-overlay-link uppercase text-[4rem] lg:text-[7rem] font-bold tracking-tighter inline-block'
							href='/about'
							onClick={(e) => {
								e.preventDefault();
								router.push("/about");
								toggleMenu();
							}}>
							About
						</Link>
					</div>
					<div className='[clip-path:polygon(0%_0%,0%_100%,100%_100%,100%_0%)]'>
						<Link
							className='menu-overlay-link uppercase text-[4rem] lg:text-[7rem] font-bold tracking-tighter inline-block'
							href='/projects'
							onClick={(e) => {
								e.preventDefault();
								router.push("/projects");
								toggleMenu();
							}}>
							Projects
						</Link>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
