import React from 'react';

export function ShakeBottomAnimation() {
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
    </>
  );
}
