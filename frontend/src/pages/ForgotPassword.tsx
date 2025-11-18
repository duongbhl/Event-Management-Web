import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, IdCard, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [identifierType, setIdentifierType] = useState<'email' | 'roll'>('email');
    const [identifier, setIdentifier] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        setError(null);

        if (!identifier.trim()) {
            setError(`Please enter your ${identifierType === 'email' ? 'email address' : 'roll number'}`);
            return false;
        }

        if (identifierType === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
                setError('Please enter a valid email address');
                return false;
            }
        } else {
            if (!/^tu\d{13}$/.test(identifier)) {
                setError('Roll number should be in format: tu followed by 13 digits');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // API call to request password reset
            const response = await axios.post('/api/forgot-password', {
                identifier_type: identifierType === 'email' ? 'email' : 'roll_number',
                identifier: identifier,
            });

            if (response.data.success) {
                setSuccess(true);
            }
        } catch (err: any) {
            console.error('Error requesting password reset:', err);
            const errorMessage = err.response?.data?.message || 
                                err.response?.data?.error || 
                                'An error occurred. Please try again later.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(e.target.value);
        setError(null);
    };

    const handleTypeChange = (type: 'email' | 'roll') => {
        setIdentifierType(type);
        setIdentifier('');
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex flex-col items-center justify-center p-4 grow">
                
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 sm:p-10">
                    
                    {!success ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    No worries! Enter your details and we'll send you reset instructions.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Error Alert */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
                                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}

                                {/* Identifier Type Toggle */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Select Identification Method
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleTypeChange('email')}
                                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg border-2 transition ${
                                                identifierType === 'email'
                                                    ? 'bg-orange-50 border-orange-500 text-orange-700'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTypeChange('roll')}
                                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg border-2 transition ${
                                                identifierType === 'roll'
                                                    ? 'bg-orange-50 border-orange-500 text-orange-700'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <IdCard className="w-4 h-4 inline mr-2" />
                                            Roll Number
                                        </button>
                                    </div>
                                </div>

                                {/* Identifier Input Field */}
                                <div>
                                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                                        {identifierType === 'email' ? 'Email Address' : 'Roll Number'}
                                    </label>
                                    <div className="relative">
                                        {identifierType === 'email' ? (
                                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        ) : (
                                            <IdCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        )}
                                        <input
                                            id="identifier"
                                            name="identifier"
                                            type={identifierType === 'email' ? 'email' : 'text'}
                                            required
                                            value={identifier}
                                            onChange={handleIdentifierChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                            placeholder={identifierType === 'email' ? 'your.email@example.com' : 'e.g. tu6241103111042'}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {identifierType === 'email' 
                                            ? 'We will send reset instructions to this email'
                                            : 'Enter your student roll number (tu + 13 digits)'}
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Reset Link</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Back to Login Link */}
                            <div className="text-center mt-6">
                                <Link 
                                    to="/login" 
                                    className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 transition"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Check Your {identifierType === 'email' ? 'Email' : 'Inbox'}
                            </h2>
                            
                            <p className="text-gray-600 mb-6">
                                {identifierType === 'email' ? (
                                    <>
                                        We've sent password reset instructions to <br />
                                        <span className="font-semibold text-gray-900">{identifier}</span>
                                    </>
                                ) : (
                                    <>
                                        We've sent password reset instructions to the email associated with <br />
                                        <span className="font-semibold text-gray-900">{identifier}</span>
                                    </>
                                )}
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> The reset link will expire in 30 minutes. 
                                    If you don't see the email, check your spam folder.
                                </p>
                            </div>

                            <Link 
                                to="/login"
                                className="inline-flex items-center justify-center w-full py-3 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Login
                            </Link>

                            <button
                                onClick={() => {
                                    setSuccess(false);
                                    setIdentifier('');
                                }}
                                className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
                            >
                                Didn't receive the email? Try again
                            </button>
                        </div>
                    )}

                </div>

            </main>
            <Footer />
        </div>
    );
}

export default ForgotPassword;

