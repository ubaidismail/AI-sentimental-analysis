"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import SkeletonForTextGeneration from "../Skeleton/SkeletonForTextGeneration";

export default function SignupFormDemo() {

  //   const dumyJson = {
  //     "status": 200,
  //     "response": {
  //         "generated_text": " and Machine Learning that you would recommend to someone who is new to the field?\n\n1. \"Artificial Intelligence: A Modern Approach\" by Stuart Russell and Peter Norvig: This is a comprehensive textbook on artificial intelligence that covers both classical and modern approaches. It's a great starting point for anyone new to the field, as it provides a solid foundation in the key concepts and techniques used in AI research and development.\n2. \"Machine Learning Yearning\" by Andrew Ng: This is a free online book by the co-founder of Google Brain and the former chief scientist at Baidu. It covers the practical aspects of machine learning, including how to build and deploy machine learning systems. It's a great resource for anyone looking to apply machine learning to real-world problems.\n3. \"Python Machine Learning\" by Sebastian Raschka: This is a hands-on guide to machine learning with Python. It covers the basics of machine learning algorithms, as well as how to implement them using popular Python libraries like NumPy, SciPy, and scikit-learn. It's a great resource for anyone looking to get started with machine learning using Python.\n4. \"Deep Learning\" by Ian Goodfellow, Yoshua Bengio, and Aaron Courville: This is a comprehensive textbook on deep learning, a subfield of machine learning that involves training neural networks with multiple hidden layers. It covers the theoretical foundations of deep learning, as well as practical techniques for building and training deep neural networks. It's a great resource for anyone looking to get started with deep learning.\n5. \"Reinforce Learning: An Introduction\" by Richard S. Sutton and Andrew G. Barto: This is a classic textbook on reinforce learning, a type of machine learning that involves training agents to make decisions based on rewards and punishments. It covers the theoretical foundations of reinforce learning, as well as practical techniques for building and training reinforce learning agents. It's a great resource for anyone looking to get started with reinforce learning."
  //     }
  // }

  const [responseMessage, setResponseMessage] = useState('');
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageText = (document.getElementById('message') as HTMLTextAreaElement).value;
    setLoading(true);
    setResponseMessage('');
    try {
      const response = await fetch('/api/sentimentAnalysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: messageText })
      })
      setLoading(false);
      if (!response.ok) {
        setError(true);
        return setResponseMessage(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.status == 200) {
        setResponseMessage(result.response.generated_text);
      } else {
        setError(true);
        setResponseMessage('Something went wrong');
      }

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setError(true);
      setResponseMessage('Something went wrong');
    }
  };
  return (
    <div className="w-2/4 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border-2 ">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Cloudtach AI Text Assistant
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Add your input below
      </p>

      <form className="my-8" onSubmit={handleSubmit}>

        <textarea id="message" className="block p-2.5 w-full mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
      {Loading ? <SkeletonForTextGeneration /> : null}
      {
        Error ? <p className="text-red-500">{responseMessage}</p> : <p>{responseMessage}</p>
      }
    </div>
    
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
