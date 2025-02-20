import * as React from "react";

const IBanner = (props) => (
    <svg
        viewBox="0 0 393 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {/* 오선지 */}
        <g transform="translate(0, 9)">
            <path
                d="M-7 1H397"
                stroke="url(#paint0_linear_300_7898)"
                strokeWidth={0.6}
            />
            <path
                d="M-7 10H397"
                stroke="url(#paint1_linear_300_7898)"
                strokeWidth={0.6}
            />
            <path
                d="M-7 18H397"
                stroke="url(#paint2_linear_300_7898)"
                strokeWidth={0.6}
            />
            <path
                d="M-7 26H397"
                stroke="url(#paint3_linear_300_7898)"
                strokeWidth={0.6}
            />
            <path
                d="M-7 34H397"
                stroke="url(#paint4_linear_300_7898)"
                strokeWidth={0.6}
            />
        </g>
        <defs>
            <linearGradient
                id="paint0_linear_300_7898"
                x1={-7}
                y1={1.5}
                x2={397}
                y2={1.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset={0.475} stopColor="#C8C8C8" />
                <stop offset={0.72} />
            </linearGradient>
            <linearGradient
                id="paint1_linear_300_7898"
                x1={-7}
                y1={10.5}
                x2={397}
                y2={10.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset={0.475} stopColor="#C8C8C8" />
                <stop offset={0.72} />
            </linearGradient>
            <linearGradient
                id="paint2_linear_300_7898"
                x1={-7}
                y1={18.5}
                x2={397}
                y2={18.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset={0.475} stopColor="#C8C8C8" />
                <stop offset={0.72} />
            </linearGradient>
            <linearGradient
                id="paint3_linear_300_7898"
                x1={-7}
                y1={26.5}
                x2={397}
                y2={26.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset={0.475} stopColor="#C8C8C8" />
                <stop offset={0.72} />
            </linearGradient>
            <linearGradient
                id="paint4_linear_300_7898"
                x1={-7}
                y1={34.5}
                x2={397}
                y2={34.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset={0.475} stopColor="#C8C8C8" />
                <stop offset={0.72} />
            </linearGradient>
        </defs>

        <text
            x="30%"
            y="45%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="1.1rem"
            fill="#030303"
            fontWeight="Bold"
            fontFamily="Pretendard-Bold"
        >
            {props.text}
        </text>

        {/* 로고 */}
        <g transform="translate(270, 0)">
            <path
                d="M29.1322 10.4385L1.56201 33.5955L3.27496 35.4622L30.8451 12.3053L29.1322 10.4385Z"
                fill="#030303"
            />
            <path
                d="M51.5039 10.4264L15.082 41.0181L16.7949 42.8848L53.2168 12.2931L51.5039 10.4264Z"
                fill="#030303"
            />
            <path
                d="M73.7631 10.4413L37.3413 41.033L39.0543 42.8997L75.4761 12.308L73.7631 10.4413Z"
                fill="#030303"
            />
            <path
                d="M39.0488 42.8954H32.3784L51.4397 10.4409H57.9834L39.0488 42.8954Z"
                fill="#030303"
            />
            <path
                d="M16.7578 42.8954H10.0874L29.1487 10.4409H35.6924L16.7578 42.8954Z"
                fill="#030303"
            />
            <path
                d="M72.2742 24.2548L80.3166 10.4409H73.7729L65.9204 23.8105L72.2742 24.2548Z"
                fill="#030303"
            />
            <path
                d="M78.3959 37.0986C76.6861 37.3813 74.9763 37.0178 73.6253 35.9878C71.3245 34.2308 68.5592 30.5754 72.2533 24.2339C77.8682 14.6207 67.356 21.3257 67.356 21.3257C67.356 21.3257 55.6617 37.6843 75.8629 37.6843C94.5653 37.6843 91.5678 23.7694 91.5678 23.7694H84.4753C84.4753 23.7694 88.2326 35.4224 78.3959 37.0784V37.0986Z"
                fill="#030303"
            />
            <path
                d="M1.5597 33.5861V42.8762H6.90023C6.90023 42.8762 1.93965 42.1895 1.93965 38.6956C1.93965 36.2924 3.75501 35.02 3.75501 35.02L1.53857 33.5659L1.5597 33.5861Z"
                fill="#030303"
            />
            <path
                d="M56.4213 6.01834C58.6363 6.01834 60.432 4.67106 60.432 3.00914C60.432 1.34723 58.6363 0 56.4213 0C54.2063 0 52.4106 1.34723 52.4106 3.00914C52.4106 4.67106 54.2063 6.01834 56.4213 6.01834Z"
                fill="#030303"
            />
            <path
                d="M0.71582 62.8491L7.85061 52.8321H3.81882C2.40453 52.8321 1.77126 53.7005 1.77126 54.7102H1.56019V52.408H10.257V52.8321L2.89003 63.2934H7.30179C8.65276 63.2934 9.39156 62.8895 10.067 61.5162L10.257 61.6172L9.30713 63.7176H0.71582V62.8491Z"
                fill="#030303"
            />
            <path
                d="M44.3477 62.4059V53.6612C44.3477 53.0149 43.9677 52.6312 43.3345 52.6312V52.4292H47.324V52.6312C46.7119 52.6312 46.3108 53.0149 46.3108 53.6612V62.4463C46.3108 63.0926 46.6486 63.5368 47.324 63.5368V63.7388H43.3345V63.5368C43.9677 63.5368 44.3477 63.1128 44.3477 62.4261V62.4059Z"
                fill="#030303"
            />
            <path
                d="M80.1905 57.8211C80.2116 54.0647 83.1246 52.3076 86.0165 52.3076H89.8161V55.7611H89.5417C89.5417 54.2061 87.4309 52.3884 85.2778 52.8125C83.2724 53.176 82.0481 55.1956 82.2381 57.9019C82.4492 61.012 84.5389 62.8902 86.4387 63.072C88.3385 63.2335 89.9639 61.8198 89.9217 59.5175H90.1328C90.1328 61.7794 88.7185 64.0211 86.0376 64.001C83.0402 64.001 80.1272 61.6986 80.1694 57.8009L80.1905 57.8211Z"
                fill="#030303"
            />
        </g>
    </svg>
);
export default IBanner;
