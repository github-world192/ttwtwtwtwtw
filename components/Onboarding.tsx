
import React from 'react';
import { HERO_IMAGE_URL } from '../constants';

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  return (
    <div className="relative flex h-full w-full flex-col justify-between max-w-md mx-auto overflow-hidden bg-background-dark text-white p-0">
      <div className="flex-1 flex flex-col items-center justify-start w-full relative z-10 pt-4">
        {/* Logo Header */}
        <div className="w-full flex justify-center py-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-2xl font-bold">check_circle</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">TaskFlow</span>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="w-full px-6 py-4 flex-shrink-0">
          <div 
            className="w-full aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-2xl shadow-lg relative overflow-hidden group" 
            style={{ backgroundImage: `url("${HERO_IMAGE_URL}")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-40"></div>
          </div>
        </div>

        {/* Carousel / Feature Highlights */}
        <div className="w-full flex-1 flex flex-col justify-center items-center px-6 mt-4">
          <div className="flex flex-col items-center text-center gap-4 max-w-xs">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
              Conquer Your Day
            </h1>
            <p className="text-slate-400 text-base font-normal leading-relaxed">
              Plan your day, set smart reminders, and track your progress effortlessly. Productivity has never looked this good.
            </p>
          </div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-2 py-8">
          <div className="h-2 w-8 rounded-full bg-primary transition-all duration-300"></div>
          <div className="h-2 w-2 rounded-full bg-slate-700 transition-all duration-300"></div>
          <div className="h-2 w-2 rounded-full bg-slate-700 transition-all duration-300"></div>
        </div>
      </div>

      {/* Bottom Actions Area */}
      <div className="w-full pb-10 pt-4 px-6 bg-background-dark z-20">
        <div className="flex flex-col gap-3">
          <button 
            onClick={onFinish}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary text-white text-lg font-bold leading-normal tracking-wide shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
          >
            <span className="truncate">Get Started</span>
          </button>
          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-slate-400 hover:text-white text-sm font-semibold leading-normal tracking-wide transition-colors">
            <span>Already have an account? <span className="text-primary">Log In</span></span>
          </button>
        </div>
        <div className="h-1 w-1/3 bg-slate-700 rounded-full mx-auto mt-6 opacity-50"></div>
      </div>
    </div>
  );
};

export default Onboarding;
