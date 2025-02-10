import React, { useState } from 'react';
import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import backdrop from "../assets/Frame 70.svg";
import backdropBottom from "../assets/Frame 71.svg";
import backdropMobile from "../assets/Frame 30.svg";
import { motion } from 'framer-motion';

const Guide = () => {
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'registeredUsers'), {
        email: email,
        registeredAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      alert('Thanks for registering!');
      setEmail('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <main className="w-full h-screen bg-[#FAF9F6] relative flex flex-col items-center justify-start pt-32 md:p-0 md:justify-center gap-9 overflow-hidden">
      <img src={backdrop} alt="" className='w-full absolute xl:-top-16 md:top-0 md:block hidden'/>
      <header className="flex flex-col gap-4 font-bold text-3xl w-full text-center py-3 z-[100]">
        <h1 className='text-4xl'>Guide Registration</h1>
        <h2 className='text-2xl opacity-60'>Join our community</h2>
        <h1 className='text-2xl'>Be part of Xperience</h1>
      </header>

      <div className="flex flex-col items-center justify-center gap-3 mb-8 z-[100]">
        <div className='flex'>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none bg-[#faf9f6] border-[1.5px] h-14 border-[#121212] p-3 px-4 rounded-2xl active:scale-105 hover:scale-105 transition-transform duration-200"
          />
          <button
            onClick={handleRegister}
            className="h-14 p-3 px-5 ml-2 rounded-2xl bg-[#121212] text-[#faf9f6] active:scale-125 hover:scale-105 transition-transform duration-200"
          >
            Register
          </button>
        </div>
      </div>
      <img src={backdropMobile} alt="" className="w-full absolute md:hidden top-1/3" />
      <img src={backdropBottom} alt="" className='rotate-180 w-full absolute hidden md:block md:-bottom-1/2 z-50'/>
    </main>
  );
};

export default Guide;