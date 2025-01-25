'use client';

const LoadingIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="currentColor">
        {/* Circle 1 */}
        <circle cx="12" cy="3.5" r="1.5">
          <animateTransform
            attributeName="transform"
            calcMode="discrete"
            dur="2.4s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;90 12 12;180 12 12;270 12 12"
          />
          <animate
            attributeName="opacity"
            dur="0.6s"
            repeatCount="indefinite"
            values="1;1;0"
          />
        </circle>
        {/* Circle 2 */}
        <circle cx="12" cy="3.5" r="1.5" transform="rotate(30 12 12)">
          <animateTransform
            attributeName="transform"
            begin="0.2s"
            calcMode="discrete"
            dur="2.4s"
            repeatCount="indefinite"
            type="rotate"
            values="30 12 12;120 12 12;210 12 12;300 12 12"
          />
          <animate
            attributeName="opacity"
            begin="0.2s"
            dur="0.6s"
            repeatCount="indefinite"
            values="1;1;0"
          />
        </circle>
        {/* Circle 3 */}
        <circle cx="12" cy="3.5" r="1.5" transform="rotate(60 12 12)">
          <animateTransform
            attributeName="transform"
            begin="0.4s"
            calcMode="discrete"
            dur="2.4s"
            repeatCount="indefinite"
            type="rotate"
            values="60 12 12;150 12 12;240 12 12;330 12 12"
          />
          <animate
            attributeName="opacity"
            begin="0.4s"
            dur="0.6s"
            repeatCount="indefinite"
            values="1;1;0"
          />
        </circle>
      </g>
    </svg>
  );
};

export default LoadingIcon;
