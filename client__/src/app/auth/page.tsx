"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { CheckCircle, Fingerprint, Mail, Shield } from "lucide-react";
import { Flip, toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";

interface AuthFormValues {
  email: string;
}

interface AuthResponse {
  verificationId: string;
  isNewUser?: boolean;
  message: string;
  token?: string;
  user?: object;
}

const Page: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href =
      "https://fimon-app-backend-100.onrender.com/auth/google"; // Replace with your backend URL
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-purple-100 to-blue-50">
      {/* Security Info Section */}
      <div className="hidden md:block w-1/2 bg-cover bg-center">
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-12">
          <div className="text-white">
            <div className="flex items-center  mb-6">
              <Shield className="h-16 w-16 text-blue-300 mr-4" />
              <h2 className="text-4xl font-bold">Secure Access</h2>
            </div>
            <p className="text-xl max-w-md mb-8">
              Your data is protected with enterprise-grade security protocols.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">End-to-end encryption</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">Two-factor authentication</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">ISO 27001 certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Forms Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full flex items-center justify-center p-4">
          <div className="w-full max-w-md fade-in">
            <div className="glass rounded-3xl p-4 shadow-xl">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Fingerprint className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h1 className="text-3xl text-black font-bold mb-2">Welcome!</h1>
                <p className="text-muted-foreground">
                  Secure access to your account
                </p>
              </div>

              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                })}
                onSubmit={async (
                  values: AuthFormValues,
                  { setSubmitting }: FormikHelpers<AuthFormValues>
                ) => {
                  try {
                    const response: AuthResponse = await fetcher(
                      "/auth/authentication",
                      "post",
                      values
                    );

                    if (response?.token) {
                      console.log("object", response?.token);
                      router.push("/dashboard");
                      localStorage.setItem("authToken", response.token);
                    } else {
                      console.log("object", response);
                      router.push("/auth/verify-otp");
                      localStorage.setItem("email", values.email);
                      localStorage.setItem(
                        "verificationId",
                        response.verificationId
                      );
                      localStorage.setItem(
                        "isNewUser",
                        String(response.isNewUser)
                      );
                    }

                    toast.success(response.message, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "colored",
                      transition: Flip,
                    });
                  } catch (err: Error | unknown) {
                    const errorMessage =
                      err instanceof Error ? err.message : "An error occurred";
                    toast.error(errorMessage, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "colored",
                      transition: Flip,
                    });
                  }

                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="pl-10 h-12 text-base w-full border-2 bg-white text-black dark:bg-white dark:text-black"
                          as={Input}
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-base py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      {isSubmitting ? "Signing in..." : "Secure Sign in"}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="flex items-center justify-center space-x-2 my-6">
                <div className="h-px w-1/3" />
                <p className="text-sm">or</p>
                <div className="h-px w-1/3" />
              </div>

              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  onClick={() => handleLogin()}
                  variant="outline"
                  className="py-6 w-full bg-white text-black dark:bg-white dark:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.5-5.9 8-11.3 8a12 12 0 1 1 0-24c3.1 0 5.9 1.2 8 3.1l6-6A19.9 19.9 0 0 0 24 4a20 20 0 1 0 0 40c11 0 20-9 20-20 0-1.3-.1-2.7-.4-3.5z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.3 14.7 12.9 19a12 12 0 0 1 20.6-3.7l6-6A19.9 19.9 0 0 0 24 4a20 20 0 0 0-17.7 10.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.3A11.9 11.9 0 0 1 24 36a12 12 0 0 1-11.3-8l-6.4 5A20 20 0 0 0 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.5 5.3c-2.6 2.4 4.3-3.5 4.3-13.9 0-1.3-.1-2.7-.4-3.5z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </Button>

                <Button
                  className="py-6 w-full bg-white text-black dark:bg-white dark:text-black"
                  variant="outline"
                  disabled
                >
                  📱
                  <span className="text-sm font-medium">
                    Phone (Coming soon)
                  </span>
                </Button>

                <Button
                  className="py-6 w-full bg-white text-black dark:bg-white dark:text-black"
                  variant="outline"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current text-[#3b5998]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.351C0 23.408.593 24 1.324 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.919.001c-1.505 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.696h-3.123V24h6.116C23.408 24 24 23.408 24 22.676V1.324C24 .593 23.408 0 22.676 0z" />
                  </svg>
                  <span className="text-sm font-medium">
                    Facebook (Coming soon)
                  </span>
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center">
                <Shield className="h-3 w-3 mr-1" />
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
