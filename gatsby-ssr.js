/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import { withPrefix } from "gatsby";
import React from "react";

export function onRenderBody({
    setHtmlAttributes,
    setBodyAttributes,
    setHeadComponents,
    setPreBodyComponents,
    setPostBodyComponents,
    setBodyProps
}) {
    setHtmlAttributes([])
    setBodyAttributes([])
    setHeadComponents([
        <script src={withPrefix("/js/tarteaucitronjs/tarteaucitron.js")} key='1' />,
        <script src={withPrefix("/js/tarteaucitron.parameters.js")} key='2' />,
        <script type="text/javascript" src={withPrefix("/js/google-analytics.js")} key='3' />,
    ])
    setPreBodyComponents([])
    setPostBodyComponents([
        <noscript key="4">
            <div className="noscript__page">
                <div className="logo-wrapper">
                    <svg
                        className="loader-logo"
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="729.000000pt"
                        height="662.000000pt"
                        viewBox="0 0 729.000000 662.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g transform="translate(0.000000,662.000000) scale(0.100000,-0.100000)">
                            <path className="logo-left" d="M2698 6487 c-84 -146 -332 -575 -440 -762 -39 -66 -148 -255 -243 -420 -95 -165 -237 -412 -317 -550 -80 -137 -181 -313 -225 -390 -44 -77 -121 -210 -170 -295 -135 -233 -296 -511 -488 -845 -95 -165 -238 -412 -317 -550 -356 -615 -489 -846 -494 -860 -6 -13 143 -15 1380 -15 762 0 1386 4 1386 8 0 5 -37 74 -83 153 -46 79 -199 345 -341 592 -142 246 -261 447 -265 447 -3 0 -83 -133 -176 -295 l-170 -295 -342 0 c-189 0 -343 2 -343 5 0 3 34 65 76 138 42 73 109 188 149 257 40 69 107 186 150 260 86 148 244 422 280 485 24 43 195 338 315 545 40 69 201 348 357 620 157 272 311 539 343 593 l57 97 63 -112 c35 -62 74 -129 86 -148 12 -19 167 -287 344 -595 178 -308 398 -690 490 -850 92 -159 257 -445 367 -635 110 -190 242 -418 293 -507 52 -90 94 -162 95 -160 3 4 369 638 513 887 74 129 145 252 158 272 13 21 24 40 24 43 0 3 -156 5 -347 5 l-348 1 -119 207 c-66 114 -161 279 -212 367 -51 88 -174 302 -274 475 -100 173 -218 378 -263 455 -44 77 -126 219 -183 315 -56 96 -169 292 -251 435 -82 143 -212 368 -287 500 -76 132 -141 243 -145 247 -4 4 -41 -52 -83 -125z" />
                            <path className="logo-right" d="M4520 4806 c0 -5 63 -118 139 -250 76 -133 152 -265 167 -293 l29 -53 697 0 696 0 -145 -252 c-80 -139 -220 -381 -311 -538 -91 -157 -176 -305 -190 -330 -14 -25 -55 -97 -92 -160 -258 -446 -397 -686 -885 -1533 -59 -103 -112 -184 -116 -180 -4 4 -108 181 -230 393 -122 212 -272 473 -334 580 -62 107 -147 256 -190 330 -43 74 -110 191 -150 260 -40 69 -216 373 -390 675 -481 832 -436 758 -450 738 -7 -10 -47 -78 -89 -150 -42 -73 -110 -192 -151 -264 -42 -71 -81 -140 -86 -153 -11 -24 -7 -31 356 -656 78 -135 247 -427 375 -650 128 -223 279 -484 335 -580 56 -96 182 -314 280 -485 98 -170 208 -362 245 -425 37 -63 129 -223 205 -355 183 -317 276 -475 280 -475 2 0 24 35 48 78 24 42 103 178 174 302 72 124 224 387 338 585 115 198 275 475 355 615 208 360 542 938 605 1045 29 50 64 110 78 135 22 39 168 293 467 810 43 74 134 232 202 350 69 118 211 364 316 547 106 182 192 335 192 340 0 4 -623 8 -1385 8 -850 0 -1385 -4 -1385 -9z" />
                        </g>
                    </svg>
                    <div className="noscript__text">
                        <h1>Cette page a besoin de JavaScript pour fonctionner ツ</h1>
                        <p>Vous pouvez activer Javascript dans <a href="https://enable-javascript.com/" target="_blank">les réglages de votre navigateur</a>.</p>
                    </div>
                </div>
            </div>
        </noscript>
    ])
    setBodyProps([])
}