"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { ClipLoader } from 'react-spinners'

const LoginLink = ({ status }) => {
    if (status === "loading") {
        return <span className="text-gray py-1 px-2 text-center my-1 max-h-10">login</span>
    }

    return (
        <Link className="my-1 border text-tangerine hover:text-tangerine-light hover:bg-skyblue-dark py-1 px-2 text-center max-h-10" href="/api/auth/signin/google">
            <div className="flex flex-col">
                login
            </div>
        </Link>
    )
}

const ProfileButton = ({ onClick, username }) => {
    return (
        <Link
            href="/profile"
        >
            <div className="flex flex-col m-1 p-1">
                <div className="flex flex-row">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVR4nO2Tvw7BUByFP5FglGBBZw/Bzs5reAbPU5F0QryBXRMGBmaExsJCmpwmzQ0NccXSLzlDf3/OaXNvIcUSDjACAskDGjbND8Dd0FG9rxnJcAzUpYlqQxsBgcxC4whHtfOvA042AjyZTWQcaqqaayOgoQM1D3lvfNVXODrQs+TaNE95SRZoAQOg/KRfUa+p2bcpAH1gF7sxa6ALFKUesIn1t9oJdxOpAb5h7D+5opF8zUTPC6CaFDDT4BJoAxkgr7ebAxdprlpOMx1gpd3wJ3zJTUMlPqek3WvS0N2S/heQgskDvs9xQtZ6LkgAAAAASUVORK5CYII=" />
                </div>
            </div>
        </Link>
    )
}

export default function Navbar() {

    const { data: session, status } = useSession()
    const validLinkTailwind = 'text-tangerine-dark hover:text-tangerine-light text-center py-1 px-2 max-h-10'
    const invalidLinkTailwind = 'text-gray py-1 px-2 text-center max-h-10'

    return (
        <nav id="nav" className="flex-no-wrap relative flex w-full bg-skyblue">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <button className="block border-0 bg-transparent lg:hidden" type="button" data-twe-collapse-init data-twe-target="#navContent" aria-expanded="false" aria-label="Toggle navigation" aria-controls="#navContent">
                    <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                        <svg                                                                                                                       
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"                                              
                            fill="currentColor"
                        >                                                            
                        <path                                                                              
                            fillRule="evenodd"                                                                             
                             d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"            
                             clipRule="evenodd" />                                                           
                         </svg>
                    </span>
                </button>
                <div id="navContent" className="hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" data-twe-collapse-item>
                    <div className="flex flex-col mr-2">
                        <Image src="/imgs/for_valued_member.png" alt="logo" width="50" height="50"/>
                    </div>
                    <ul
                        className="list-style-none flex flex-col lg:flex-row"
                        data-twe-navbar-nav-ref
                    >
                        <li className="lg:mb-0" data-twe-nav-item-ref>
                            { status === 'authenticated' ? <Link className={validLinkTailwind} href="/">home</Link> : <span className={invalidLinkTailwind}>home</span> }
                        </li>
                        <li className="lg:mb-0" data-twe-nav-item-ref>
                            { status === 'authenticated' ? <Link className={validLinkTailwind} href="/notes">notes</Link> : <span className={invalidLinkTailwind}>notes</span> }
                        </li>
                        <li className="lg:mb-0" data-twe-nav-item-ref>
                            <Link className={validLinkTailwind} href="/userguide">userguide</Link>
                        </li>
                    </ul>
                </div>
                <div className="relative flex items-center">
                    { status === 'authenticated' ? <ProfileButton /> : <LoginLink status={status}/> } 
                </div>
            </div>
        </nav>
    )
}                                                       
                                                                                                                                                                                    
