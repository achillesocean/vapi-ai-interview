"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(2, {
              message: "Username must be at least 2 characters.",
            })
            .max(30, {
              message: "Username must not exceed 30 characters.",
            }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Password must not exceed 30 characters.",
      }),
    email: z.string().email(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  // explore this FormType!?
  const router = useRouter();

  const formSchema = authFormSchema(type);

  // 1. define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  // 2. define a submit handler
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ); // creates user in firebase auth not in firestore db? it is also only associated with auth?

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!, // what does ! mean?
          email,
          password,
        }); // this is the signUp into firebase db?

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Signed up successfully.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();
        if (!idToken) {
          toast.error("Failed to sign in.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interviews with AI</h3>
        <Form {...form}>
          <form
            action={async (formData) => {
              // ✅ call the handler that uses server actions
              const values = Object.fromEntries(formData) as any;
              await handleSubmit(values);
            }}
            className="space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="H0yB9@example.com"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-user-primary font-bold ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
