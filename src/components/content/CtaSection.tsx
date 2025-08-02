import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-fimon-teal/10 to-fimon-blue/10">
      <div className="container-padding max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Managing Your Money Smarter Today
          </h2>
          <p className="text-fimon-slate text-lg mb-8">
            Join thousands of users who have transformed their financial lives
            with Fimon.app`s intelligent financial monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/auth"}>
              <Button className="btn-primary">Start Free Trial</Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-fimon-slate">
            No credit card required. Free plan includes core features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
