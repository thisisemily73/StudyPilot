import { useState } from "react"

import { useAuth } from "../context/AuthContext"

function Auth() {

    const {
        createAccount,
        signIn,
        signInWithGoogle,
    } = useAuth()

    const [isLogin, setIsLogin] =
        useState(true)

    const [email, setEmail] =
        useState("")

    const [password, setPassword] =
        useState("")

    const [error, setError] =
        useState("")

    const [submitting, setSubmitting] =
        useState(false)


    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault()

        setError("")
        setSubmitting(true)

        try {

            if (isLogin) {

                await signIn(
                    email,
                    password
                )

            } else {

                await createAccount(
                    email,
                    password
                )

            }

        } catch (error) {

            if (
                error &&
                typeof error === "object" &&
                "code" in error
            ) {

                const code =
                    String(
                        error.code
                    )

                if (
                    code ===
                    "auth/invalid-credential"
                ) {
                    setError(
                        "Incorrect email or password."
                    )
                } else if (
                    code ===
                    "auth/email-already-in-use"
                ) {
                    setError(
                        "An account already exists with this email."
                    )
                } else if (
                    code ===
                    "auth/weak-password"
                ) {
                    setError(
                        "Password must be at least 6 characters."
                    )
                } else if (
                    code ===
                    "auth/invalid-email"
                ) {
                    setError(
                        "Please enter a valid email address."
                    )
                } else {
                    setError(
                        "Something went wrong. Please try again."
                    )
                }

            } else {

                setError(
                    "Something went wrong. Please try again."
                )

            }

        } finally {

            setSubmitting(false)

        }

    }


    async function handleGoogleSignIn() {

        setError("")
        setSubmitting(true)

        try {

            await signInWithGoogle()

        } catch {

            setError(
                "Google sign-in failed. Please try again."
            )

        } finally {

            setSubmitting(false)

        }

    }


    return (
        <main className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <span className="auth-label">
                        STUDYPILOT
                    </span>

                    <h1>
                        {isLogin
                            ? "Welcome back."
                            : "Let's get started."
                        }
                    </h1>

                    <p>
                        {isLogin
                            ? "Sign in to get back on course."
                            : "Create your account and start planning."
                        }
                    </p>

                </div>


                <button
                    type="button"
                    className="google-button"
                    onClick={
                        handleGoogleSignIn
                    }
                    disabled={submitting}
                >
                    Continue with Google
                </button>


                <div className="auth-divider">

                    <span>
                        or
                    </span>

                </div>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="auth-field">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />

                    </div>


                    <div className="auth-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="••••••••"
                            autoComplete={
                                isLogin
                                    ? "current-password"
                                    : "new-password"
                            }
                            required
                        />

                    </div>


                    {error && (

                        <p className="auth-error">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Please wait..."
                            : isLogin
                                ? "Sign in"
                                : "Create account"
                        }
                    </button>

                </form>


                <div className="auth-switch">

                    <span>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"
                        }
                    </span>

                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(
                                current => !current
                            )
                            setError("")
                        }}
                    >
                        {isLogin
                            ? "Create one"
                            : "Sign in"
                        }
                    </button>

                </div>

            </div>

        </main>
    )
}

export default Auth