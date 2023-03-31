import React from 'react';

export function ShakeBottomAnimation(props) {
  const { children } = props;

  const style = {
    '-webkit-animation':
      'shake-bottom 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both',
    animation:
      'shake-bottom 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both',
    width: 'fill-content',
  };

  return (
    <>
      <style>
        {`
       @-webkit-keyframes shake-bottom {
         0%,
         100% {
           -webkit-transform: rotate(0deg);
                   transform: rotate(0deg);
           -webkit-transform-origin: 50% 100%;
                   transform-origin: 50% 100%;
         }
         10% {
           -webkit-transform: rotate(2deg);
                   transform: rotate(2deg);
         }
         20%,
         40%,
         60% {
           -webkit-transform: rotate(-4deg);
                   transform: rotate(-4deg);
         }
         30%,
         50%,
         70% {
           -webkit-transform: rotate(4deg);
                   transform: rotate(4deg);
         }
         80% {
           -webkit-transform: rotate(-2deg);
                   transform: rotate(-2deg);
         }
         90% {
           -webkit-transform: rotate(2deg);
                   transform: rotate(2deg);
         }
       }
       @keyframes shake-bottom {
         0%,
         100% {
           -webkit-transform: rotate(0deg);
                   transform: rotate(0deg);
           -webkit-transform-origin: 50% 100%;
                   transform-origin: 50% 100%;
         }
         10% {
           -webkit-transform: rotate(2deg);
                   transform: rotate(2deg);
         }
         20%,
         40%,
         60% {
           -webkit-transform: rotate(-4deg);
                   transform: rotate(-4deg);
         }
         30%,
         50%,
         70% {
           -webkit-transform: rotate(4deg);
                   transform: rotate(4deg);
         }
         80% {
           -webkit-transform: rotate(-2deg);
                   transform: rotate(-2deg);
         }
         90% {
           -webkit-transform: rotate(2deg);
                   transform: rotate(2deg);
         }
       }                    
    `}
      </style>
      <div style={style}>{children}</div>
    </>
  );
}
