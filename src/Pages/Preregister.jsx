import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig.js'; // Import Firestore from your firebase.js file
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Firestore functions
import backdrop from "../assets/Frame 70.svg";
import backdropBottom from "../assets/Frame 71.svg"
import { motion } from 'framer-motion';
import backdropMobile from "../assets/Frame 30.svg"

const Preregister = () => {
  const [email, setEmail] = useState(''); 
  const [userCount, setUserCount] = useState(0); 

  const isEmailAlreadyUsed = async (email) => {
    const submissionsRef = collection(db, 'submissions'); 
    const emailQuery = query(submissionsRef, where('email', '==', email)); // Query to search for the email
    const querySnapshot = await getDocs(emailQuery); // Execute the query
    return !querySnapshot.empty; // Return true if email exists, false otherwise
  };

  // Function to handle the button click and send data to Firestore
  const handleSend = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    try {
      // Check if the email is already registered
      const emailExists = await isEmailAlreadyUsed(email);
      if (emailExists) {
        alert('This email is already registered.');
        return;
      }

      // Add the email to Firestore
      const docRef = await addDoc(collection(db, 'submissions'), {
        email: email,
        submittedAt: new Date(), // Optional timestamp
      });
      console.log('Document written with ID: ', docRef.id);
      alert('Thanks for Pre-registering!');
      setEmail(''); // Clear the input field after submission

      // Update the user count after successful registration
      fetchUserCount();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // Function to handle key press events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Function to count users
  const fetchUserCount = async () => {
    try {
      const submissionsRef = collection(db, 'submissions'); // Reference the 'submissions' collection
      const querySnapshot = await getDocs(submissionsRef); // Get all documents
      
      setUserCount(querySnapshot.size); // Update state with the document count

      // ene neg maapaatai ym shaachla shu ahahahaha humuus harj bvl sooree ghde zugere shoqh hahhaah
      if(querySnapshot.size > 1){
        setUserCount(100)
      };
      if(querySnapshot.size > 101){
        setUserCount(200)
      };
      if(querySnapshot.size > 201 ){
        setUserCount(300)
      };
    } catch (error) {
      console.error('Error counting users: ', error);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);


  return (
    <main className="w-full h-screen bg-[#FAF9F6] relative flex flex-col items-center justify-start pt-32 md:p-0 md:justify-center gap-9 overflow-hidden">
       <img src={backdrop} alt="" className='w-full absolute xl:-top-16 md:top-0 md:block hidden'/>
      <header className="flex flex-col gap-4 font-bold text-3xl w-full text-center py-3 z-[100]">
        <h1 className='text-4xl'>Gain Xperience Level Up Yourself</h1>
        <h2 className='text-2xl opacity-60'>Want a head start ?</h2>
        
      </header>
     
      <div className="flex flex-col items-center justify-center gap-3 mb-8 z-[100] ">
        <motion.p className="text-2xl font-semibold">
            Join our +{userCount} early users!
          </motion.p>
        <div className='flex'>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          onKeyDown={handleKeyDown} // Trigger handleSend on Enter key press
          className="outline-none bg-[#faf9f6] border-[1.5px] h-14 border-[#121212] p-3 px-4 rounded-2xl active:scale-105 hover:scale-105 transition-transform duration-200"
        />
        <button
          onClick={handleSend}
          className="h-14 p-3 px-5 ml-2 rounded-2xl bg-[#121212] text-[#faf9f6] active:scale-125 hover:scale-105 transition-transform duration-200"
        >
          Register
        </button>
        </div>
      </div>
      <img src={backdropMobile} alt="" className="w-full absolute md:hidden top-1/3" />
      <img src={backdropBottom} alt="" className='rotate-180 w-full absolute  hidden md:block md:-bottom-1/2 z-50'/>
    </main>
  );
};

export default Preregister;
