import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Prep & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions, get feedback, and boost your
            chances of landing your dream job.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            {/* what is this aschild prop? */}
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}

          {/* <p>You haven't taken any interviews yet</p> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
